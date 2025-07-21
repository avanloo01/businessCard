import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

export interface BlogPostMeta {
  title: string;
  date: string;
  slug?: string; // Make slug optional since we'll derive it from date
  excerpt: string;
  file: string;
}

@Injectable({ providedIn: 'root' })
export class BlogService {
  private blogListUrl = 'assets/blog/blog-list.json';

  constructor(private http: HttpClient) {}

  // Helper method to get slug from date
  private getSlugFromDate(date: string): string {
    return date; // Use date directly as slug
  }

  getBlogPosts(): Observable<BlogPostMeta[]> {
    return this.http.get<BlogPostMeta[]>(this.blogListUrl).pipe(
      map(posts => posts.map(post => ({
        ...post,
        slug: post.slug || this.getSlugFromDate(post.date)
      })))
    );
  }

  getBlogPost(file: string): Observable<string> {
    return this.http.get(`assets/blog/${file}`, { responseType: 'text' });
  }
}
