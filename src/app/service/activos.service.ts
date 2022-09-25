import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Activo } from '../models/activo';

@Injectable({
  providedIn: 'root'
})
export class ActivosService {

  private API_SERVER_ACTIVO= "http://localhost:8080/api/activos"
  private API_SERVER_DETALLE= "http://localhost:8080/api/detalleIngresos/";
  private API_SERVER_HISTORIAL_ACTIVO= "http://localhost:8080/api/historialIngresosActivos/";

  constructor(private httpClient: HttpClient) { }

// Traer datos de detalle a la table
public buscarRecepcionAct(id_encabezado_ing: number): Observable<any>{
  return this.httpClient.get(this.API_SERVER_DETALLE +  "filtrarDetalleIngresos/" +  id_encabezado_ing);
}

public getAllDetalle_ing(): Observable<any>{
  return this.httpClient.get(this.API_SERVER_DETALLE + "listarDetalleIngresos");
}
public getAllEncabezado(): Observable<any>{
  return this.httpClient.get(this.API_SERVER_DETALLE +"listarDetalleIngresos");
}

  // buscar idActivo para registrar
getByidActivo(id_detalle_ing: number):Observable<any>{
    return this.httpClient.get(this.API_SERVER_DETALLE+ "buscarDetalleIngresosPorId/" + id_detalle_ing)
  }


  traerDatos(id: number, activo: Activo): Observable<any> {
    return this.httpClient.put(this.API_SERVER_DETALLE +"buscarDetalleIngresosPorId/" + activo.id_detalle_ing, activo);
  }

//Buscar por numero de recepcion
public buscarNumRecepcion(num_recep: String): Observable<any>{
  return this.httpClient.get(this.API_SERVER_DETALLE +  "buscarNumRecep/" +  num_recep);
}

//GuardarHIstorialDetalle
public saveDetalle(historialIngresosActivos:any): Observable<any>{
  return this.httpClient.post(this.API_SERVER_HISTORIAL_ACTIVO + "guardarHistorialIngresosActivos",historialIngresosActivos);
}

//GuardarActivo

public saveActivo(activo:any): Observable<any>{
  return this.httpClient.post(this.API_SERVER_ACTIVO + "/guardarActivos",activo);
}


////listar activos
public getAllActivos(): Observable<any>{
  return this.httpClient.get(this.API_SERVER_ACTIVO + "/listarActivos/");
}
}
