import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AddressComponent } from './address.component';

const COMPONENTS = [
  AddressComponent,
];

@NgModule({
  declarations: [COMPONENTS],
  imports: [
    CommonModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule
  ],
  bootstrap: [AddressComponent],
  exports: [COMPONENTS]
})
export class EnergyAddressModule { }
