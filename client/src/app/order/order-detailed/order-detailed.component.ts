import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IOrder } from 'src/app/shared/models/order';
import { BreadcrumbService } from 'xng-breadcrumb';
import { OrderService } from '../order.service';

@Component({
  selector: 'skinet-order-detailed',
  templateUrl: './order-detailed.component.html',
  styleUrls: ['./order-detailed.component.scss'],
})
export class OrderDetailedComponent implements OnInit {
  order: IOrder;

  constructor(private orderService: OrderService, private activatedRoute: ActivatedRoute, private bcService: BreadcrumbService) {
    this.bcService.set('@orderDetails', ' ');
  }

  ngOnInit(): void {
    this.inititializeOrder();
  }

  inititializeOrder() {
    this.orderService.getOrder(+this.activatedRoute.snapshot.paramMap.get('id')).subscribe(
      (response: IOrder) => {
        this.order = response;
        this.bcService.set('@orderDetails', `Order #${this.order.id.toString()} - ${this.order.status}`);
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
