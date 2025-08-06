import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header, ErrorNotification } from './shared/components';
import { Footer } from "./shared/components/";


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer, ErrorNotification],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  
}
