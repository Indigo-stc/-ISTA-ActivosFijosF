// import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http'
// import { Observable } from 'rxjs';
// import { Activo } from '../models/activo';

// const httpOptions = {
//   headers: new HttpHeaders({ 'Content-Type': 'application/json' })
// };

// @Injectable({
//   providedIn: 'root'
// })
// export class ActivosService {
//   private API_SERVER_ACTIVO = "http://localhost:8080/api/activos"
//   private API_SERVER_DETALLE = "http://localhost:8080/api/detalleIngresos/";
//   private API_SERVER_HISTORIAL_ACTIVO = "http://localhost:8080/api/historialIngresosActivos/";
//   private API_SERVER_ENCABEZADO = "http://localhost:8080/api/encabezadoIngresos";


//   constructor(private httpClient: HttpClient) { }

//   public conteoDeDatosDelDetalle(id_encabezado_ing: number): Observable<any> {
//     return this.httpClient.get(this.API_SERVER_DETALLE + "ConteoDeDetalles/" + id_encabezado_ing);
//   }

//   // Traer datos de detalle a la table
//   public buscarRecepcionAct(id_encabezado_ing: number): Observable<any> {
//     return this.httpClient.get(this.API_SERVER_DETALLE + "filtrarDetalleIngresos/" + id_encabezado_ing);
//   }

//   public getAllDetalle_ing(): Observable<any> {
//     return this.httpClient.get(this.API_SERVER_DETALLE + "listarDetalleIngresos");
//   }
//   public getAllEncabezado(): Observable<any> {
//     return this.httpClient.get(this.API_SERVER_DETALLE + "listarDetalleIngresos");
//   }

//   // buscar idActivo para registrar
//   getByidActivo(id_detalle_ing: number): Observable<any> {
//     return this.httpClient.get(this.API_SERVER_DETALLE + "buscarDetalleIngresosPorId/" + id_detalle_ing)
//   }


//   traerDatos(id: number, activo: Activo): Observable<any> {
//     return this.httpClient.put(this.API_SERVER_DETALLE + "buscarDetalleIngresosPorId/" + activo.id_detalle_ing, activo);
//   }

//   //Buscar por numero de recepcion
//   public buscarNumRecepcion(num_recep: String): Observable<any> {
//     return this.httpClient.get(this.API_SERVER_DETALLE + "buscarNumRecep/" + num_recep);
//   }

//   //GuardarHIstorialDetalle
//   public saveHistorialActivos(historialIngresosActivos: any): Observable<any> {
//     return this.httpClient.post(this.API_SERVER_HISTORIAL_ACTIVO + "guardarHistorialIngresosActivos", historialIngresosActivos);
//   }

//   //GuardarActivo

//   public saveActivo(activo: any): Observable<any> {
//     return this.httpClient.post(this.API_SERVER_ACTIVO + "/guardarActivos", activo);
//   }


//   ////listar activos
//   public getAllActivos(): Observable<any> {
//     return this.httpClient.get(this.API_SERVER_ACTIVO + "/listarActivos/");
//   }


//   //Other método implementado.
//   public GuardarAc(codigo_activo: string, nombre: string, serie: string, marca: string, modelo: string, imagen: string, descripcion: string, costo: string, estado_fisico: string, disponibilidad: boolean): Observable<any> {
//     return this.httpClient.post(this.API_SERVER_ACTIVO + "/guardarActivos", {
//       codigo_activo,
//       nombre,
//       serie,
//       marca,
//       modelo,
//       imagen,
//       descripcion,
//       costo,
//       estado_fisico,
//       disponibilidad
//     },
//       httpOptions
//     );
//   }
//   // Actualizar el estado del detalle
//   public updateDetalleEstadoDeIngreso(Detalle_ing: any): Observable<any> {
//     return this.httpClient.put(this.API_SERVER_DETALLE + "actualizarDetalle", Detalle_ing);
//   }

//   // Actualizar el encabezado del de
//   public updateEncabezadoEstadoDeIngreso(encabezado_ing: any): Observable<any> {
//     return this.httpClient.put(this.API_SERVER_ENCABEZADO + "/actualizarEstadoRecepcion", encabezado_ing);
//   }

// }




import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Activo } from '../models/activo';
import {HttpRequest, HttpEvent } from '@angular/common/http';
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
  private API_SERVER_ENCABEZADO = "http://localhost:8080/api/encabezadoIngresos";
  private baseUrl = "http://localhost:8080/api/documentos";

  //
  private API_ASIG_CUSTODIO = "http://localhost:8080/api/asignacionCustodioActivo/"
  private API_ASIG_DEPART = "http://localhost:8080/api/Asignacion_Departamento/";
  private API_ASIG_RESPON= "http://localhost:8080/api/Asignacion_Responsable/";
  //


  constructor(private httpClient: HttpClient) { }

  ////////////cargar documentos
    public upload(file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    const req = new HttpRequest('POST', `${this.baseUrl}/guardarDocumento`, formData, {
      reportProgress: true,
      responseType: 'json'
    });
    return this.httpClient.request(req);
  }

  //Buscar por numero de recepcion
  public buscarIdporNombreDelDoc(nombre_doc: String): Observable<any> {
    return this.httpClient.get(this.API_SERVER_ENCABEZADO + "/Buscar_Nombre_documento/" + nombre_doc);
  }

  // public upload(file: File): Observable<any> {
  //   const formData: FormData = new FormData();
  //   formData.append('file', file);
  //   return this.httpClient.post(this.baseUrl + "/guardarDocumento", formData, { responseType: 'text' });
  // }

// getFiles(): Observable<any> {
//   return this.httpClient.get(`${this.baseUrl}/listarDocumentos`);
// }
////////////////fin
  public conteoDeDatosDelDetalle(id_encabezado_ing: number): Observable<any> {
    return this.httpClient.get(this.API_SERVER_DETALLE + "ConteoDeDetalles/" + id_encabezado_ing);
  }

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
  public saveHistorialActivos(historialIngresosActivos: any): Observable<any> {
    return this.httpClient.post(this.API_SERVER_HISTORIAL_ACTIVO + "guardarHistorialIngresosActivos", historialIngresosActivos);
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
  // Actualizar el estado del detalle
  public updateDetalleEstadoDeIngreso(Detalle_ing: any): Observable<any> {
    return this.httpClient.put(this.API_SERVER_DETALLE + "actualizarDetalle", Detalle_ing);
  }

  // Actualizar el encabezado del de
  public updateEncabezadoEstadoDeIngreso(encabezado_ing: any): Observable<any> {
    return this.httpClient.put(this.API_SERVER_ENCABEZADO + "/actualizarEstadoRecepcion", encabezado_ing);
  }
  public updateEncabezadoDocumento(encabezado_ing: any): Observable<any> {
    return this.httpClient.put(this.API_SERVER_ENCABEZADO + "/actualizarEstadoRecepcion", encabezado_ing);
  }

  // nuevos servicios

  public saveCustodio(asignacion_custodio: any): Observable<any> {
    return this.httpClient.post(this.API_ASIG_CUSTODIO + "guardarasignacionCustodioActivo", asignacion_custodio);
  }

  public saveResponsable(asignacion_responsable: any): Observable<any> {
    return this.httpClient.post(this.API_ASIG_RESPON + "guardarAsignacion_Responsable", asignacion_responsable);
  }

  public saveDepartamento(asignacion_departamento: any): Observable<any> {
    return this.httpClient.post(this.API_ASIG_DEPART + "guardarAsignacion_Departamento", asignacion_departamento);
  }
}
