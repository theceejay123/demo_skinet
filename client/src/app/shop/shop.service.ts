import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { IBrand } from '../shared/models/brand';
import { IPagination, Pagination } from '../shared/models/pagination';
import { IProduct } from '../shared/models/product';
import { IType } from '../shared/models/product-type';
import { ShopParams } from '../shared/models/shop-params';

@Injectable({
  providedIn: 'root',
})
export class ShopService {
  baseUrl: string = 'https://localhost:5001/api/';
  brands: IBrand[] = [];
  types: IType[] = [];
  pagination: Pagination = new Pagination();
  shopParams: ShopParams = new ShopParams();
  productCache = new Map();

  constructor(private http: HttpClient) {}

  getProducts(useCache: boolean): Observable<IPagination> {
    if (!useCache) {
      this.productCache = new Map();
    }

    if (this.productCache.size > 0 && useCache) {
      if (this.productCache.has(Object.values(this.shopParams).join('-'))) {
        this.pagination.data = this.productCache.get(Object.values(this.shopParams).join('-'));
        return of(this.pagination);
      }
    }

    let params = new HttpParams();

    if (this.shopParams.brandIdSelected !== 0) {
      params = params.append('brandId', this.shopParams.brandIdSelected.toString());
    }

    if (this.shopParams.typedIdSelected !== 0) {
      params = params.append('typeId', this.shopParams.typedIdSelected.toString());
    }

    if (this.shopParams.search) {
      params = params.append('search', this.shopParams.search);
    }

    params = params.append('sort', this.shopParams.sortSelected);
    params = params.append('pageIndex', this.shopParams.pageNumber.toString());
    params = params.append('pageSize', this.shopParams.pageSize.toString());

    return this.http.get<IPagination>(this.baseUrl + 'products', { observe: 'response', params }).pipe(
      map((response) => {
        this.productCache.set(Object.values(this.shopParams).join('-'), response.body.data);
        this.pagination = response.body;
        return this.pagination;
      })
    );
  }

  setShopParams(params: ShopParams) {
    this.shopParams = params;
  }

  getShopParams() {
    return this.shopParams;
  }

  getProduct(id: number) {
    let product: IProduct;
    this.productCache.forEach((products: IProduct[]) => {
      product = products.find(p => p.id === id)
    })
    
    if (product) {
      return of(product);
    }
    return this.http.get<IProduct>(this.baseUrl + 'products/' + id).pipe(take(1));
  }

  getBrands(): Observable<IBrand[]> {
    if (this.brands.length > 0) {
      return of(this.brands);
    }
    return this.http.get<IBrand[]>(this.baseUrl + 'products/brands').pipe(
      map((response) => {
        this.brands = response;
        return response;
      })
    );
  }

  getTypes(): Observable<IType[]> {
    if (this.types.length > 0) {
      return of(this.types);
    }
    return this.http.get<IType[]>(this.baseUrl + 'products/types').pipe(
      map(response => {
        this.types = response;
        return response;
      })
    );
  }
}
