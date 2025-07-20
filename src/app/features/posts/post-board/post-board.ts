import { Component, OnInit } from '@angular/core';
import { PostsService } from '../../../core/services';
import { PostModel } from '../../../models';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-post-board',
  imports: [],
  templateUrl: './post-board.html',
  styleUrl: './post-board.css'
})
export class PostBoard implements OnInit {

  posts: PostModel[] = [];

  constructor(private postsService: PostsService) {}

  ngOnInit(): void {
    this.postsService.getRecentPosts().pipe(takeUntilDestroyed()).subscribe((posts: PostModel[]) => {
      this.posts = posts;
    });
  }
}
