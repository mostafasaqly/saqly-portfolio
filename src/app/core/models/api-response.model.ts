export interface ApiSuccessResponse {
  success: true;
  message: string;
}

export interface ApiErrorResponse {
  success: false;
  message: string;
}

export type ContactApiResponse = ApiSuccessResponse | ApiErrorResponse;
