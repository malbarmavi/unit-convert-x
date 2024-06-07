/* eslint-disable @angular-eslint/directive-selector */
import { Directive, HostListener, inject } from '@angular/core';
import { ClickAudioToken } from '@core/tokens/ckick-audio';
/**
 * Just for fun play click sound on click 🔊
 */
@Directive({
  selector: '[mat-list-item],[mat-button]',
  standalone: true,
})
export class ClickEffectDirective {
  clickAudio: HTMLAudioElement = inject(ClickAudioToken);

  @HostListener('click') clickHandler() {
    this.clickAudio.currentTime = 0;
    this.clickAudio.play();
  }
}
