import { CommonModule } from '@angular/common';
import { forwardRef, NgModule } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { NgOptionHighlightModule } from '@ng-select/ng-option-highlight';
import { NgSelectModule } from '@ng-select/ng-select';
import { MultiselectComponent } from './multiselect.component';
@NgModule({
  exports: [
    MultiselectComponent
  ],
  imports: [
    FormsModule,
    NgSelectModule,
    NgOptionHighlightModule,
    MatCheckboxModule,
    MatIconModule,
    CommonModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MultiselectComponent),
      multi: true
    },
  ],
  declarations: [
    MultiselectComponent,
  ],
  bootstrap: [
    MultiselectComponent
  ],
})
export class MultiselectModule { }
