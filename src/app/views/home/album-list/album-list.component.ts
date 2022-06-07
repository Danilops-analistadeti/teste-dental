import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { AlbumList } from '../interfaces/album-list.interface';
import { AlbumService } from '../services/album.service';
import { AlbumDetail } from './../interfaces/album-detail.interface';

@Component({
  selector: 'app-album-list',
  templateUrl: './album-list.component.html',
  styleUrls: ['./album-list.component.scss']
})
export class AlbumListComponent implements OnInit {

  listAlbums!: AlbumList[];
  detailAlbums!: AlbumDetail[];

  constructor(
    private albumService: AlbumService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.getItems();
  }

  getItems(): void {
    forkJoin([
      this.albumService.getListAlbuns(),
      this.albumService.getAlbumDetail()]).subscribe({
        next: resp => {
          this.listAlbums = resp[0];
          this.detailAlbums = resp[1]
        }
      })
  }

  getMiniatureUrl(albumId: number): string {
    const url = this.detailAlbums.filter(f => f.albumId === albumId);
    return url[0].url;
  }

  redirectDetail(albumId: number): void {
    this.router.navigateByUrl(`home/detail/${albumId}`);
  }

}
