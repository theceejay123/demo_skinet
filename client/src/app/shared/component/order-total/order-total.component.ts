import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IBasketTotal } from '../../models/basket';
import { BasketService } from '../../../basket/basket.service';

@Component({
  selector: 'skinet-order-total',
  templateUrl: './order-total.component.html',
  styleUrls: ['./order-total.component.scss'],
})
export class OrderTotalComponent implements OnInit {
  basketTotal$: Observable<IBasketTotal>;

  constructor(private bsService: BasketService) {}

  ngOnInit(): void {
    this.basketTotal$ = this.bsService.basketTotal$;
  }
}
