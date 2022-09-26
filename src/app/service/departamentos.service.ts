import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Departamento } from '../models/departamento';


@Injectable({
  providedIn: 'root'
})
export class DepartamentosService {

  private API_SERVER = "http://localhost:8080/api/departamentos"

  constructor(private httpClient: HttpClient) { }

  
  public getAllDepartamentos(): Observable<any>{
    return this.httpClient.get(this.API_SERVER + "/listarDepartamentos");
  }

  public saveDepartamentos(departamentos:any): Observable<any>{
    return this.httpClient.post(this.API_SERVER + "/guardarDepartamento/",departamentos);
  }

  public updateDepartamentos( departamentos: Departamento): Observable<any>{
    return this.httpClient.put(this.API_SERVER + "/actualizarDepartamento/", departamentos, {responseType: "text" })
  }

  public getByidDepartamentos(id: number):Observable<Departamento>{
    return this.httpClient.get<Departamento>(this.API_SERVER + "/buscarDepartamentoPorEdifcio/"+id);
  }
}
