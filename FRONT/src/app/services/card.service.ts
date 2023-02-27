import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Card } from '../models/card';
import { AuthService } from './auth.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  constructor(private httpClient: HttpClient, private auth: AuthService) { }

  getCards(): Observable<Card[]> {
    return this.httpClient.get<Card[]>(environment.cardUrl, this.auth.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError))
  }

  getCardById(id: number): Observable<Card> {
    return this.httpClient.get<Card>(environment.cardUrl + '/' + id)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  saveCard(card: Card): Observable<Card> {
    return this.httpClient.post<Card>(environment.cardUrl, JSON.stringify(card), this.auth.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  updateCard(card: Card): Observable<Card> {
    return this.httpClient.put<Card>(environment.cardUrl + '/' + card.id, JSON.stringify(card), this.auth.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  deleteCard(card: Card) {
    return this.httpClient.delete<Card>(environment.cardUrl + '/' + card.id, this.auth.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
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
}
