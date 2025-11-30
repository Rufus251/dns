import { createApp, type App } from "vue";
import ToastNotification from "@/shared/ui/Toast.vue";
import type { ToastOptions } from "./toast.interface";

let container: HTMLElement | null = null;

const toastDuration: number = 3000;
const animationDuration: number = 400;

const getContainer = (): HTMLElement => {
  if (!container) {
    container = document.createElement("div");
    container.setAttribute("data-toast-container", "");
    document.body.appendChild(container);
  }
  return container;
};

export const useToast = () => {
  const show = (text: string, options: ToastOptions = {}) => {
    const { type = "info", duration = toastDuration } = options;

    const app: App = createApp(ToastNotification, {
      text,
      type,
      duration,
    });

    const containerEl = getContainer();
    const wrapper = document.createElement("div");
    containerEl.appendChild(wrapper);

    app.mount(wrapper);

    setTimeout(() => {
      app.unmount();
      wrapper.remove();

      if (containerEl.children.length === 0) {
        containerEl.remove();
        container = null;
      }
    }, duration + animationDuration);
  };

  const showError = (text: string) => show(text, { type: "error" });
  const showWarning = (text: string) => show(text, { type: "warning" });
  const showInfo = (text: string) => show(text, { type: "info" });

  return {
    show,
    showError,
    showWarning,
    showInfo,
  };
};
