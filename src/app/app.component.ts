import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AsyncPipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { SwUpdate, VersionEvent } from '@angular/service-worker';
import { ClickEffectDirective } from '@core/directives/click-effect.directive';
import { ToastrService } from '@core/services/toastr.service';
import { Observable, map, shareReplay } from 'rxjs';
import { FlashLightEffectComponent } from './core/components/flash-light-effect/flash-light-effect.component';
import { LogoComponent } from './core/components/logo/logo.component';
import { MaterialModule } from './core/modules/material.module';

@Component({
  selector: 'uc-root',
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
    LogoComponent,
    ClickEffectDirective,
    FlashLightEffectComponent,
  ],
})
export class AppComponent implements OnInit {
  private breakpointObserver = inject(BreakpointObserver);
  sw = inject(SwUpdate);
  toastr = inject(ToastrService);

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  ngOnInit(): void {
    if (this.sw.isEnabled) {
      this.sw.versionUpdates.subscribe((e: VersionEvent) => {
        console.log(e.type);
        if (e.type === 'VERSION_READY') {
          this.toastr
            .open(
              '🎉 New version available! Refresh to update.',
              'Update Ready',
              0
            )
            .afterDismissed()
            .subscribe(() => {
              this.reload();
            });
        }
      });
    }
  }

  reload() {
    window.location.reload();
  }
}
