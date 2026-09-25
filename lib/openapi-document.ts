import spec from '../openapi/anibt.json';

type JsonObject = Record<string, unknown>;

/** Keep references intact and include their definitions in the single-operation document. */
export function getOperationDocument(operationId: string, options: { machineOnly?: boolean } = {}): JsonObject | undefined {
  for (const [path, item] of Object.entries(spec.paths)) {
    for (const [method, operation] of Object.entries(item)) {
      if (!operation || typeof operation !== 'object' || !('operationId' in operation) || operation.operationId !== operationId) continue;
      const selected: Record<string, JsonObject> = {};
      const components = spec.components as unknown as Record<string, JsonObject>;
      const seen = new Set<string>();
      function includeReferences(value: unknown): void {
        if (!value || typeof value !== 'object') return;
        if ('$ref' in value && typeof value.$ref === 'string') {
          const reference = value.$ref;
          if (seen.has(reference)) return;
          seen.add(reference);
          const [, componentRoot, kind, name] = reference.split('/');
          if (!reference.startsWith('#/') || componentRoot !== 'components' || !kind || !name) throw new Error(`Unsupported OpenAPI reference: ${reference}`);
          const definition = components[kind]?.[name];
          if (!definition) throw new Error(`Missing OpenAPI reference: ${reference}`);
          (selected[kind] ??= {})[name] = definition;
          includeReferences(definition);
        }
        for (const child of Object.values(value)) includeReferences(child);
      }
      includeReferences(operation);
      const document = {
        openapi: spec.openapi,
        info: spec.info,
        servers: spec.servers,
        paths: { [path]: { [method]: operation } },
        components: { ...selected, securitySchemes: spec.components.securitySchemes },
      };
      if (!options.machineOnly) return document;
      const humanKeys = new Set(['description', 'summary', 'title']);
      const stripHumanText = (value: unknown): unknown => {
        if (Array.isArray(value)) return value.map(stripHumanText);
        if (!value || typeof value !== 'object') return value;
        return Object.fromEntries(Object.entries(value)
          .filter(([key]) => !humanKeys.has(key))
          .map(([key, child]) => [key, stripHumanText(child)]));
      };
      return stripHumanText(document) as JsonObject;
    }
  }
}
