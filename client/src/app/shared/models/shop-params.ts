interface IShopParams {
  brandIdSelected?: number;
  typedIdSelected?: number;
  sortSelected?: string;
  pageNumber?: number;
  pageSize?: number;
  search?: string;
}

export class ShopParams implements IShopParams {
  brandIdSelected?: number;
  typedIdSelected?: number;
  sortSelected?: string;
  pageNumber?: number;
  pageSize?: number;
  search?: string;

  constructor(options: IShopParams = {}) {
    this.brandIdSelected = options.brandIdSelected || 0;
    this.typedIdSelected = options.typedIdSelected || 0;
    this.sortSelected = options.sortSelected || 'name';
    this.pageNumber = options.pageNumber || 1;
    this.pageSize = options.pageSize || 10;
    this.search = options.search || '';
  }
}
