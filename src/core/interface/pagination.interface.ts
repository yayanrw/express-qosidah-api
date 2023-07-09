export default interface Pagination {
  page?: number;
  pageSize?: number;
  orderBy?: string;
  orderDirection?: "asc" | "desc";
  filter?: {
    [key: string]: string | number;
  };
}
