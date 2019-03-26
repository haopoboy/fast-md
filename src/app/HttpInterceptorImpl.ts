import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { environment } from "src/environments/environment";

@Injectable()
export class HttpInterceptorImpl implements HttpInterceptor {
  siginRedirectUrl = `${environment.siginRedirectUrl}`;
  constructor() {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      tap(
        (event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            // Handle successful reponse
          }
        },
        (err: any) => {
          if (err instanceof HttpErrorResponse) {
            this.handleError(err);
          }
        }
      )
    );
  }

  async handleError(err: any) {
    if (err.error.text.includes("單簽")) {
      console.log(location.href);
      location.href = `${this.siginRedirectUrl}${location.href}`;
    }
  }
}
