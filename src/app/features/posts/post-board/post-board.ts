import { Component, OnDestroy, OnInit } from '@angular/core';
import { PostsService } from '../../../core/services';
import { PostModel } from '../../../models';
import { Post } from "../post/post";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post-board',
  imports: [Post],
  templateUrl: './post-board.html',
  styleUrl: './post-board.css'
})
export class PostBoard implements OnInit, OnDestroy {

  subscriptions: Subscription[] = [];
  posts: PostModel[] = [];

  constructor(private postsService: PostsService) {}

  ngOnInit(): void {
    this.subscriptions.push(this.postsService.getRecentPosts().subscribe((posts: PostModel[]) => {
      this.posts = posts;
    }));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
