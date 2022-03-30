import { IAddress } from './address';

export interface IOrderToCreate {
  basketId: string;
  deliveryMethodId: number;
  shipToAddress: IAddress;
}

export interface IDeliveryMethod {
  id: number;
  shortName: string;
  deliveryTime: string;
  description: string;
  price: number;
}

export interface IItemOrdered {
  productItemId: number;
  productName: string;
  pictureUrl: string;
}

export interface IOrderItem {
  id: number;
  itemOrdered: IItemOrdered;
  price: number;
  quantity: number;
}

export interface IOrder {
  id: number;
  buyerEmail: string;
  orderDate: Date;
  shipToAddress: IAddress;
  deliveryMethod: IDeliveryMethod;
  orderItems: IOrderItem[];
  subTotal: number;
  total: number;
  shippingPrice: number;
  status: number;
  paymentIntentId: string;
}
