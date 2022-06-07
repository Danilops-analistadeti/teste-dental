import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfigurationComponent } from './configuration.component';

const routes: Routes = [
  {
    path: '',
    component: ConfigurationComponent,
    children: [
      {
        path: '',
        redirectTo: 'company',
        pathMatch: 'full'
      },
      {
        path: 'company',
        loadChildren: () => import('../company/company.module').then((m) => m.CompanyModule)
      },
      {
        path: 'billing-info',
        loadChildren: () => import('../billing-info/billing-info.module').then((m) => m.BillingInfoModule)
      },
      {
        path: 'user',
        loadChildren: () => import('../user/user.module').then((m) => m.UserModule)
      },
      {
        path: 'offerers',
        loadChildren: () => import('../offerers/offerers.module').then((m) => m.OfferersModule)
      },
      {
        path: 'general-data',
        loadChildren: () => import('../general-data/general-data.module').then((m) => m.GeneralDataModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfigurationRoutingModule {}
