import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError } from 'rxjs';

export const errorHandlerInterceptor: HttpInterceptorFn = (req, next) => {
  const toastr = inject(MatSnackBar);
  return next(req).pipe(
    catchError((err) => {
      toastr.open('⛔ Request has failed.', '✖', {
        horizontalPosition: 'left',
      });
      throw err;
    })
  );
};
