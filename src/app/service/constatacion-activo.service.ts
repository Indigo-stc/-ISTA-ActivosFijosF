import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })
export class ConstatacionActivoService {
    private API_SERVER= "http://localhost:8080/api/Encabezado_constatacion/";
    
    private API_SERVER_2= "http://localhost:8080/api/user";

    private httpHeaders = new HttpHeaders({'Content-Type':'application/json'})

    constructor(private httpClient: HttpClient) { }

    public getDatosUsuario (cedula: any): Observable<any>{
        return this.httpClient.get(this.API_SERVER_2 + cedula);
      }
    
      public getAllUsuariosID(id: any): Observable<any>{
        return this.httpClient.get(this.API_SERVER_2 + "buscar/" + id);
      }
      
      public getAllEnc_constatacion(): Observable<any>{
        return this.httpClient.get(this.API_SERVER + "listarEncabezado_constatacion");
      }
    
      public saveEnc_constatacion(encabezado_ing:any): Observable<any>{
        return this.httpClient.post(this.API_SERVER + "guardarEncabezado_constatacion",encabezado_ing);
      }
    
      public delete(id: number):Observable<any>{
        return this.httpClient.delete(this.API_SERVER + "/eliminarEncabezado_constatacion/"+id);
      }
    



    
}
