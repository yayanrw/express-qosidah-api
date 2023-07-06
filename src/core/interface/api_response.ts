interface ApiResponse<T> {
  error: string | null;
  message: string;
  data: T;
}

export default ApiResponse;
