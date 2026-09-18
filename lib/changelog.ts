import { source } from '@/lib/source';

export type ChangelogEntry = {
  date: string;
  title: string;
  body: string;
};

const EN_MONTHS: Record<string, string> = {
  january: '01',
  february: '02',
  march: '03',
  april: '04',
  may: '05',
  june: '06',
  july: '07',
  august: '08',
  september: '09',
  october: '10',
  november: '11',
  december: '12',
};

function pad(value: string): string {
  return value.padStart(2, '0');
}

/** `## 2026 年 9 月 17 日` / `## September 17, 2026` → `2026-09-17` */
function parseDate(heading: string): string | null {
  const cjk = heading.match(/(\d{4})\s*年\s*(\d{1,2})\s*月\s*(\d{1,2})\s*日/);
  if (cjk) return `${cjk[1]}-${pad(cjk[2])}-${pad(cjk[3])}`;

  const latin = heading.match(/([A-Za-z]+)\s+(\d{1,2}),\s*(\d{4})/);
  if (latin) {
    const month = EN_MONTHS[latin[1].toLowerCase()];
    if (month) return `${latin[3]}-${month}-${pad(latin[2])}`;
  }

  return null;
}

/** 去掉行内 Markdown 标记，只留正文。 */
function plain(text: string): string {
  return text
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\\([\\`*_~[\]])/g, '$1')
    .trim();
}

/** 只取第一句，卡片放得下。 */
function firstSentence(text: string): string {
  const cjk = text.indexOf('。');
  if (cjk >= 0) return text.slice(0, cjk + 1);

  const latin = text.match(/^.*?[.!?](?=\s|$)/);
  if (latin) return latin[0];

  return text;
}

export function parseChangelog(markdown: string, limit: number): ChangelogEntry[] {
  const entries: ChangelogEntry[] = [];
  const lines = markdown.split('\n');
  let date: string | null = null;
  let current: ChangelogEntry | null = null;

  const close = () => {
    const entry: ChangelogEntry | null = current;
    if (entry && entry.title) {
      entry.body = firstSentence(entry.body.trim());
      entries.push(entry);
    }
    current = null;
  };

  for (const line of lines) {
    if (entries.length >= limit) break;

    if (line.startsWith('## ')) {
      close();
      date = parseDate(line.slice(3).trim());
      continue;
    }

    const item = line.match(/^[-*]\s+\*\*(.+?)\*\*\s*$/);
    if (item) {
      close();
      if (!date) continue;
      current = { date, title: plain(item[1]), body: '' };
      continue;
    }

    if (line.startsWith('-') || line.startsWith('*') || line.startsWith('#')) {
      close();
      continue;
    }

    if (current && line.trim()) {
      current.body = `${current.body} ${plain(line)}`;
    }
  }

  close();
  return entries.slice(0, limit);
}

/** 从对应语种的更新日志文档里取最近几条，不手写在首页。 */
export async function recentChangelog(
  locale: string,
  limit = 3,
): Promise<ChangelogEntry[]> {
  const page = source.getPage(['changelog'], locale);
  if (!page) return [];

  const markdown = await page.data.getText('processed');
  return parseChangelog(markdown, limit);
}
