import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Activo } from '../models/activo';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ActivosService {

  private API_SERVER_ACTIVO = "http://localhost:8080/api/activos"
  private API_SERVER_DETALLE = "http://localhost:8080/api/detalleIngresos/";
  private API_SERVER_HISTORIAL_ACTIVO = "http://localhost:8080/api/historialIngresosActivos/";

  constructor(private httpClient: HttpClient) { }

  // Traer datos de detalle a la table
  public buscarRecepcionAct(id_encabezado_ing: number): Observable<any> {
    return this.httpClient.get(this.API_SERVER_DETALLE + "filtrarDetalleIngresos/" + id_encabezado_ing);
  }

  public getAllDetalle_ing(): Observable<any> {
    return this.httpClient.get(this.API_SERVER_DETALLE + "listarDetalleIngresos");
  }
  public getAllEncabezado(): Observable<any> {
    return this.httpClient.get(this.API_SERVER_DETALLE + "listarDetalleIngresos");
  }

  // buscar idActivo para registrar
  getByidActivo(id_detalle_ing: number): Observable<any> {
    return this.httpClient.get(this.API_SERVER_DETALLE + "buscarDetalleIngresosPorId/" + id_detalle_ing)
  }


  traerDatos(id: number, activo: Activo): Observable<any> {
    return this.httpClient.put(this.API_SERVER_DETALLE + "buscarDetalleIngresosPorId/" + activo.id_detalle_ing, activo);
  }

  //Buscar por numero de recepcion
  public buscarNumRecepcion(num_recep: String): Observable<any> {
    return this.httpClient.get(this.API_SERVER_DETALLE + "buscarNumRecep/" + num_recep);
  }

  //GuardarHIstorialDetalle
  public saveDetalle(historialIngresosActivos: any): Observable<any> {
    return this.httpClient.post(this.API_SERVER_HISTORIAL_ACTIVO + "guardarHistorialIngresosActivos", historialIngresosActivos);
  }

  //GuardarHIstorialDetalle
public saveHistorialActivos(historialIngresosActivos:any): Observable<any>{
  return this.httpClient.post(this.API_SERVER_HISTORIAL_ACTIVO + "guardarHistorialIngresosActivos",historialIngresosActivos);
}

  //GuardarActivo

  public saveActivo(activo: any): Observable<any> {
    return this.httpClient.post(this.API_SERVER_ACTIVO + "/guardarActivos", activo);
  }


  ////listar activos
  public getAllActivos(): Observable<any> {
    return this.httpClient.get(this.API_SERVER_ACTIVO + "/listarActivos/");
  }


  //Other método implementado.
  public GuardarAc(codigo_activo: string, nombre: string, serie: string, marca: string, modelo: string, imagen: string, descripcion: string, costo: string, estado_fisico: string, disponibilidad: boolean): Observable<any> {
    return this.httpClient.post(this.API_SERVER_ACTIVO + "/guardarActivos", {
      codigo_activo,
      nombre,
      serie,
      marca,
      modelo,
      imagen,
      descripcion,
      costo,
      estado_fisico,
      disponibilidad
    },
      httpOptions
    );
  }

  //Other método implementado.
  public saveHistorialActivo(): Observable<any> {
    return this.httpClient.post(this.API_SERVER_HISTORIAL_ACTIVO + "guardarHistorialIngresosActivos", {
    },
      httpOptions
    );
  }

    // Actualizar el estado del detalle
    public updateDetalleEstadoDeIngreso(Detalle_ing:any): Observable<any>{
      return this.httpClient.put(this.API_SERVER_DETALLE + "actualizarDetalle",Detalle_ing);
    }

}
