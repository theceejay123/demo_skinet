import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IBasketTotal } from '../../models/basket';
import { BasketService } from '../../../basket/basket.service';

@Component({
  selector: 'skinet-order-total',
  templateUrl: './order-total.component.html',
  styleUrls: ['./order-total.component.scss'],
})
export class OrderTotalComponent implements OnInit {
  @Input() shippingPrice: number;
  @Input() subTotal: number;
  @Input() total: number;

  constructor() {}

  ngOnInit(): void {}
}
