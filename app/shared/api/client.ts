const client = $fetch.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export const api = {
  get: <T>(url: string) => client<T>(url),
  post: <T = void>(url: string, body: any) =>
    client<T>(url, { method: "POST", body }),
};
