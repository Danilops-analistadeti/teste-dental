import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PermissionGuard } from 'src/app/guards/permission.guard';
import { AlbumDetailComponent } from './album-detail/album-detail.component';
import { AlbumListComponent } from './album-list/album-list.component';

const routes: Routes = [
    {
        path: '',
        canActivate: [PermissionGuard],
        children: [
            {
                path: '',
                redirectTo: 'list'
            },
            {
                path: 'list',
                component: AlbumListComponent
            },
            {
                path: 'detail/:id',
                component: AlbumDetailComponent
            }
        ]
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class HomeRoutingModule { }
