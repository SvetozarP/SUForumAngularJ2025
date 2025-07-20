import { Component, OnInit } from '@angular/core';
import { ThemesService } from '../../../core/services';
import { ThemeModel } from '../../../models';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-theme-board',
  imports: [],
  templateUrl: './theme-board.html',
  styleUrl: './theme-board.css'
})
export class ThemeBoard implements OnInit {

  themes: ThemeModel[] = [];
  
  constructor(private themesService: ThemesService) {}

  ngOnInit(): void {
    this.themesService.getThemes().pipe(takeUntilDestroyed()).subscribe((themes: ThemeModel[]) => {
      this.themes = themes;
    });
  }
}
