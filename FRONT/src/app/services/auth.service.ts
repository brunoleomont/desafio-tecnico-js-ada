import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token = '';
  authorization = {};

  authParams = { login: environment.login, senha: environment.password };

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  constructor(private httpClient: HttpClient) { }

  login(): Observable<string> {
    return this.httpClient.post<string>(environment.authUrl, JSON.stringify(this.authParams), this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError))
  }

  setParms(resultToken: string) {
    this.token = 'Bearer ' + resultToken;
    this.authorization = { Authorization: this.token };
    this.httpOptions.headers = this.httpOptions.headers.append('Authorization', this.token);
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Status erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  };
};
