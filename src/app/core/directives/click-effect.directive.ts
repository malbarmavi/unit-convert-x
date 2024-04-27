/* eslint-disable @angular-eslint/directive-selector */
import { Directive, HostListener } from '@angular/core';
/**
 * Just for fun play click sound on click on some items 🔊
 */
@Directive({
  selector: '[mat-list-item],[mat-button]',
  standalone: true,
})
export class ClickEffectDirective {
  clickAudio: HTMLAudioElement;
  constructor() {
    this.clickAudio = new Audio('/assets/sound/click.mp3');
  }

  @HostListener('click') clickHandler() {
    this.clickAudio.currentTime = 0;
    this.clickAudio.play();
  }
}
