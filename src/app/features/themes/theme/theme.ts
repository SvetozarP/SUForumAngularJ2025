import { Component, Input } from '@angular/core';
import { ThemeModel } from '../../../models';

@Component({
  selector: 'app-theme',
  imports: [],
  templateUrl: './theme.html',
  styleUrl: './theme.css'
})
export class Theme {
  @Input() theme!: ThemeModel;
}
