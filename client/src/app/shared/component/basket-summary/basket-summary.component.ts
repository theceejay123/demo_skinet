import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IItem } from '../../models/basket';
import { IOrderItem } from '../../models/order';

@Component({
  selector: 'skinet-basket-summary',
  templateUrl: './basket-summary.component.html',
  styleUrls: ['./basket-summary.component.scss'],
})
export class BasketSummaryComponent implements OnInit {
  @Input() isBasket: boolean = true;
  @Input() isOrder: boolean = false;
  @Input() items: IItem[] | IOrderItem[] = [];
  @Output() decrement: EventEmitter<IItem> = new EventEmitter<IItem>();
  @Output() increment: EventEmitter<IItem> = new EventEmitter<IItem>();
  @Output() remove: EventEmitter<IItem> = new EventEmitter<IItem>();

  constructor() {}

  ngOnInit(): void {}

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
