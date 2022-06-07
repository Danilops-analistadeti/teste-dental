import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from '../../interfaces/user.interface';

@Component({
  selector: 'ec-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: User) { }
}
