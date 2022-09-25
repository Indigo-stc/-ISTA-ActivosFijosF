import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Edificio } from '../models/edificio';

@Injectable({
  providedIn: 'root'
})

export class RegEdificioService {

  private API_SERVER = "http://localhost:8080/api/edificios"

  constructor(
    private httpClient: HttpClient
  ) { };
  
  public getAllEdificios(): Observable<any>{
    return this.httpClient.get(this.API_SERVER + "/listarEdificios");
  }

  public saveEdificios(edificio:any): Observable<any>{
    return this.httpClient.post(this.API_SERVER + "/guardarEdificio/",edificio);
  }

  public updateEdificios( edificio: Edificio, ): Observable<any>{
    return this.httpClient.put(this.API_SERVER + "/actualizarEdificio/", edificio, {responseType: "text" })
  }

  public getByidEdificio(id: number):Observable<Edificio>{
    return this.httpClient.get<Edificio>(this.API_SERVER + "/buscarEdificiosPorId/"+id)
  }
}