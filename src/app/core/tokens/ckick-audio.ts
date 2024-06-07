import { InjectionToken } from '@angular/core';

export const ClickAudioToken = new InjectionToken('audioElement', {
  providedIn: 'root',
  factory: () => {
    const elm = new Audio('/assets/sound/click.mp3');
    elm.volume = 0.5;
    return elm;
  },
});
