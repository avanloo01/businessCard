import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { MarkdownModule } from 'ngx-markdown';

import { AppComponent } from './app/app.component';
import { HomeComponent } from './app/Components/home/home.component';
import { CVComponent } from './app/Components/cv/cv.component';
import { BlogComponent } from './app/Components/blog/blog.component';
import { BlogPostComponent } from './app/Components/blog/blog-post.component';

const routes = [
  { path: '', component: HomeComponent },
  { path: 'cv', component: CVComponent },
  { path: 'blog', component: BlogComponent },
  { path: 'blog/:slug', component: BlogPostComponent },
  { path: '**', component: HomeComponent },
];

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    importProvidersFrom(MarkdownModule.forRoot())
  ]
}).catch(err => console.error(err));
