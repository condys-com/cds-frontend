import axios from 'axios';
import type { CdsItem } from '@/types';

const apiClient = axios.create({
  baseURL: '/api',
  timeout: 5000,
});

export const getCdsList = async (): Promise<CdsItem[]> => {
  const response = await apiClient.get<CdsItem[]>('/cds/');
  return response.data;
};

export const addPrime = async (): Promise<{ message: string }> => {
  const response = await apiClient.post<{ message: string }>('/cds/add-prime/');
  return response.data;
};

export const deleteLargestPrime = async (): Promise<{ message: string }> => {
  const response = await apiClient.delete<{ message: string }>('/cds/delete-largest/');
  return response.data;
};