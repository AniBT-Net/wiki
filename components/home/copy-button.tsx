'use client';

import { Check, Copy } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export function useCopy() {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );

  const copy = async (value: string) => {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      return;
    }
    setCopied(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 1600);
  };

  return { copied, copy };
}

type IconCopyProps = {
  value: string;
  label: string;
  copiedLabel: string;
  className?: string;
};

/** 只有图标的复制按钮，用于命令行与 RSS 地址。 */
export function CopyIconButton({
  value,
  label,
  copiedLabel,
  className,
}: IconCopyProps) {
  const { copied, copy } = useCopy();

  return (
    <button
      type="button"
      className={className}
      onClick={() => void copy(value)}
      aria-label={copied ? copiedLabel : label}
    >
      {copied ? <Check className="i" /> : <Copy className="i" />}
    </button>
  );
}

type TextCopyProps = {
  value: string;
  label: string;
  copiedLabel: string;
  className?: string;
};

/** 带文案的复制按钮，复制后短暂显示「已复制」。 */
export function CopyTextButton({
  value,
  label,
  copiedLabel,
  className = 'btn pri',
}: TextCopyProps) {
  const { copied, copy } = useCopy();

  return (
    <button type="button" className={className} onClick={() => void copy(value)}>
      {copied ? <Check className="i" /> : <Copy className="i" />}
      {copied ? copiedLabel : label}
    </button>
  );
}
