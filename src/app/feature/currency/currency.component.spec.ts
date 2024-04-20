import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { Test } from '@core/util/test';
import { of } from 'rxjs';
import { CurrencyComponent } from './currency.component';
import { USD_Rate } from './services/currency.service.spec';

describe('CurrencyComponent', () => {
  let component: CurrencyComponent;
  let fixture: ComponentFixture<CurrencyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CurrencyComponent, HttpClientTestingModule],
      providers: [provideAnimationsAsync()],
    }).compileComponents();

    fixture = TestBed.createComponent(CurrencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('baseValue change will trigger convert base method ', fakeAsync(() => {
    const method = Test.spy(component, 'convertBaseToTarget');

    component.ngOnInit();
    component.form.get('baseValue')?.setValue(10);
    tick(1500);
    expect(method).toHaveBeenCalled();
  }));

  it('targetValue change will trigger convert target method ', fakeAsync(() => {
    const method = Test.spy(component, 'convertTargetToBase');

    component.ngOnInit();
    component.form.get('targetValue')?.setValue(10);
    tick(1500);
    expect(method).toHaveBeenCalled();
  }));

  it('convertBaseToTarget must not called if form invalid', fakeAsync(() => {
    const method = Test.spy(component, 'convertBaseToTarget');
    component.ngOnInit();
    component.form.get('baseValue')?.reset('' as any);

    tick(1500);

    expect(component.form.valid).toBeFalse();
    expect(method).not.toHaveBeenCalled();
  }));

  it('convertTargetToBase must not called if form invalid', fakeAsync(() => {
    const method = Test.spy(component, 'convertTargetToBase');
    component.ngOnInit();
    component.form.get('targetValue')?.reset('' as any);

    tick(1500);

    expect(component.form.valid).toBeFalse();
    expect(method).not.toHaveBeenCalled();
  }));

  it('call convertBaseToTarget ', async () => {
    Test.spy(
      component.currencyService,
      'getCurrencyExchangeRate'
    ).and.returnValue(of(USD_Rate));

    component.form.get('baseValue')?.setValue(1);
    component.form.get('baseCode')?.setValue('USD');
    component.form.get('targetCode')?.setValue('TRY');

    await component.convertBaseToTarget();

    expect(component.form.get('targetValue')?.value).toBe(32);
  });
  it('call convertTargetToBase', async () => {
    Test.spy(
      component.currencyService,
      'getCurrencyExchangeRate'
    ).and.returnValue(of(USD_Rate));

    component.form.get('baseValue')?.setValue(0);
    component.form.get('baseCode')?.setValue('TRY');
    component.form.get('targetCode')?.setValue('USD');
    component.form.get('targetValue')?.setValue(1);

    await component.convertTargetToBase();

    expect(component.form.get('baseValue')?.value).toBe(32);
  });

  it('convertTargetToBase in case getCurrencyExchangeRate rise an error set the baseValue to 0', async () => {
    Test.spy(
      component.currencyService,
      'getCurrencyExchangeRate'
    ).and.returnValue(of(new Error()));

    component.form.get('baseValue')?.setValue(100);
    component.form.get('baseCode')?.setValue('TRY');
    component.form.get('targetCode')?.setValue('USD');
    component.form.get('targetValue')?.setValue(1);

    await component.convertTargetToBase();

    expect(component.form.get('baseValue')?.value).toBe(0);
  });

  it('convertBaseToTarget in case getCurrencyExchangeRate rise an error set the targetValue to 0', async () => {
    Test.spy(
      component.currencyService,
      'getCurrencyExchangeRate'
    ).and.returnValue(of(new Error()));

    component.form.get('baseValue')?.setValue(100);
    component.form.get('baseCode')?.setValue('USD');
    component.form.get('targetCode')?.setValue('TRY');

    await component.convertBaseToTarget();

    expect(component.form.get('targetValue')?.value).toBe(0);
  });
});
