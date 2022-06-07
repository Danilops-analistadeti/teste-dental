import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterModule, Routes } from '@angular/router';
import { EsferaListTemplateModule, EsferaLoadingModule } from '@esferaenergia/esfera-ui';
import { NgxMaskModule } from 'ngx-mask';
import { GeneralDataItemComponent } from './components/general-data-item/general-data-item.component';
import { GeneralDataComponent } from './general-data.component';

const routes: Routes = [
  {
    path: '',
    component: GeneralDataComponent
  }
];

@NgModule({
  declarations: [GeneralDataComponent, GeneralDataItemComponent, GeneralDataItemComponent],
  imports: [
    CommonModule,
    MatCardModule,
    RouterModule.forChild(routes),
    EsferaListTemplateModule,
    NgxMaskModule,
    EsferaLoadingModule
  ]
})
export class GeneralDataModule {}
