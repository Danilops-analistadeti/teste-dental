import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { AlbumDetailComponent } from './album-detail/album-detail.component';
import { AlbumListComponent } from './album-list/album-list.component';
import { HomeRoutingModule } from './home-routing.module';
import { AlbumService } from './services/album.service';

const MATERIAL = [
  MatListModule,
  MatCardModule
]

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    HttpClientModule,

    ...MATERIAL
  ],
  declarations: [
    AlbumListComponent,
    AlbumDetailComponent
  ],
  providers: [
    AlbumService
  ]
})
export class HomeModule { }
