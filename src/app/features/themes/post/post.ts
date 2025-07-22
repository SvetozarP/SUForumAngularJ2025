import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { PostModel } from '../../../models';

@Component({
  selector: 'app-post',
  imports: [],
  templateUrl: './post.html',
  styleUrl: './post.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Post {
  @Input() post!: PostModel;
}
