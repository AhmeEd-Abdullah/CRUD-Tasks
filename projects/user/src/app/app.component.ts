import { Component, HostListener, OnInit } from '@angular/core';
import { LanguageService } from './shared/services/language.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  currentLanguage: any;
  isSmallScreen!: boolean;
  @HostListener('window:resize')
  onWindowResize(): void {
    this.checkWindowWidth();
  }
  constructor(private languageService: LanguageService) {}

  ngOnInit(): void {
    this.currentLanguage = localStorage.getItem('lang') || 'en';
    this.languageService.changeLanguage(this.currentLanguage);
    this.checkWindowWidth();
  }

  checkWindowWidth() {
    this.isSmallScreen = window.innerWidth < 992;
  }
}
