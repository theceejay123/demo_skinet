import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Basket, IBasket, IBasketTotal, IItem } from '../shared/models/basket';
import { IDeliveryMethod } from '../shared/models/deliveryMethod';
import { IProduct } from '../shared/models/product';

@Injectable({
  providedIn: 'root',
})
export class BasketService {
  private basketSrc = new BehaviorSubject<IBasket>(null);
  private basketTotalSrc = new BehaviorSubject<IBasketTotal>(null);

  basket$ = this.basketSrc.asObservable();
  basketTotal$ = this.basketTotalSrc.asObservable();

  baseUrl: string = environment.baseUrl;
  shipping = 0;

  constructor(private http: HttpClient) {}

  setShippingPrice(deliveryMethod: IDeliveryMethod) {
    this.shipping = deliveryMethod.price;
    const basket = this.getCurrentBasketValue();
    basket.deliveryMethodId = deliveryMethod.id;
    basket.shippingPrice = deliveryMethod.price;
    this.calculateTotal();
    this.setBasket(basket);
  }

  getBasket(id: string) {
    return this.http.get(this.baseUrl + 'basket?id=' + id).pipe(
      map((b: IBasket) => {
        this.basketSrc.next(b);
        this.shipping = b.shippingPrice;
        this.calculateTotal();
      })
    );
  }

  setBasket(basket: IBasket) {
    return this.http.post<IBasket>(this.baseUrl + 'basket', basket).subscribe(
      (response) => {
        this.basketSrc.next(response);
        this.calculateTotal();
      },
      (error) => console.error(error)
    );
  }

  getCurrentBasketValue() {
    return this.basketSrc.value;
  }

  addItemToBasket(item: IProduct, quantity: number = 1) {
    const itemToAdd: IItem = BasketService.mapToBasket(item, quantity);
    const basket: IBasket = this.getCurrentBasketValue() ?? BasketService.createBasket();
    basket.items = this.addOrUpdateItem(basket.items, itemToAdd, quantity);
    this.setBasket(basket);
  }

  incrementItemQty(item: IItem) {
    const basket = this.getCurrentBasketValue();
    const foundItemIndex = basket.items.findIndex((x) => x.id === item.id);
    basket.items[foundItemIndex].quantity++;
    this.setBasket(basket);
  }

  decrementItemQty(item: IItem) {
    const basket = this.getCurrentBasketValue();
    const foundItemIndex = basket.items.findIndex((x) => x.id === item.id);
    if (basket.items[foundItemIndex].quantity > 1) {
      basket.items[foundItemIndex].quantity--;
      this.setBasket(basket);
    } else {
      this.removeItemFromBasket(item);
    }
  }

  removeItemFromBasket(item: IItem) {
    const basket = this.getCurrentBasketValue();
    if (basket.items.some((x) => x.id === item.id)) {
      basket.items = basket.items.filter((x) => x.id !== item.id);
      if (basket.items.length > 0) {
        this.setBasket(basket);
      } else {
        this.deleteBasket(basket);
      }
    }
  }

  deleteLocalBasket(id: string) {
    this.basketSrc.next(null);
    this.basketTotalSrc.next(null);
    localStorage.removeItem('basket_id');
  }

  deleteBasket(basket: IBasket) {
    return this.http.delete(this.baseUrl + 'basket?id=' + basket.id).subscribe(
      () => {
        this.basketSrc.next(null);
        this.basketTotalSrc.next(null);
        localStorage.removeItem('basket_id');
      },
      (error) => console.log(error)
    );
  }

  createPaymentIntent() {
    return this.http.post(this.baseUrl + 'payment/' + this.getCurrentBasketValue().id, {}).pipe(
      map((basket: IBasket) => {
        this.basketSrc.next(basket);
      })
    )
  }

  private calculateTotal() {
    const basket = this.getCurrentBasketValue();
    const shippingCost = this.shipping;
    const subtotal = basket.items.reduce((a, b) => b.price * b.quantity + a, 0);
    const total = subtotal + shippingCost;
    this.basketTotalSrc.next({ amount: shippingCost, total, subtotal });
  }

  private addOrUpdateItem(items: IItem[], itemToAdd: IItem, quantity: number): IItem[] {
    const index = items.findIndex((i) => i.id === itemToAdd.id);
    switch (index) {
      case -1:
        itemToAdd.quantity = quantity;
        items.push(itemToAdd);
        break;
      default:
        items[index].quantity += quantity;
        break;
    }
    return items;
  }

  private static createBasket(): IBasket {
    const basket: IBasket = new Basket();
    localStorage.setItem('basket_id', basket.id);
    return basket;
  }

  private static mapToBasket(item: IProduct, quantity: number): IItem {
    return {
      id: item.id,
      name: item.name,
      price: item.price,
      pictureUrl: item.pictureUrl,
      quantity,
      brand: item.productBrand,
      type: item.productType,
    };
  }
}
