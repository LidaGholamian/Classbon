import {
  ApiError,
  BadRequestError,
  NetworkError,
  UnhandledException,
  ValidationError,
} from '@/types/http-errors.interface';

type ApiErrorHandler = (errorData: ApiError) => void;

const badRequestErrorStrategy: ApiErrorHandler = (errorData) => {
  throw {
    ...errorData,
  } as BadRequestError;
};

const validateErrorStrategy: ApiErrorHandler = (errorData) => {
  throw {
    ...errorData,
  } as ValidationError;
};
const unauthorizedErrorStrategy: ApiErrorHandler = (errorData) => {
  throw {
    ...errorData,
    detail: 'دسترسی به سرویس موردنظر امکان پذیر نمی باشد!',
  };
};

const unhandleErrorStrategy: ApiErrorHandler = (errorData) => {
  throw {
      ...errorData,
      detail: 'خطای سرور',
  } as unknown as UnhandledException;
};

export const networkErrorStrategy = () => {
  throw {
      detail: 'خطای شبکه',
  } as unknown as NetworkError;
};

export const errorHandler: Record<number, ApiErrorHandler> = {
  400: (errorData) =>
    errorData.errors ? validateErrorStrategy : badRequestErrorStrategy,
  403: unauthorizedErrorStrategy,
  404: networkErrorStrategy,
  500: unhandleErrorStrategy,
};
