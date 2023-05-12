import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AddPostComponent } from './components/add-post/add-post.component';
import { ListPostComponent } from './components/list-post/list-post.component';
import { UpdatePostComponent } from './components/update-post/update-post.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'add', component: AddPostComponent },
  { path: 'list', component: ListPostComponent },
  { path: 'list/:id', component: UpdatePostComponent },
  { path: "**", component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
