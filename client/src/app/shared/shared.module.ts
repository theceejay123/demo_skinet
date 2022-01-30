import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaginationModule } from 'ngx-bootstrap/pagination';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { PagingHeaderComponent } from './component/paging-header/paging-header.component';
import { PagerComponent } from './component/pager/pager.component';
import { FormsModule } from '@angular/forms';
import { OrderTotalComponent } from './component/order-total/order-total.component';

@NgModule({
  declarations: [PagingHeaderComponent, PagerComponent, OrderTotalComponent],
  imports: [CommonModule, PaginationModule.forRoot(), FormsModule, CarouselModule.forRoot()],
  exports: [PaginationModule, PagingHeaderComponent, PagerComponent, CarouselModule, OrderTotalComponent],
})
export class SharedModule {}
