import { Component } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';

@Component({
  selector: 'uc-logo',
  standalone: true,
  imports: [FlexModule],
  template: ` <div fxLayout="row" fxLayoutAlign="start center">
    <img class="o-8" src="./assets/logo.png" alt="logo" />
    <span>Unit Convert</span>
  </div>`,
  styles: `img {width:36px}`,
})
export class LogoComponent {}
