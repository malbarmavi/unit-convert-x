import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Observable, map, shareReplay } from 'rxjs';
import { MaterialModule } from './core/modules/material.module';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MaterialModule,
    AsyncPipe,
    FlexModule,
  ],
})
export class AppComponent {
  title = 'unit-convert-x';

  private breakpointObserver = inject(BreakpointObserver);

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );
}
