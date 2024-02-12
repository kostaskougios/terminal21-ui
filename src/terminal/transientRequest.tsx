const requests = new Set<string>();

export function shouldProcessTransientRequestWith(requestId: string): boolean {
  if (requests.has(requestId)) return false;

  requests.add(requestId);
  return true;
}
