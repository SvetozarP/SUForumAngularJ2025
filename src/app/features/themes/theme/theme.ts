import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ThemeModel } from '../../../models';

@Component({
  selector: 'app-theme',
  imports: [],
  templateUrl: './theme.html',
  styleUrl: './theme.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Theme {
  @Input() theme!: ThemeModel;
}
