export class Pagination<T> {
  constructor(
    public readonly total: number,
    public readonly page: number,
    public readonly limit: number,
    public readonly totalPages: number,
    public readonly results: T[],
  ) {}
}
