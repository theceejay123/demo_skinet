import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PaginationModule } from 'ngx-bootstrap/pagination';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CdkStepperModule } from '@angular/cdk/stepper';

import { PagingHeaderComponent } from './component/paging-header/paging-header.component';
import { PagerComponent } from './component/pager/pager.component';
import { OrderTotalComponent } from './component/order-total/order-total.component';
import { TextInputComponent } from './component/text-input/text-input.component';
import { StepperComponent } from './component/stepper/stepper.component';
import { BasketSummaryComponent } from './component/basket-summary/basket-summary.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [PagingHeaderComponent, PagerComponent, OrderTotalComponent, TextInputComponent, StepperComponent, BasketSummaryComponent],
  imports: [
    CommonModule,
    RouterModule,
    BsDropdownModule.forRoot(),
    PaginationModule.forRoot(),
    FormsModule,
    CarouselModule.forRoot(),
    ReactiveFormsModule,
    CdkStepperModule,
  ],
  exports: [
    PaginationModule,
    PagingHeaderComponent,
    PagerComponent,
    CarouselModule,
    OrderTotalComponent,
    ReactiveFormsModule,
    BsDropdownModule,
    TextInputComponent,
    CdkStepperModule,
    StepperComponent,
    BasketSummaryComponent,
  ],
})
export class SharedModule {}
