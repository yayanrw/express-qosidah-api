class Pagination {
  page?: string;
  pageSize?: string;
  orderBy?: string = "id";
  orderDirection?: "asc" | "desc" = "asc";
  filter: { [key: string]: string | number };

  constructor(data: PaginationParams) {
    this.page = data.page;
    this.pageSize = data.pageSize;
    this.orderBy = data.orderBy;
    this.orderDirection = data.orderDirection;
    this.filter = data.filter ?? {};
  }

  getPaginationObject(): PaginationObject {
    const { page, pageSize, orderBy, orderDirection, filter } = this;

    return {
      page: Number(page),
      pageSize: Number(pageSize),
      orderBy: orderBy as string,
      orderDirection: orderDirection as "asc" | "desc",
      filter: filter,
      offset: (Number(page) - 1) * Number(pageSize),
    };
  }

  getPaginationResult(totalData: number): PaginationResult {
    const totalPages = Math.ceil(totalData / Number(this.pageSize));
    const currentPage = Number(this.page);
    const nextPage = currentPage < totalPages ? currentPage + 1 : null;
    const prevPage = currentPage > 1 ? currentPage - 1 : null;

    return {
      totalData: totalData,
      totalPages: totalPages,
      currentPage: currentPage,
      prevPage: prevPage,
      nextPage: nextPage,
    };
  }
}

interface PaginationParams {
  page?: string;
  pageSize?: string;
  orderBy?: string;
  orderDirection?: "asc" | "desc";
  filter?: { [key: string]: string | number };
}

interface PaginationObject {
  page?: number;
  pageSize?: number;
  orderBy?: string;
  orderDirection?: "asc" | "desc";
  filter: { [key: string]: string | number };
  offset: number;
}

interface PaginationResult {
  totalData: number;
  totalPages: number;
  currentPage: number;
  prevPage: number | null;
  nextPage: number | null;
}

interface Paging<T> {
  data: T;
  paging: PaginationResult;
}

export {
  Pagination,
  PaginationParams,
  PaginationResult,
  PaginationObject,
  Paging,
};
