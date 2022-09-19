import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';
import { Verpersonaf } from '../models/verpersonaf';

@Injectable({
  providedIn: 'root'
})
export class BaseFenixService {

  constructor(private http: HttpClient) { }

  private urlFenix:string = 'http://localhost:8080/api';

  public consultarUser(cedula: string): Observable<Verpersonaf> {
    return this.http.get<Verpersonaf>(this.urlFenix + `/personafenix/${cedula}`);
  }
}