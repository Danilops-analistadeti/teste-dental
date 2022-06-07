import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForbbidenComponent } from './components/forbbiden/forbbiden.component';

const routes: Routes = [
  {
    path: 'forbbiden',
    component: ForbbidenComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ErrorRoutingModule {}
