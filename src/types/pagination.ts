export type PaginateData<T> = {
  list: T[];
  metadata: {
    count: number;
    hasNextPage: boolean;
    cursor?: string;
  }
}