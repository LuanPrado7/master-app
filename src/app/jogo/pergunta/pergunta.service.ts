import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PerguntaService {

  constructor(private http: HttpClient) { }

  getPerguntas(params) : Observable<any[]>{
    return this.http
      .post("http://localhost:64803/api/buscarPerguntas", params)
      .pipe(
        map(res => res as any)
      )
  }
}
