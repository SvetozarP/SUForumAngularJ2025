import { HttpErrorResponse, HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { catchError, throwError } from "rxjs";
import { ErrorService } from "../services";

export const ErrorInterceptor: HttpInterceptorFn = (req, next) => {
    const errorService = inject(ErrorService);


    return next(req).pipe(
        catchError((error: HttpErrorResponse) => {
            let errorMessage = '';
            if(error.error instanceof ErrorEvent) {
                // CLient side error
                errorMessage = error.error.message;
            } else {
                // Server side error
                errorMessage = error.error?.message || error.message;
            }
            errorService.setError(errorMessage);
            return throwError(() => error);
        })
    );
}