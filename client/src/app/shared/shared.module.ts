import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PaginationModule } from 'ngx-bootstrap/pagination';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { PagingHeaderComponent } from './component/paging-header/paging-header.component';
import { PagerComponent } from './component/pager/pager.component';
import { OrderTotalComponent } from './component/order-total/order-total.component';
import { TextInputComponent } from './component/text-input/text-input.component';

@NgModule({
  declarations: [PagingHeaderComponent, PagerComponent, OrderTotalComponent, TextInputComponent],
  imports: [CommonModule, BsDropdownModule.forRoot(), PaginationModule.forRoot(), FormsModule, CarouselModule.forRoot(), ReactiveFormsModule],
  exports: [PaginationModule, PagingHeaderComponent, PagerComponent, CarouselModule, OrderTotalComponent, ReactiveFormsModule, BsDropdownModule, TextInputComponent],
})
export class SharedModule {}
