import { Component } from '@angular/core';
import { PostsService } from '../../../core/services';
import { PostModel } from '../../../models';
import { Post } from "../post/post";
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-post-board',
  imports: [Post, CommonModule],
  templateUrl: './post-board.html',
  styleUrl: './post-board.css'
})
export class PostBoard {

  posts$: Observable<PostModel[]>;
  posts: PostModel[] = [];

  constructor(private postsService: PostsService) {
    this.posts$ = this.postsService.getRecentPosts();
  }

 
}
