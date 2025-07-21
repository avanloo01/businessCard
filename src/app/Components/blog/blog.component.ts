import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BlogService, BlogPostMeta } from './blog.service';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule, HeaderComponent]
})
export class BlogComponent implements OnInit {
  blogPosts: BlogPostMeta[] = [];
  loading = true;
  error = '';

  constructor(private blogService: BlogService) {}

  ngOnInit() {
    this.loadBlogPosts();
  }

  loadBlogPosts() {
    this.blogService.getBlogPosts().subscribe({
      next: (posts) => {
        this.blogPosts = posts;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load blog posts';
        this.loading = false;
        console.error('Error loading blog posts:', err);
      }
    });
  }
}
