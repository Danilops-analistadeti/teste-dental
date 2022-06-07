import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuoteUnavailableComponent } from './components/quote-unavailable/quote-unavailable.component';
import { HiringProposalComponent } from './hiring-proposal.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HiringProposalComponent,
  },
  {
    path: 'quote-unavailable',
    component: QuoteUnavailableComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HiringProposalRoutingModule {}
