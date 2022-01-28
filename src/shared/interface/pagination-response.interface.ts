export interface PaginationResponse<T = any> {
  item: T;
  total: number;
  perpage: number;
  page: number;
  [index: string]: any;
}
