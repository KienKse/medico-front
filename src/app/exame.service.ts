import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { Exame } from '../app/exame';

import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const apiUrl = "/api";

@Injectable({
  providedIn: 'root'
})
export class ExameService {
  uri = 'http://localhost:4000/exame';

  constructor(private http: HttpClient) { }

  addBusiness(risco_ocupacional, tipo_exame_codigo, paciente_codigo, medico_codigo ) {
    const obj = {
      risco_ocupacional: risco_ocupacional,
      tipo_exame_codigo: tipo_exame_codigo,
      paciente_codigo: paciente_codigo,
      medico_codigo: medico_codigo
    };
    console.log(obj);
    this.http.post(`${this.uri}/add`, obj)
        .subscribe(res => console.log('Done'));
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }

  getExames (): Observable<Exame[]> {
    return this.http.get<Exame[]>(`${this.uri}/all`)
    // return this.http.get<Exame[]>(apiUrl)
      .pipe(
        tap(heroes => console.log('fetched exames')),
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
    return this.http.post<Exame>(apiUrl, exame, httpOptions).pipe(
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
