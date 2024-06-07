import { TestBed } from '@angular/core/testing';
import { ClickEffectDirective } from './click-effect.directive';

describe('ClickEffectDirective', () => {
  let directive: ClickEffectDirective;

  beforeEach(() => {
    TestBed.runInInjectionContext(() => {
      directive = new ClickEffectDirective();
    });
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });
});
