import type { Product } from "@/entities/product/model/types";

export type DraftStatus = "draft" | "sent";
export type ApplicationStatus = "Активна" | "Не активна";
export type ValidationStatus = "valid" | "invalid" | null;
// Пример, используется только статус "В обработке"
export type Process = "В обработке" | "Завершена" | "Отклонена";

export interface Application {
  id: number;
  name: string; // 25-1515151
  validationStatus: ValidationStatus;
  createdAt: string; // Aug 16, 2025
  process: Process;
  applicationStatus: ApplicationStatus;
  status: DraftStatus;
  products: Product[];
}
