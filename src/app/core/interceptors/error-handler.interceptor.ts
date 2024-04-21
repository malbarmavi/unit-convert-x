import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastrService } from '@core/services/toastr.service';
import { catchError } from 'rxjs';

export const errorHandlerInterceptor: HttpInterceptorFn = (req, next) => {
  const toastr = inject(ToastrService);
  return next(req).pipe(
    catchError((err) => {
      toastr.open('⛔ Request has failed.');
      throw err;
    })
  );
};
