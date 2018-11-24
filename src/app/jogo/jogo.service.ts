import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class JogoService {

  constructor(private http: HttpClient) { }

  getTemas(): Observable<any[]> {
    return this.http
      .get("http://localhost:64803/api/tema")
      .pipe(
        map(res => res as any)
      );
  }
}
