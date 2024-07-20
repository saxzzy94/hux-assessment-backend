import { Response } from 'express';

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

export const successResponse = <T>(res: Response, message: string, data?: T, statusCode: number = 200): void => {
  const response: ApiResponse<T> = {
    success: true,
    message,
    data
  };
  res.status(statusCode).json(response);
};

export const errorResponse = (res: Response, error: unknown, statusCode: number = 400): void => {
  const message = error instanceof Error ? error.message : 'An unknown error occurred';
  const response: ApiResponse<null> = {
    success: false,
    message,
    error: message
  };
  res.status(statusCode).json(response);
};
