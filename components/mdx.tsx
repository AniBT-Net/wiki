import defaultMdxComponents from 'fumadocs-ui/mdx';
import { Accordion, Accordions } from 'fumadocs-ui/components/accordion';
import { Callout } from 'fumadocs-ui/components/callout';
import { File, Files, Folder } from 'fumadocs-ui/components/files';
import { ImageZoom } from 'fumadocs-ui/components/image-zoom';
import { InlineTOC } from 'fumadocs-ui/components/inline-toc';
import { Step, Steps } from 'fumadocs-ui/components/steps';
import { Tab, Tabs } from 'fumadocs-ui/components/tabs';
import { Card, Cards } from 'fumadocs-ui/components/card';
import {
  fetchRepositoryInfo,
  GithubInfo,
} from 'fumadocs-ui/components/github-info';
import { TypeTable } from 'fumadocs-ui/components/type-table';
import type { ComponentProps, ReactNode } from 'react';
import type { MDXComponents } from 'mdx/types';

/**
 * A 皮肤的钩子类（`app/anibt-a.css`）：fumadocs 的这些组件没有稳定的
 * data 属性，这里挂上本仓自己的类名，样式只认这些名字。
 */
function withHook(hook: string, className?: string): string {
  return className ? `${hook} ${className}` : hook;
}

function DocsTabs(props: ComponentProps<typeof Tabs>) {
  return <Tabs {...props} className={withHook('a-tabs', props.className)} />;
}

function DocsCards(props: ComponentProps<typeof Cards>) {
  return <Cards {...props} className={withHook('a-cards', props.className)} />;
}

function DocsCard(props: ComponentProps<typeof Card>) {
  return <Card {...props} className={withHook('a-card', props.className)} />;
}

function DocsAccordions(props: ComponentProps<typeof Accordions>) {
  return (
    <Accordions
      {...props}
      className={withHook('a-accordions', props.className)}
    />
  );
}

function DocsFiles(props: ComponentProps<typeof Files>) {
  return <Files {...props} className={withHook('a-files', props.className)} />;
}

function DocsTypeTable({
  type,
  className,
  ...props
}: ComponentProps<typeof TypeTable>) {
  return (
    <TypeTable
      {...props}
      className={withHook('a-typetable', className)}
      type={Object.fromEntries(
        Object.entries(type).map(([name, field]) => [
          name,
          { required: true, ...field },
        ]),
      )}
    />
  );
}

async function DocsGithubInfo({
  owner,
  repo,
  ...props
}: ComponentProps<typeof GithubInfo>) {
  try {
    await fetchRepositoryInfo({
      owner,
      repo,
      token: process.env.GITHUB_TOKEN,
    });
    return (
      <GithubInfo
        owner={owner}
        repo={repo}
        token={process.env.GITHUB_TOKEN}
        {...props}
      />
    );
  } catch {
    return (
      <DocsCard
        title={`${owner}/${repo}`}
        href={`https://github.com/${owner}/${repo}`}
      />
    );
  }
}

function ApiEndpoint({
  method,
  path,
  auth,
  children,
}: {
  method: string;
  path: string;
  auth?: string;
  children?: ReactNode;
}) {
  return (
    <Callout title={`${method} ${path}`}>
      {auth ? <p>{auth}</p> : null}
      {children}
    </Callout>
  );
}

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    img: (props) => (
      <ImageZoom {...(props as ComponentProps<typeof ImageZoom>)} />
    ),
    Accordion,
    Accordions: DocsAccordions,
    Callout,
    Card: DocsCard,
    Cards: DocsCards,
    File,
    Files: DocsFiles,
    Folder,
    ImageZoom,
    InlineTOC,
    Step,
    Steps,
    Tab,
    Tabs: DocsTabs,
    TypeTable: DocsTypeTable,
    GithubInfo: DocsGithubInfo,
    ApiEndpoint,
    ...components,
  };
}

export const useMDXComponents = getMDXComponents;

declare global {
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>;
}
