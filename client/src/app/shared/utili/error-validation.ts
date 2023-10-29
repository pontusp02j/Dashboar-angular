import { throwError } from 'rxjs';

export class ErrorValidation {

  public static handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
        // Client-side error
        errorMessage = `Client-side error: ${error.error.message}`;
    } else {
        // Server-side error
        errorMessage = `Server-side error: Error Code: ${error.status} - Message: ${error.message}`;
    }
    console.error(errorMessage); // You can replace this with a logging service if you have one
    return throwError(errorMessage);
  }
}