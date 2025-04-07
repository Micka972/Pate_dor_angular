import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(public titleService: Title) {}

  ngOnInit() {
    this.titleService.setTitle("La Pâte d'Or");
  }
}
