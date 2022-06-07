import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AlbumDetail } from '../interfaces/album-detail.interface';
import { AlbumList } from '../interfaces/album-list.interface';
import { environment } from './../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {

  constructor(
    private httpClient: HttpClient,
  ) { }

  getListAlbuns(): Observable<AlbumList[]> {
    return this.httpClient.get<AlbumList[]>(`${environment.urls.api}/albums`);
  }

  getAlbumDetail(): Observable<AlbumDetail[]> {
    return this.httpClient.get<AlbumDetail[]>(`${environment.urls.api}/photos`);
  }
}
