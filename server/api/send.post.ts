export default defineEventHandler(async (event) => {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const body = await readBody(event);
  console.log('[MOCK API] Received send request:', body);
  return { success: true };
});