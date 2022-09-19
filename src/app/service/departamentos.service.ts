import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DepartamentosService {

  private API_SERVER = "http://localhost:8080/departamentos/"

  constructor(private httpClient: HttpClient) { }

  // Traer Dep segun si edificio
  public getAllDepartamentosByEdificio (id_edificio: number): Observable<any>{
    return this.httpClient.get(this.API_SERVER + id_edificio);
  }
  
  public getAllDepartamentos(): Observable<any>{
    return this.httpClient.get(this.API_SERVER);
  }

  public saveDepartamentos(departamentos:any): Observable<any>{
    return this.httpClient.post(this.API_SERVER,departamentos);
  }

  public deleteDepartamentos(id: number):Observable<any>{
    return this.httpClient.delete(this.API_SERVER + "delete/"+id);
  }
}
