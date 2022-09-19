import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActivosService {
  private API_SERVER_DETALLE= "http://localhost:8080/detalle_ingresos/";

  constructor(private httpClient: HttpClient) { }

// Traer datos de detalle a la table
public buscarRecepcionAct(id_encabezado_ing: number): Observable<any>{
  return this.httpClient.get(this.API_SERVER_DETALLE +  "filtrar/" +  id_encabezado_ing);
}

public getAllDetalle_ing(): Observable<any>{
  return this.httpClient.get(this.API_SERVER_DETALLE);
}
}