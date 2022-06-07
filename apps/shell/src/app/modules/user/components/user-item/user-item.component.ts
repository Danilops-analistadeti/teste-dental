import { Component, Input } from '@angular/core';
import { User } from '../../interfaces/user.interface';
import { userCardColumn } from './constants/user-card-columns.constant';

@Component({
  selector: 'ec-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.scss']
})
export class UserItemComponent {
  @Input() user: User;

  userCardColumn = userCardColumn;
}
