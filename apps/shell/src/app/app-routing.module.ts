import { loadRemoteModule } from '@angular-architects/module-federation';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { environment } from 'environments/environment';
import { AuthGuard } from './auth-guard/auth-guard.service';

const routes: Routes = [
  {
    path: 'proposal',
    loadChildren: () =>
      loadRemoteModule({
        remoteEntry: `${environment.ENV_BUCKET_HIRING_PROPOSAL}`,
        remoteName: 'hiringProposal',
        exposedModule: './Module'
      }).then((m) => m.HiringProposalModule)
  },
  {
    path: 'auth',
    loadChildren: () =>
      loadRemoteModule({
        remoteEntry: `${environment.ENV_BUCKET_AUTH}`,
        remoteName: 'auth',
        exposedModule: './Module'
      }).then((m) => m.AuthModule)
  },
  {
    path: 'pre-registration',
    loadChildren: () =>
      import('./modules/pre-registration/pre-registration.module').then((m) => m.PreRegistrationModule)
  },
  {
    path: 'configuration',
    loadChildren: () => import('./modules/configuration/configuration.module').then((m) => m.ConfigurationModule)
  },
  {
    path: '',
    loadChildren: () => import('./modules/logged-area/logged-area.module').then((m) => m.LoggedAreaModule),
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: false,
      relativeLinkResolution: 'legacy'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
