import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UsuarioRol } from '../roles/UsuarioRol';

const API_URL = 'http://localhost:8080/api/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  //getAdminBoard(): Observable<any> {
 //   return this.http.get(API_URL + "test/admin", { responseType: 'text' });
  //}

  getAllUsers(): Observable<any> {
    return this.http.get(API_URL + '/all');
  }

  getUsuarioListar(id_usuario):Observable<UsuarioRol>{
    return this.http.get<UsuarioRol>(API_URL + `/search/ ${id_usuario}`)
  }


}
