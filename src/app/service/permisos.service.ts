import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { RolToUser } from '../roles/RolToUser';

const API_URL = 'http://localhost:8080/api';

@Injectable({
  providedIn: 'root'
})
export class PermisosService {


  constructor(private httpClient: HttpClient) { }

  public addRoleToUser(roltouser: any): Observable<any> {
    return this.httpClient.put(API_URL + "/user/rol/addtouser", roltouser);
  }

}

