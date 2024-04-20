import { TestBed } from '@angular/core/testing';
import { LengthService } from './length.service';

describe('LengthService', () => {
  let service: LengthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LengthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('convert 1m must return 100cm', () => {
    const result = service.calculate('meter', 'centimeter', 1);

    expect(result).toBe(100);
  });

  it('convert same unit', () => {
    const result = service.calculate('meter', 'meter', 100);

    expect(result).toBe(100);
  });

  it('value default is 0', () => {
    const result = service.calculate('meter', 'meter');

    expect(result).toBe(0);
  });
});
