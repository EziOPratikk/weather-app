export async function getRequest(url: string) {
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }

  const data = res.json() as unknown;

  return data;
}