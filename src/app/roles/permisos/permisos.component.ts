import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { UsuarioRol } from '../UsuarioRol';
//---
import { Router, ActivatedRoute } from '@angular/router';
//--
@Component({
  selector: 'app-permisos',
  templateUrl: './permisos.component.html',
  styleUrls: ['./permisos.component.css']
})
export class PermisosComponent implements OnInit {

  public usuarios: UsuarioRol = new UsuarioRol()
  id_usuario: any;
  content?: string;

  useUsuario: any;
  urol: UsuarioRol[] = [];

  constructor(private userService: UserService,
    public activatedRoute: ActivatedRoute, private router: Router) { }

  //--

  //---

  ngOnInit(): void {

    // this.id_usuario.snapshot.params['id_usuario'];
    console.log('iiiiiiiiiiiddddddddddd' + this.id_usuario);
    console.log('holaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');

    this.cargarUsuario();

  }

  cargarUsuario(): void {
    console.log('cargarrrrrrrrrrrrr');

    this.activatedRoute.params.subscribe(params => {
      let id_usuario = params['id_usuario']
      console.log('usuariooooooooooor' + id_usuario);
      if (id_usuario) {
        this.userService.getUsuarioListar(id_usuario).subscribe((usuarios) => this.usuarios = usuarios)
      }
    })
  }
  //---
}

