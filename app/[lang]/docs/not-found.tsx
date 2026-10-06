import { NotFoundState } from '@/components/not-found-state';

/** 文档里找不到的页：留在文档壳里（顶栏、侧栏照常），正文位置放 404 贴纸。 */
export default function DocsNotFound() {
  return (
    <main className="contents">
      <NotFoundState className="[grid-area:main]" />
    </main>
  );
}
