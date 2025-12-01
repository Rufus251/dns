import { api } from '@/shared/api/client';
import type { Application, ApplicationStatus, DraftStatus, Process, ValidationStatus } from '@/entities/application/model/types';
import type { Product } from '~/entities/product/model/types';

interface RawApplication {
  id: number;
  name: string;
  status: DraftStatus;
}

const mapToApplication = (raw: RawApplication): Application => {
  const applicationStatus: ApplicationStatus = 'Активна';
  const process: Process = 'В обработке';
  const validationStatus: ValidationStatus = null;
  const createdAt: string = new Date().toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
  const products: Product[] = []

  return {
    id: raw.id,
    name: raw.name,
    status: raw.status,
    applicationStatus,
    process,
    validationStatus,
    createdAt,
    products
  };
};

export const fetchApplications = async (): Promise<Application[]> => {
  const rawData = await api.get<RawApplication[]>('/table-data');
  return rawData.map(mapToApplication);
};