import defaultMdxComponents from 'fumadocs-ui/mdx';
import { Accordion, Accordions } from 'fumadocs-ui/components/accordion';
import { Callout } from 'fumadocs-ui/components/callout';
import { File, Files, Folder } from 'fumadocs-ui/components/files';
import { ImageZoom } from 'fumadocs-ui/components/image-zoom';
import { InlineTOC } from 'fumadocs-ui/components/inline-toc';
import { Step, Steps } from 'fumadocs-ui/components/steps';
import { Tab, Tabs } from 'fumadocs-ui/components/tabs';
import { Card } from 'fumadocs-ui/components/card';
import {
  fetchRepositoryInfo,
  GithubInfo,
} from 'fumadocs-ui/components/github-info';
import { TypeTable } from 'fumadocs-ui/components/type-table';
import type { ComponentProps, ReactNode } from 'react';
import type { MDXComponents } from 'mdx/types';

function DocsTypeTable({
  type,
  ...props
}: ComponentProps<typeof TypeTable>) {
  return (
    <TypeTable
      {...props}
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
      <Card title={`${owner}/${repo}`} href={`https://github.com/${owner}/${repo}`} />
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
    Accordions,
    Callout,
    File,
    Files,
    Folder,
    ImageZoom,
    InlineTOC,
    Step,
    Steps,
    Tab,
    Tabs,
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
