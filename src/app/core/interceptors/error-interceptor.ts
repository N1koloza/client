import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { SnackbarService } from '../services/snackbar.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const route = inject(Router);
  const snackbarSrv = inject(SnackbarService);

  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      if (err.status === 400) {
       
        snackbarSrv.error(err.error.title || err.error);
      }
      if (err.status === 401) {

        snackbarSrv.error(err.error.title || err.error);
      }
      if (err.status === 404) {

        route.navigate(['/not-found']);
      }
      if (err.status === 500) {

        route.navigate(['/server-error']);
      }
      return throwError(() => err);
    })
  )
};
