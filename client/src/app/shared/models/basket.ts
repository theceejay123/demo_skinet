import { v4 as uuidv4 } from 'uuid';

export interface IBasket {
  id: string;
  items: IItem[];
}

export interface IItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  pictureUrl: string;
  brand: string;
  type: string;
}

export class Basket implements IBasket {
  id = uuidv4();
  items: IItem[] = [];
}

export interface IBasketTotal {
  amount: number;
  subtotal: number;
  total: number;
}
