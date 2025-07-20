import { Component } from '@angular/core';
import { ThemesService } from '../../../core/services';
import { ThemeModel } from '../../../models';
import { Theme } from "../theme/theme";
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-theme-board',
  imports: [Theme, CommonModule],
  templateUrl: './theme-board.html',
  styleUrl: './theme-board.css'
})
export class ThemeBoard {
  
  themes$: Observable<ThemeModel[]>;
  
  constructor(private themesService: ThemesService) {
    this.themes$ = this.themesService.getThemes();
  }

}
