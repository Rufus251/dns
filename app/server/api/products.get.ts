export default defineEventHandler(async (event) => {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  return [
    { id: 1, name: 'Товар 1', price: 123.45 },
    { id: 2, name: 'Товар 2', price: 678.9 },
  ];
});