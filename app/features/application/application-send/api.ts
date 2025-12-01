import { api } from '@/shared/api/client';
import type { ApplicationSend } from '../types';

interface SendApplicationResponse {
  success: boolean;
}

export const sendApplicationApi = async (payload: ApplicationSend): Promise<SendApplicationResponse> => {
  return await api.post<SendApplicationResponse>('/send', payload);
};