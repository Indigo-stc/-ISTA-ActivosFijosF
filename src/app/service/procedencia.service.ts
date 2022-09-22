import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Procedencia } from '../models/procedencia';

@Injectable({
  providedIn: 'root'
})
export class ProcedenciaService {

  private url_ponit = "http://localhost:8080/api/procedencias";

  constructor(
    private httpClient: HttpClient,
   // private headers:HttpHeaders
  ) { };

  public getAllProcedencia(): Observable<any>{
    return this.httpClient.get(this.url_ponit + "/listarProcedencia");
  }

  public saveProcedencia(procedencia:any): Observable<any> {
    return this.httpClient.post(this.url_ponit + "/guardarProcedencia/", procedencia);
  }

  public updateProcedencia( procedencia: Procedencia, ): Observable<any>{
    return this.httpClient.put(this.url_ponit + "/actualizarProcedencia/", procedencia, {responseType: "text" })
  }

  // Eliminar Procedencia
  public deleteProcedencia(id: number):Observable<any>{
    return this.httpClient.delete(this.url_ponit + "/eliminarProcedencia/"+id)
  }


  // buscar idProcedencia
  public getByidProcedencia(id: any):Observable<any>{
    return this.httpClient.get(this.url_ponit + "/buscarProcedenciaPorId/"+id)
  }

}