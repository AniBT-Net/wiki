'use client';

import { localizedPath } from '@/lib/i18n';
import { useI18n } from 'fumadocs-ui/contexts/i18n';
import { House } from 'lucide-react';
import Link from 'next/link';

const COPY = {
  'zh-CN': {
    title: '页面不存在',
    body: '你访问的页面可能已被移动、重命名或暂时不可用。',
    home: '返回首页',
  },
  'zh-Hant': {
    title: '頁面不存在',
    body: '你訪問的頁面可能已被移動、重新命名或暫時無法使用。',
    home: '返回首頁',
  },
  en: {
    title: 'Page Not Found',
    body: 'The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.',
    home: 'Back to Home',
  },
} as const;

const SPARK =
  'M12 1.5c.9 5.6 4.9 9.6 10.5 10.5-5.6.9-9.6 4.9-10.5 10.5C11.1 16.9 7.1 12.9 1.5 12 7.1 11.1 11.1 7.1 12 1.5Z';

/**
 * 404（A「贴纸手账」）：吉祥物从一张倾斜的便签后探头，便签上贴一枚
 * 「404」贴纸。与主站的空状态 / 错误页是同一个角色。文案沿用
 * `lib/layout.shared.tsx` 里 404 的三语译文。
 */
export function NotFoundState({ className }: { className?: string }) {
  const { locale } = useI18n();
  const t = COPY[(locale ?? 'zh-CN') as keyof typeof COPY] ?? COPY['zh-CN'];

  return (
    <div className={`a-404 ${className ?? ''}`}>
      <div className="a-404-peek">
        <img
          className="a-404-girl"
          src="/brand/mascot.webp"
          alt=""
          width={490}
          height={490}
          decoding="async"
          aria-hidden="true"
        />
        <svg viewBox="0 0 24 24" aria-hidden="true" className="a-404-spark s1">
          <path d={SPARK} fill="currentColor" />
        </svg>
        <svg viewBox="0 0 24 24" aria-hidden="true" className="a-404-spark s2">
          <path d={SPARK} fill="currentColor" />
        </svg>
        <div className="a-404-note">
          <span className="a-sticker a-sticker-water a-404-code">404</span>
          <h1>{t.title}</h1>
          <p>{t.body}</p>
          <Link
            className="a-btn a-btn-primary a-404-btn"
            href={localizedPath(locale ?? 'zh-CN', '/')}>
            <House aria-hidden="true" />
            {t.home}
          </Link>
        </div>
      </div>
    </div>
  );
}
