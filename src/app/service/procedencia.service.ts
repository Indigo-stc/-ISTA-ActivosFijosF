import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const url_ponit = 'http://localhost:8080/api/procedencia';

@Injectable({
  providedIn: 'root'
})
export class ProcedenciaService {

  //private url_ponit = "http://localhost:8080/procedencias/";

  constructor(
    private httpClient: HttpClient
  ) { };

  public getAllProcedencia(): Observable<any>{
    return this.httpClient.get(url_ponit + '/listar');
  }

  public saveProcedencia(procedencia:any): Observable<any> {
    return this.httpClient.post(url_ponit + '/save', procedencia);
  }

  // Eliminar Procedencia
  public deleteProcedencia(id: number):Observable<any>{
    return this.httpClient.delete(url_ponit + "/delete/"+id)
  }


  // buscar idProcedencia
  public getByidProcedencia(id: any):Observable<any>{
    return this.httpClient.get(url_ponit + "buscar/"+id)
  }

}