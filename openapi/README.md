# OpenAPI contract maintenance

`anibt.yaml` owns the documented wire contract. `anibt.json`, `public/openapi.yaml`,
and the three MDX pages for each operation are generated from it.

Before changing a contract, trace the deployed AniBT handler, request validator,
response projection, and existing behavior tests. Do not infer a JSON shape from
an endpoint name or copy the response of a neighboring endpoint.

```bash
corepack pnpm gen:openapi
corepack pnpm check:openapi
corepack pnpm test:openapi
corepack pnpm check:openapi:live
corepack pnpm typecheck
corepack pnpm build
```

`build` runs the offline contract gate before rendering. The gate validates all
documented examples and recorded HTTP responses, requires a success witness for
each JSON operation, and rejects drift between YAML, JSON, and generated locale
pages. Tests include incorrect envelopes, nullability, deletion terminal fields,
and execution of the documented polling scripts against a local HTTP server.

The live check makes bounded, sequential, anonymous GET requests. It never
publishes, deletes, or submits a real credential. An explicit live check failure
requires investigation; do not refresh fixtures merely to make it green.

Fixtures record the verified source SHA and how they were obtained. Public
responses may contain short array samples. Private fixtures come from actual
HTTP handlers with external ports substituted, not from a production write.
They verify the serialization boundary, not database authorization or a complete
publish transaction. The source audit is recorded in `audit.json`; the task and
acceptance evidence are in <https://github.com/AniBT-Net/wiki/issues/8>.

Frozen examples cannot detect every future server change. For an API change,
re-run its handler checks, replace the affected witness with the resulting wire
response, and review request/response/header/error semantics before publishing.
Keep optional, nullable, absent, pending, failed, and unavailable distinct.

The Markdown/LLM endpoints include the same operation and all referenced schema
definitions as the interactive page. Never maintain a second hand-written
response schema in those endpoints.
