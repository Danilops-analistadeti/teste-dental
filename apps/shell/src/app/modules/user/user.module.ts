import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableModule } from '@angular/material/table';
import { EnergyLoadingModule } from '@energy-contracting';
import {
  EsferaButtonModule,
  EsferaCardItemModule,
  EsferaIconModule,
  EsferaListTemplateModule
} from '@esferaenergia/esfera-ui';
import { NgxMaskModule } from 'ngx-mask';
import { NgxPermissionsModule } from 'ngx-permissions';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { UserDetailItemComponent } from './components/user-detail-item/user-detail-item.component';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { UserItemComponent } from './components/user-item/user-item.component';
import { UsersComponent } from './components/users/users.component';
import { UserRoutingModule } from './user-routing.module';

@NgModule({
  declarations: [
    UsersComponent,
    UserItemComponent,
    UserDetailItemComponent,
    CreateUserComponent,
    EditUserComponent,
    UserDetailComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    EsferaCardItemModule,
    MatIconModule,
    MatTableModule,
    MatButtonModule,
    EsferaIconModule,
    MatSlideToggleModule,
    MatDialogModule,
    NgxMaskModule,
    NgxPermissionsModule.forChild(),
    EnergyLoadingModule,
    EsferaListTemplateModule,
    EsferaButtonModule
  ]
})
export class UserModule {}
