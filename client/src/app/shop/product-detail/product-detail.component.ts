import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from 'src/app/shared/models/product';
import { BreadcrumbService } from 'xng-breadcrumb';
import { ShopService } from '../shop.service';

@Component({
  selector: 'skinet-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
  product: IProduct;

  constructor(private shopService: ShopService, private activatedRoute: ActivatedRoute, private bcService: BreadcrumbService) {
    this.bcService.set('@productDetails', ' ');
  }

  ngOnInit(): void {
    this.initProduct();
  }

  initProduct() {
    this.shopService.getProduct(+this.activatedRoute.snapshot.paramMap.get('id')).subscribe(
      (response) => {
        this.product = response;
        this.bcService.set('@productDetails', this.product.name);
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
