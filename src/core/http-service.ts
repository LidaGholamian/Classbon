import { API_URL } from "@/configs/global";
import axios, {
  AxiosRequestConfig,
  AxiosRequestHeaders,
  AxiosResponse,
} from "axios";

import { ApiError } from "@/types/http-errors.interface";
import {
  errorHandler,
  networkErrorStrategy,
} from "./http-error-strategies";

const httpService = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor for response
httpService.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // response from server
    if (error?.response) {
      const statusCode = error.response.status;
      const errorData: ApiError = error.response.data;

      if (statusCode >= 400) {
        const handler = errorHandler[statusCode];
        if (handler) {
          handler(errorData);
        } else {
          throw new Error(`Unhandled HTTP Status: ${statusCode}`);
        }
      }
    } else {
      networkErrorStrategy();
    }
    return Promise.reject(error);
  }
);

async function apiBase<T>(
  url: string,
  options?: AxiosRequestConfig
): Promise<T> {
  const response: AxiosResponse = await httpService(url, options);
  return response.data as T;
}

// GET
async function readData<T>(
  url: string,
  headers?: AxiosRequestHeaders
): Promise<T> {
  const options: AxiosRequestConfig = {
    method: "GET",
    headers,
  };

  return await apiBase<T>(url, options);
}

// POST
async function createData<TModel, TResult>(
  url: string,
  data: TModel,
  headers?: AxiosRequestHeaders
): Promise<TResult> {
  const options: AxiosRequestConfig = {
    method: "POST",
    headers,
    data: JSON.stringify(data),
  };

  return await apiBase<TResult>(url, options);
}

// PUT
async function updateData<TModel, TResult>(
  url: string,
  data: TModel,
  headers?: AxiosRequestHeaders
): Promise<TResult> {
  const options: AxiosRequestConfig = {
    method: "PUT",
    headers,
    data: JSON.stringify(data),
  };

  return await apiBase<TResult>(url, options);
}

// DELETE
async function deleteData(
  url: string,
  headers?: AxiosRequestHeaders
): Promise<void> {
  const options: AxiosRequestConfig = {
    method: "DELETE",
    headers,
  };

  await apiBase(url, options);
}

export { createData, readData, updateData, deleteData };
