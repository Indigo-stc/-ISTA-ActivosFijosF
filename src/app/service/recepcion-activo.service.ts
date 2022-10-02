import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecepcionActivoService {

  // New version

  private API_SERVER= "http://localhost:8080/api/encabezadoIngresos";

  private API_SERVER_2= "http://localhost:8080/api/user";

  private API_SERVER_DETALLE= "http://localhost:8080/api/detalleIngresos";

  private API_SERVER_ACTIVO = "http://localhost:8080/api/activos/"
  
  private httpHeaders = new HttpHeaders({'Content-Type':'application/json'})

  constructor(private httpClient: HttpClient) { }

  // Traer Datos de Persona
  public getDatosUsuario (cedula: any): Observable<any>{
    return this.httpClient.get(this.API_SERVER_2 + cedula);
  }

  public getAllUsuariosID(id: any): Observable<any>{
    return this.httpClient.get(this.API_SERVER_2 + "buscar/" + id);
  }

  public getAllUsuarios(): Observable<any>{
    return this.httpClient.get(this.API_SERVER_2+'/all');
  }
  
  public getAllEncabezado_ing(): Observable<any>{
    return this.httpClient.get(this.API_SERVER + "/listarEncabezadoIngresos");
  }

  public saveEncabezado_ing(encabezado_ing:any): Observable<any>{
    return this.httpClient.post(this.API_SERVER + "/guardarEncabezadoIngresos",encabezado_ing);
  }

  public delete(id: number):Observable<any>{
    return this.httpClient.delete(this.API_SERVER + "/eliminarEncabezadoIngresos/"+id);
  }

   //Buscar por numero de recepcion
   public buscarNumRecepcion(num_recep: String): Observable<any> {
    return this.httpClient.get(this.API_SERVER_DETALLE + "/buscarNumRecep/" + num_recep);
  }


  // Añadir activos a recepcion

  public getAllDetalle_ing(): Observable<any>{
    return this.httpClient.get(this.API_SERVER_DETALLE + "/listarDetalleIngresos");
  }
  public saveDetalle(detalle_ing:any): Observable<any>{
    return this.httpClient.post(this.API_SERVER_DETALLE + "/guardarDetalleIngresos",detalle_ing);
  }

  public eliminarDetalle_ing(id: number):Observable<any>{
    return this.httpClient.delete(this.API_SERVER_DETALLE + "/eliminarDetalleIngresos/"+id);
  }


  // Metodo para traer activos del encabezado a la tabla
  public getDatosEncabezado (id_encabezado_ing: number): Observable<any>{
    return this.httpClient.get(this.API_SERVER_DETALLE +  "/buscarDetalleIngresosPorId/" +  id_encabezado_ing);
  }


  


  public validarCodigoActivo(codigo_activo: string): Observable<any> {
    return this.httpClient.get(this.API_SERVER_ACTIVO + "validarExistenciaDeCodigoActivo/" + codigo_activo);
  }



}
