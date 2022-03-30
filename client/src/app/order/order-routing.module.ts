import { NgModule } from '@angular/core';
import { OrderComponent } from './order.component';
import { RouterModule, Routes } from '@angular/router';
import { OrderDetailedComponent } from './order-detailed/order-detailed.component';

const routes: Routes = [
  { path: '', component: OrderComponent },
  { path: ':id', component: OrderDetailedComponent, data: { breadcrumb: { alias: 'orderDetails' } } },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderRoutingModule {}
