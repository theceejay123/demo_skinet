import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IBasket, IBasketTotal, IItem } from '../shared/models/basket';
import { BasketService } from './basket.service';

@Component({
  selector: 'skinet-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss'],
})
export class BasketComponent implements OnInit {
  basket$: Observable<IBasket>;
  basketTotal$: Observable<IBasketTotal>;

  constructor(private bService: BasketService) {}

  ngOnInit(): void {
    this.basket$ = this.bService.basket$;
    this.basketTotal$ = this.bService.basketTotal$;
  }

  removeBasketItem(item: IItem) {
    this.bService.removeItemFromBasket(item);
  }

  incrementItemQty(item: IItem) {
    this.bService.incrementItemQty(item);
  }

  decrementItemQty(item: IItem) {
    this.bService.decrementItemQty(item);
  }
}
