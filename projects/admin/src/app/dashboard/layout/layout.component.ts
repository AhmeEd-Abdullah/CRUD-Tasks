import { Router } from '@angular/router';
import { LanguageService } from './../../shared/services/language.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout-component',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  constructor(
    private languageService: LanguageService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  logout() {
    this.router.navigate(['/login']);
  }

  changeLanguage(lang: string) {
    this.languageService.changeLanguage(lang);
    localStorage.setItem('lang', lang);
  }
}
