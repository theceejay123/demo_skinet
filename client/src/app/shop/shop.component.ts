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
  @ViewChild('search', { static: true }) searchTerm: ElementRef;

  products: IProduct[];
  brands: IBrand[];
  types: IType[];
  shopParams: ShopParams = new ShopParams();

  totalPageCount: number;

  sortOptions = [
    { name: 'Alphabetical: Ascending', value: 'name' },
    { name: 'Alphabetical: Descending', value: 'nameDesc' },
    { name: 'Price: Low to High', value: 'priceAsc' },
    { name: 'Price: High to Low', value: 'priceDesc' },
  ];

  constructor(private shopService: ShopService) {}

  ngOnInit(): void {
    this.initProducts();
    this.initTypes();
    this.initBrands();
  }

  initProducts() {
    this.shopService.getProducts(this.shopParams).subscribe(
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
    this.shopParams.brandIdSelected = brandId;
    this.shopParams.pageNumber = 1;
    this.initProducts();
  }

  onTypeSelected(typeId: number) {
    this.shopParams.typedIdSelected = typeId;
    this.shopParams.pageNumber = 1;
    this.initProducts();
  }

  onSortSelected(sort: string) {
    this.shopParams.sortSelected = sort;
    this.initProducts();
  }

  onPageChanged(page: number) {
    if (this.shopParams.pageNumber !== page) {
      this.shopParams.pageNumber = page;
      this.initProducts();
    }
  }

  onSearch() {
    this.shopParams.search = this.searchTerm.nativeElement.value;
    this.shopParams.pageNumber = 1;
    this.initProducts();
  }

  onReset() {
    this.searchTerm.nativeElement.value = '';
    this.shopParams = new ShopParams({ sortSelected: this.shopParams.sortSelected });
    this.initProducts();
  }

  private processProducts(response: IPagination) {
    this.products = response.data;
    this.shopParams.pageNumber = response.pageIndex;
    this.shopParams.pageSize = response.pageSize;
    this.totalPageCount = response.count;
  }
}
