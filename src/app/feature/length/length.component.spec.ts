import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';

import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { Test } from '@core/util/test';
import { LengthComponent } from './length.component';

describe('LengthComponent', () => {
  let component: LengthComponent;
  let fixture: ComponentFixture<LengthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LengthComponent],
      providers: [provideAnimationsAsync()],
    }).compileComponents();

    fixture = TestBed.createComponent(LengthComponent);
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

  it('trigger convertBaseToTarget to convert 1m to cm', () => {
    component.ngOnInit();

    component.form.get('baseValue')?.setValue(1);
    component.form.get('baseUnit')?.setValue('meter');
    component.form.get('targetUnit')?.setValue('centimeter');

    expect(component.form.get('targetValue')?.value).toBe(100);
  });

  it('trigger convertTargetToBase to convert 100cm to 1m', () => {
    component.ngOnInit();
    component.form.get('baseValue')?.setValue(5);
    component.form.get('baseUnit')?.setValue('meter');
    component.form.get('targetUnit')?.setValue('centimeter');

    component.form.get('targetValue')?.setValue(100);

    expect(component.form.get('baseValue')?.value).toBe(1);
  });
});
