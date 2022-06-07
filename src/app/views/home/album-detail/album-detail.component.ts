import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlbumDetail } from '../interfaces/album-detail.interface';
import { AlbumService } from '../services/album.service';

@Component({
  selector: 'app-album-detail',
  templateUrl: './album-detail.component.html',
  styleUrls: ['./album-detail.component.scss']
})
export class AlbumDetailComponent implements OnInit {

  detailAlbums!: AlbumDetail[];

  constructor(
    private albumService: AlbumService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.getItems();
  }

  getItems(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.getAlbumDetail(id);
  }

  getAlbumDetail(albumId: number): void {
    this.albumService.getAlbumDetail().subscribe({
      next: resp => this.detailAlbums = resp.filter(f => f.albumId === albumId).slice(0, 10)
    })
  }

}
