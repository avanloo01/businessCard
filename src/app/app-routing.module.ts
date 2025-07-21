import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { CVComponent } from './Components/cv/cv.component';
import { BlogComponent } from './Components/blog/blog.component';
import { BlogPostComponent } from './Components/blog/blog-post.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'cv', component: CVComponent },
  { path: 'blog', component: BlogComponent },
  { path: 'blog/:slug', component: BlogPostComponent },
  { path: '**', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
