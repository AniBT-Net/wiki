'use client';

import { createOpenAPIPage, type CreateOpenAPIPageOptions } from 'fumadocs-openapi/ui';
import { createCodeUsageGeneratorRegistry } from 'fumadocs-openapi/requests/generators';
import { registerDefault } from 'fumadocs-openapi/requests/generators/all';
import { DynamicCodeBlock } from 'fumadocs-ui/components/dynamic-codeblock';
import { Tabs, Tab } from 'fumadocs-ui/components/tabs';
import { Accordion, Accordions } from 'fumadocs-ui/components/accordion';
import { responseExampleCode } from '@/lib/response-example';

const codeUsages = createCodeUsageGeneratorRegistry();
registerDefault(codeUsages);

type ResponseTabs = NonNullable<NonNullable<CreateOpenAPIPageOptions['content']>['renderResponseTabs']>;

const renderResponseTabs: ResponseTabs = ({ tabs }) => (
  <Tabs items={tabs.map(tab => tab.code)}>
    {tabs.map(tab => {
      const examples = tab.examples ?? [];
      const blocks = examples.map((example, index) => {
        const code = responseExampleCode(tab.mediaType, example.sample);
        return <DynamicCodeBlock key={index} {...code} />;
      });
      return (
        <Tab key={tab.code} value={tab.code}>
          {examples.length > 1 ? (
            <Accordions type="single" defaultValue="0">
              {examples.map((example, index) => (
                <Accordion key={index} value={String(index)} title={example.label}>
                  {blocks[index]}
                </Accordion>
              ))}
            </Accordions>
          ) : blocks[0] ?? <code>HTTP {tab.code}</code>}
        </Tab>
      );
    })}
  </Tabs>
);

export const OpenAPIPage = createOpenAPIPage({
  codeUsages,
  content: { renderResponseTabs },
});
