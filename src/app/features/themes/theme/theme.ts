import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ThemeModel } from '../../../models';
import { SliceTitlePipe, TimeAgoPipe } from '../../../shared/pipes';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-theme',
  imports: [SliceTitlePipe, DatePipe],
  templateUrl: './theme.html',
  styleUrl: './theme.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Theme {
  @Input() theme!: ThemeModel;
}
