export type ToastType = "info" | "warning" | "error";

export interface ToastOptions {
  type?: ToastType;
  duration?: number;
}