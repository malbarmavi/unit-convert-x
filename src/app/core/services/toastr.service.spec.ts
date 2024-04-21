import { TestBed } from '@angular/core/testing';

import { Test } from '@core/util/test';
import { ToastrService } from './toastr.service';

describe('ToastrService', () => {
  let service: ToastrService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToastrService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('open will call snakbar open method', () => {
    const openMethod = Test.spy(service.snackBar, 'open');

    service.open('Hi');

    expect(openMethod).toHaveBeenCalledWith('Hi', '✖', service.config);
  });
});
