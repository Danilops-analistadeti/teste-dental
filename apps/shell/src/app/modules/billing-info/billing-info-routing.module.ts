import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BillingInfoComponent } from './components/billing-info/billing-info.component';

const routes: Routes = [
  {
    path: '',
    component: BillingInfoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BillingInfoRoutingModule { }
