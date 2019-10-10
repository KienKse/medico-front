import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { Exame } from '../app/exame';

import { sucesso } from '../app/app.component';


import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';



const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
// const apiUrl = "/api";
const apiUrl = "http://localhost:8081/api";

@Injectable({
  providedIn: 'root'
})
export class ExameService {
  uri = 'http://localhost:8081/api';

  
  constructor(private http: HttpClient) { } 
  
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }

  getExames (): Observable<Exame[]> {
    return this.http.get<Exame[]>(`${this.uri}/all`)
      .pipe(
        tap(exames => console.log('fetched exames')),
        catchError(this.handleError('getExames', []))
      );
  }
  
  getExame(codigo: number): Observable<Exame> {
    const url = `${apiUrl}/${codigo}`;
    return this.http.get<Exame>(url).pipe(
      tap(_ => console.log(`fetched exame codigo=${codigo}`)),
      catchError(this.handleError<Exame>(`getExame codigo=${codigo}`))
    );
  }
  
  addExame (exame): Observable<Exame> {
    console.log("Exame:\n"+exame)
    return this.http.post<Exame>(`${apiUrl}/add`, exame, httpOptions).pipe(
      tap((exame: Exame) => console.log(`added exame w/ codigo=${exame.codigo}`)),
      catchError(this.handleError<Exame>('addExame'))
    );
  }
  
  updateExame (codigo, exame): Observable<any> {
    const url = `${apiUrl}/exame/${codigo}`;
    return this.http.put(url, exame, httpOptions).pipe(
      tap(_ => console.log(`updated exame codigo=${codigo}`)),
      catchError(this.handleError<any>('updateExame'))
    );
  }
  
  deleteExame (codigo): Observable<Exame> {
    const url = `${apiUrl}/exame/${codigo}`;
  
    return this.http.delete<Exame>(url, httpOptions).pipe(
      tap(_ => console.log(`deleted exame codigo=${codigo}`)),
      catchError(this.handleError<Exame>('deleteExame'))
    );
  }

}
