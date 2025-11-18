import {
  ApiError,
  BadRequestError,
  ValidationError,
  UnauthorizedError,
  NotFoundError,
  UnhandledException,
  NetworkError,
} from "@/types/http-errors.interface";

export type ApiErrorHandler = (errorData: ApiError) => void;

export const badRequestErrorStrategy: ApiErrorHandler = (errorData) => {
  throw new BadRequestError(errorData.detail, errorData.errors);
};

export const validationErrorStrategy: ApiErrorHandler = (errorData) => {
  throw new ValidationError(errorData.errors);
};

export const unauthorizedErrorStrategy: ApiErrorHandler = (errorData) => {
  throw new UnauthorizedError(errorData.detail);
};

export const notFoundErrorStrategy: ApiErrorHandler = (errorData) => {
  throw new NotFoundError(errorData.detail);
};

export const unhandledExceptionStrategy: ApiErrorHandler = (errorData) => {
  throw new UnhandledException(errorData.detail);
};

export const networkErrorStrategy = () => {
  throw new NetworkError();
};

export const methodNotAllowedStrategy: ApiErrorHandler = (errorData) => {
  throw new UnhandledException("متد استفاده شده در این درخواست مجاز نیست");
};

export const errorHandler: Record<number, ApiErrorHandler> = {
  400: (errorData) =>
    errorData.errors ? validationErrorStrategy(errorData) : badRequestErrorStrategy(errorData),
  403: unauthorizedErrorStrategy,
  404: notFoundErrorStrategy,
  405: methodNotAllowedStrategy,
  500: unhandledExceptionStrategy,
};
