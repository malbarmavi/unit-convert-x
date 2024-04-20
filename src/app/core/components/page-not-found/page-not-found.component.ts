import { Component } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';

@Component({
  selector: 'uc-page-not-found',
  standalone: true,
  imports: [FlexModule],
  templateUrl: './page-not-found.component.html',
  styleUrl: './page-not-found.component.scss',
})
export class PageNotFoundComponent {}
