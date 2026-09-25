/** XML and text examples are response bytes, not JSON string literals. */
export function responseExampleCode(mediaType: string | null, sample: unknown) {
  if (typeof sample === 'string' && !mediaType?.includes('json')) {
    return { lang: mediaType?.includes('xml') ? 'xml' : 'text', code: sample };
  }
  return { lang: 'json', code: JSON.stringify(sample, null, 2) ?? '' };
}
