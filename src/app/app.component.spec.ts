import { TestBed } from '@angular/core/testing';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import { SwUpdate } from '@angular/service-worker';
import { Test } from '@core/util/test';
import { of } from 'rxjs';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let app: AppComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        provideAnimationsAsync(),
        provideRouter([]),
        {
          provide: SwUpdate,
          useValue: {
            isEnabled: true,
            versionUpdates: of({
              type: 'VERSION_READY',
            }),
          },
        },
      ],
    }).compileComponents();

    const fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it('pwa: if new version updated a toastr message will appear ', () => {
    const toastrOpenMethod = Test.spy(app.toastr, 'open').and.returnValue({
      afterDismissed: () => of(true),
    });

    const reloadMethod = Test.spy(app, 'reload');

    app.ngOnInit();

    expect(reloadMethod).toHaveBeenCalled();
    expect(toastrOpenMethod).toHaveBeenCalled();
  });
});
