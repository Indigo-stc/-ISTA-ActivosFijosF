import { Component, OnInit } from '@angular/core';
import { UsuarioRol } from './UsuarioRol';
import { UserService } from '../service/user.service';
import { Usuarios } from '../models/usuarios';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {
 
  
  content?: string;

  useUsuario: any;
  lista: UsuarioRol[]=[];

  constructor(private userService: UserService) { }

  ngOnInit()  {
    

    this.userService.getAllUsers().subscribe({
      next: data => {
        
        this.lista = data;
        
        //this.content=data.cedula;
        console.log("hola" + this.useUsuario)
        
      },
      error: err => {
        if (err.error) {
          try {
            const res = JSON.parse(err.error);
            this.useUsuario = res.message;
          } catch {
            this.useUsuario = `Error with status: ${err.status} - ${err.statusText}`;
          }
        } else {
          this.useUsuario = `Error with status: ${err.status}`;
        }
      }
    });
  }
}
