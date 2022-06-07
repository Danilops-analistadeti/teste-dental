import { loadRemoteModule } from '@angular-architects/module-federation';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { environment } from 'environments/environment';
import { LoggedAreaComponent } from './logged-area.component';

const routes: Routes = [
  {
    path: '',
    component: LoggedAreaComponent,
    children: [
      {
        path: '',
        redirectTo: '/quotation',
        pathMatch: 'full'
      },
      {
        path: 'quotation',
        loadChildren: () => import('../quotation/quotation.module').then((m) => m.QuotationModule)
      },
      {
        path: 'configuration',
        loadChildren: () => import('../configuration/configuration.module').then((m) => m.ConfigurationModule)
      },
      {
        path: 'error',
        loadChildren: () => import('../error/error.module').then((m) => m.ErrorModule)
      },
      {
        path: 'quotation',
        loadChildren: () =>
          loadRemoteModule({
            remoteEntry: `${environment.ENV_BUCKET_CREATE_QUOTATION}`,
            remoteName: 'createQuotation',
            exposedModule: './Module'
          }).then((m) => m.CreateQuotationModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoggedAreaRoutingModule {}
