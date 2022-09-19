import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecepcionActivoService {
  private API_SERVER= "http://localhost:8080/encabezado_ingresos/";

  private API_SERVER_2= "http://localhost:8080/usuarios/";

  private API_SERVER_DETALLE= "http://localhost:8080/detalle_ingresos/";

  constructor(private httpClient: HttpClient) { }

  // Traer Datos de Persona
  public getDatosUsuario (cedula: any): Observable<any>{
    return this.httpClient.get(this.API_SERVER_2 + cedula);
  }

  public getAllUsuariosID(id: any): Observable<any>{
    return this.httpClient.get(this.API_SERVER_2 + "buscar/" + id);
  }

  ///////////
  public getAllUsuarios(): Observable<any>{
    return this.httpClient.get(this.API_SERVER_2);
  }
  
  //////////////////////////
  public getAllEncabezado_ing(): Observable<any>{
    return this.httpClient.get(this.API_SERVER);
  }

  public saveEncabezado_ing(encabezado_ing:any): Observable<any>{
    return this.httpClient.post(this.API_SERVER,encabezado_ing);
  }

  public delete(id: number):Observable<any>{
    return this.httpClient.delete(this.API_SERVER + "delete/"+id);
  }

//añadir activos a recepcion

public getAllDetalle_ing(): Observable<any>{
  return this.httpClient.get(this.API_SERVER_DETALLE);
}
public saveDetalle(detalle_ing:any): Observable<any>{
  return this.httpClient.post(this.API_SERVER_DETALLE,detalle_ing);
}

public eliminarDetalle_ing(id: number):Observable<any>{
  return this.httpClient.delete(this.API_SERVER_DETALLE + "delete/"+id);
}


//metodo para traer activos del encabezado a la tabla
public getDatosEncabezado (id_encabezado_ing: number): Observable<any>{
  return this.httpClient.get(this.API_SERVER_DETALLE +  "filtrar/" +  id_encabezado_ing);
}
}
