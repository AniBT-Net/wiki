import {
  GithubInfo,
  fetchRepositoryInfo,
} from 'fumadocs-ui/components/github-info';
import { GitFork, Star } from 'lucide-react';
import type { ReactNode } from 'react';

interface ProjectCardProps {
  owner: string;
  repo: string;
  description: ReactNode;
  links?: { label: string; href: string }[];
}

async function StarsForks({ owner, repo }: { owner: string; repo: string }) {
  try {
    const { stars, forks } = await fetchRepositoryInfo({
      owner,
      repo,
      token: process.env.GITHUB_TOKEN,
    });
    const fmt = new Intl.NumberFormat(undefined, {
      notation: 'compact',
      maximumFractionDigits: 1,
    });
    return (
      <span className="inline-flex items-center gap-2 text-xs text-fd-muted-foreground">
        <Star className="size-3" />
        <span>{fmt.format(stars)}</span>
        <GitFork className="size-3 ms-1" />
        <span>{fmt.format(forks)}</span>
      </span>
    );
  } catch {
    return null;
  }
}

export async function ProjectCard({
  owner,
  repo,
  description,
  links,
}: ProjectCardProps) {
  return (
    <div className="not-prose my-5 rounded-xl border border-fd-border bg-fd-card p-5 shadow-[0_1px_0_oklch(0.24_0.02_40_/_0.04)]">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <a
          href={`https://github.com/${owner}/${repo}`}
          target="_blank"
          rel="noreferrer noopener"
          className="font-medium text-fd-foreground hover:underline"
        >
          {owner}/{repo}
        </a>
        <StarsForks owner={owner} repo={repo} />
      </div>
      <p className="mt-2 text-sm text-fd-muted-foreground">{description}</p>
      {links && links.length > 0 ? (
        <div className="mt-3 flex flex-wrap gap-2 text-sm">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-1 rounded-md border border-fd-border px-2 py-1 hover:bg-fd-accent hover:text-fd-accent-foreground"
            >
              {l.label} →
            </a>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export { GithubInfo };
