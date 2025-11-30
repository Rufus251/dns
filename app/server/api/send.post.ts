export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  console.log('[MOCK API] Received send request:', body);
  return { success: true };
});