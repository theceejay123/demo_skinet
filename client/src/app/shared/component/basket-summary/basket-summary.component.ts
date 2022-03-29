import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { BasketService } from 'src/app/basket/basket.service';
import { Basket, IItem } from '../../models/basket';

@Component({
  selector: 'skinet-basket-summary',
  templateUrl: './basket-summary.component.html',
  styleUrls: ['./basket-summary.component.scss'],
})
export class BasketSummaryComponent implements OnInit {
  @Input() isBasket: boolean = true;
  @Output() decrement: EventEmitter<IItem> = new EventEmitter<IItem>();
  @Output() increment: EventEmitter<IItem> = new EventEmitter<IItem>();
  @Output() remove: EventEmitter<IItem> = new EventEmitter<IItem>();
  basket$: Observable<Basket>;

  constructor(private bService: BasketService) {}

  ngOnInit(): void {
    this.basket$ = this.bService.basket$;
  }

  decrementItemQty(item: IItem) {
    this.decrement.emit(item);
  }

  incrementItemQty(item: IItem) {
    this.increment.emit(item);
  }

  removeBasketItem(item: IItem) {
    this.remove.emit(item);
  }
}
