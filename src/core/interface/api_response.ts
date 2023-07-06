interface ApiResponse<T> {
  error: string | null;
  message: string;
  data?: T | null;
}

export default ApiResponse;
