import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProcedenciaService {

  private url_ponit = "http://localhost:8080/procedencias/";

  constructor(
    private httpClient: HttpClient
  ) { };

  public getAllProcedencia(): Observable<any>{
    return this.httpClient.get(this.url_ponit);
  }

  public saveProcedencia(procedencia:any): Observable<any> {
    return this.httpClient.post(this.url_ponit, procedencia);
  }

  // Eliminar Procedencia
  public deleteProcedencia(id: number):Observable<any>{
    return this.httpClient.delete(this.url_ponit + "delete/"+id)
  }


  // buscar idProcedencia
  public getByidProcedencia(id: any):Observable<any>{
    return this.httpClient.get(this.url_ponit + "buscar/"+id)
  }

}