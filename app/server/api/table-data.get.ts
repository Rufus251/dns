export default defineEventHandler(async (event) => {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  return [
    { id: 1, name: 'Заявка 1', status: 'draft' },
    { id: 2, name: 'Заявка 2', status: 'draft' },
  ];
});