export interface ApiError {
  title: string;
  status: number;
  detail: string;
  errors?: Record<string, string[]>;
}

export abstract class HttpError extends Error implements ApiError {
  title: string;
  status: number;
  detail: string;
  errors?: Record<string, string[]>;

  constructor(title: string, status: number, detail: string, errors?: Record<string, string[]>) {
    super(detail);
    this.title = title;
    this.status = status;
    this.detail = detail;
    this.errors = errors;
    Object.setPrototypeOf(this, new.target.prototype);
  }

  toJSON(): ApiError {
    return {
      title: this.title,
      status: this.status,
      detail: this.detail,
      errors: this.errors,
    };
  }
}

export class BadRequestError extends HttpError {
  constructor(detail = "درخواست نامعتبر است", errors?: Record<string, string[]>) {
    super("Bad Request", 400, detail, errors);
  }
}

export class ValidationError extends HttpError {
  constructor(errors?: Record<string, string[]>) {
    super("Validation Error", 400, "خطای اعتبارسنجی داده‌ها", errors);
  }
}

export class UnauthorizedError extends HttpError {
  constructor(detail = "دسترسی به سرویس مورد نظر امکان‌پذیر نیست") {
    super("Unauthorized", 403, detail);
  }
}

export class NotFoundError extends HttpError {
  constructor(detail = "سرویس مورد نظر یافت نشد") {
    super("Not Found", 404, detail);
  }
}

export class UnhandledException extends HttpError {
  constructor(detail = "خطای سرور") {
    super("Unhandled Exception", 500, detail);
  }
}

export class NetworkError extends HttpError {
  constructor(detail = "خطای شبکه") {
    super("Network Error", 0, detail);
  }
}
