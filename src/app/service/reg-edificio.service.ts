import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RegEdificioService {

  private API_SERVER = "http://localhost:8080/edificios/"

  constructor(private httpClient: HttpClient) { }

  
  public getAllEdificios(): Observable<any>{
    return this.httpClient.get(this.API_SERVER);
  }

  public saveEdificios(edificio:any): Observable<any>{
    return this.httpClient.post(this.API_SERVER,edificio);
  }

    // public getEdificios(id_edificio:any): Observable<any>{
    //   return this.httpClient.post(this.API_SERVER + id_edificio);
    // }

  public deleteEdificios(id: number):Observable<any>{
    return this.httpClient.delete(this.API_SERVER + "delete/"+id);
  }
}

