import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateQuotationComponent } from './create-quotation.component';

const routes: Routes = [
  {
    path: 'create-quotation',
    component: CreateQuotationComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateQuotationRoutingModule { }
