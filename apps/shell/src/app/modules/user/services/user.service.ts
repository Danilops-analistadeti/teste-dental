import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable, Subject } from 'rxjs';
import { TermsLgpd } from '../interfaces/terms-lgpd.interface';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  refreshUsers: Subject<boolean> = new Subject();

  constructor(private httpClient: HttpClient) { }

  getUsers(orderBy = 'person.name'): Observable<User[]> {
    const params = new HttpParams().append('orderBy', orderBy);

    return this.httpClient.get<User[]>(environment.USERS, { params });
  }

  createUser(user: User): Observable<User> {
    return this.httpClient.post<User>(environment.USER, user);
  }

  editUser(user: User, userId: string = ''): Observable<User> {
    return this.httpClient.put<User>(`${environment.USER}${userId}/`, user);
  }

  deleteUser(userId: string = ''): Observable<User> {
    return this.httpClient.delete<User>(`${environment.USER}${userId}/`);
  }

  reloadUsers(choice: boolean): void {
    this.refreshUsers.next(choice);
  }

  acceptLgpdUser(userId: string = ''): Observable<TermsLgpd> {
    return this.httpClient.post<TermsLgpd>(`${environment.USERS}${userId}/contracts/sign`, {
      'contracts': ['privacy-contract']
    });
  }
}
