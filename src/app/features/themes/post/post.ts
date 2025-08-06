import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { PostModel } from '../../../models';
import { TimeAgoPipe } from '../../../shared/pipes';

@Component({
  selector: 'app-post',
  imports: [TimeAgoPipe],
  templateUrl: './post.html',
  styleUrl: './post.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Post {
  @Input() post!: PostModel;
}
