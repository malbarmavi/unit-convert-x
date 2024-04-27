import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlashLightEffectComponent } from './flash-light-effect.component';

describe('FlashLightEffectComponent', () => {
  let component: FlashLightEffectComponent;
  let fixture: ComponentFixture<FlashLightEffectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlashLightEffectComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FlashLightEffectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
