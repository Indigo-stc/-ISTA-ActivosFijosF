import { Injectable } from '@angular/core';
import {Usuarios} from '../models/usuarios';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

const urlEndPoint = 'http://localhost:8080/api/auth';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class CreateAccountService {

  //private urlEndPoint:string = 'http://localhost:8080/api/auth';

  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

  constructor(private http: HttpClient) { }

  public createUser(nuevoUsuario: Usuarios): Observable<Usuarios> {
    return this.http.post<Usuarios>(urlEndPoint + '/signup', nuevoUsuario);
  }

  registerUser(cedula: string, nombre: string, apellido: string, correo: string, contrasenia: string): Observable<any> {
    return this.http.post(
      urlEndPoint + '/signup',
      {
        cedula,
        nombre,
        apellido,
        correo,
        contrasenia,
      },
      httpOptions
    );
  }

  login(correo: string, contrasenia: string): Observable<any> {
    return this.http.post(
      urlEndPoint + '/signin',
      {
        correo,
        contrasenia,
      },
      httpOptions
    );
  }

  logout(): Observable<any> {
    return this.http.post(urlEndPoint + '/signout', { }, httpOptions);
  }
  
}

