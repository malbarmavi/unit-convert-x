import { NgClass } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { ThemeMode } from '@core/types/theme-mode';

/*
 * inspired by https://tonsky.me/blog/checkbox/
 */
@Component({
  selector: 'uc-flash-light-effect',
  standalone: true,
  imports: [NgClass],
  templateUrl: './flash-light-effect.component.html',
  styleUrl: './flash-light-effect.component.scss',
})
export class FlashLightEffectComponent {
  mode: ThemeMode = 'light';

  switch() {
    if (this.mode === 'light') {
      this.mode = 'dark';
    } else {
      this.mode = 'light';
    }
  }

  @HostListener('document:mousemove', ['$event'])
  @HostListener('document:touchstart', ['$event'])
  @HostListener('document:touchmove', ['$event'])
  @HostListener('document:touchend', ['$event'])
  mouseMoveHandler(e: MouseEvent) {
    if (this.mode === 'dark') {
      const offset = 250;

      document.body.style.setProperty('--mouse-x', `${e.clientX - offset}px`);
      document.body.style.setProperty('--mouse-y', `${e.clientY - offset}px`);

      console.log(e.clientX, ' - ', e.clientY);
    }
  }
}
