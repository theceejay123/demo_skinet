import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getOrders() {
    return this.http.get(this.baseUrl + 'orders');
  }

  getOrder(id: number) {
    return this.http.get(this.baseUrl + 'orders/' + id)
  }
}
