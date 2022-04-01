import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IBrand } from '../shared/models/brand';
import { IPagination } from '../shared/models/pagination';
import { IProduct } from '../shared/models/product';
import { IType } from '../shared/models/product-type';
import { ShopParams } from '../shared/models/shop-params';
import { ShopService } from './shop.service';

@Component({
  selector: 'skinet-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
})
export class ShopComponent implements OnInit {
  @ViewChild('search', { static: false }) searchTerm: ElementRef;

  products: IProduct[];
  brands: IBrand[];
  types: IType[];
  shopParams: ShopParams;

  totalPageCount: number;

  sortOptions = [
    { name: 'Alphabetical: Ascending', value: 'name' },
    { name: 'Alphabetical: Descending', value: 'nameDesc' },
    { name: 'Price: Low to High', value: 'priceAsc' },
    { name: 'Price: High to Low', value: 'priceDesc' },
  ];

  constructor(private shopService: ShopService) {
    this.shopParams = this.shopService.getShopParams();
  }

  ngOnInit(): void {
    this.initProducts(true);
    this.initTypes();
    this.initBrands();
  }

  initProducts(useCache: boolean = false) {
    this.shopService.getProducts(useCache).subscribe(
      (response) => {
        this.processProducts(response);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  initBrands() {
    this.shopService.getBrands().subscribe(
      (response) => {
        this.brands = [{ id: 0, name: 'All' }, ...response];
      },
      (error) => {
        console.log(error);
      }
    );
  }

  initTypes() {
    this.shopService.getTypes().subscribe(
      (response) => {
        this.types = [{ id: 0, name: 'All' }, ...response];
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onBrandSelected(brandId: number) {
    const params = this.shopService.getShopParams();
    params.brandIdSelected = brandId;
    params.pageNumber = 1;
    this.shopService.setShopParams(params);
    this.initProducts();
  }

  onTypeSelected(typeId: number) {
    const params = this.shopService.getShopParams();
    params.typedIdSelected = typeId;
    params.pageNumber = 1;
    this.shopService.setShopParams(params);
    this.initProducts();
  }

  onSortSelected(sort: string) {
    const params = this.shopService.getShopParams();
    params.sortSelected = sort;
    this.shopService.setShopParams(params);
    this.initProducts();
  }

  onPageChanged(page: number) {
    const params = this.shopService.getShopParams();
    if (params.pageNumber !== page) {
      params.pageNumber = page;
      this.shopService.setShopParams(params);
      this.initProducts(true);
    }
  }

  onSearch() {
    const params = this.shopService.getShopParams();
    params.search = this.searchTerm.nativeElement.value;
    params.pageNumber = 1;
    this.shopService.setShopParams(params);
    this.initProducts();
  }

  onReset() {
    this.searchTerm.nativeElement.value = '';
    this.shopParams = new ShopParams({ sortSelected: this.shopParams.sortSelected });
    this.shopService.setShopParams(this.shopParams);
    this.initProducts();
  }

  private processProducts(response: IPagination) {
    this.products = response.data;
    this.totalPageCount = response.count;
  }
}
