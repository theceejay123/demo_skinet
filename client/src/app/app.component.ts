import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { IPagination } from './models/Pagination';
import { IProduct } from './models/product';

@Component({
  selector: 'skinet-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title: string = 'skinet';
  products: IProduct[];

  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {
    this.initializeRequest();
  }

  initializeRequest(): void {
    this.httpClient.get('https://localhost:5001/api/products?pageSize=50').subscribe(
      (response: IPagination) => {
        this.products = response.data;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
}
