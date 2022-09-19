import { Component, OnInit } from '@angular/core';
import { Usuario } from './usuario';
import { USUARIO } from './usuario.json';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {
  usuario: Usuario[]=[];
  constructor() { }

  ngOnInit(): void {
    this.usuario= USUARIO;
  }

}
