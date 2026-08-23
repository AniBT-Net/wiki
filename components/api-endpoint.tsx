import type { ReactNode } from 'react';

const METHOD_CLASS = {
  GET: 'api-method-get',
  POST: 'api-method-post',
  DELETE: 'api-method-delete',
  PATCH: 'api-method-patch',
  PUT: 'api-method-put',
} as const;

export function ApiEndpoint({
  method,
  path,
  auth,
  children,
}: {
  method: keyof typeof METHOD_CLASS;
  path: string;
  auth?: string;
  children?: ReactNode;
}) {
  return (
    <div className="api-endpoint not-prose">
      <div className="api-endpoint-bar">
        <span className={`api-method ${METHOD_CLASS[method]}`}>{method}</span>
        <code className="api-path">{path}</code>
        {auth ? <span className="api-auth">{auth}</span> : null}
      </div>
      {children ? <p className="api-endpoint-desc">{children}</p> : null}
    </div>
  );
}
