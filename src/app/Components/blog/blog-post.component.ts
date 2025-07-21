import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { MarkdownModule } from 'ngx-markdown';
import { BlogService, BlogPostMeta } from './blog.service';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-blog-post',
  templateUrl: './blog-post.component.html',
  styleUrls: ['./blog-post.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule, MarkdownModule, HeaderComponent]
})
export class BlogPostComponent implements OnInit {
  postContent: string = '';
  postMeta: BlogPostMeta | null = null;
  loading: boolean = true;
  error: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private blogService: BlogService
  ) {}

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug');
    if (!slug) {
      this.router.navigate(['/blog']);
      return;
    }

    this.loadBlogPost(slug);
  }

  private loadBlogPost(slug: string): void {
    this.loading = true;
    this.error = '';

    // First, get the blog posts list to find the post metadata
    this.blogService.getBlogPosts().subscribe({
      next: (posts) => {
        const post = posts.find(p => p.slug === slug);
        if (!post) {
          this.error = 'Blog post not found';
          this.loading = false;
          return;
        }

        this.postMeta = post;
        
        // Now load the actual markdown content
        this.blogService.getBlogPost(post.file).subscribe({
          next: (content) => {
            // Remove the title and date from the markdown content to avoid duplication
            this.postContent = this.stripTitleAndDate(content);
            this.loading = false;
          },
          error: (err) => {
            console.error('Error loading blog post content:', err);
            this.error = 'Failed to load blog post content';
            this.loading = false;
          }
        });
      },
      error: (err) => {
        console.error('Error loading blog posts list:', err);
        this.error = 'Failed to load blog posts';
        this.loading = false;
      }
    });
  }

  private stripTitleAndDate(content: string): string {
    // Split content into lines
    const lines = content.split('\n');
    
    // Find the start of the actual content (skip title and date)
    let startIndex = 0;
    
    // Skip the title (starts with #)
    if (lines[startIndex] && lines[startIndex].trim().startsWith('#')) {
      startIndex++;
    }
    
    // Skip empty line after title
    if (lines[startIndex] && lines[startIndex].trim() === '') {
      startIndex++;
    }
    
    // Skip the date (italicized text with date pattern)
    if (lines[startIndex] && lines[startIndex].trim().match(/^\*\d{4}-\d{2}-\d{2}\*$/)) {
      startIndex++;
    }
    
    // Skip empty line after date
    if (lines[startIndex] && lines[startIndex].trim() === '') {
      startIndex++;
    }
    
    // Return the remaining content
    return lines.slice(startIndex).join('\n').trim();
  }
}
