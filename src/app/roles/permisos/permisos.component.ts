import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { UsuarioRol } from '../UsuarioRol';
//---
import { Router, ActivatedRoute } from '@angular/router';
import { PermisosService } from 'src/app/service/permisos.service';
import { RolToUser } from '../RolToUser';
import Swal from 'sweetalert2';
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
  roltouser: RolToUser = new RolToUser();
  roles: String[] = [];

  rolResponsable: boolean;
  rolConstatante: boolean;

  useUsuario: any;
  urol: UsuarioRol[] = [];

  constructor(private userService: UserService, private permisoservice: PermisosService,
    public activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {

    
    console.log('Dead' + this.id_usuario);
    console.log('hola');
    this.cargarUsuario();
  }

  cargarUsuario(): void {
    this.rolConstatante = false;
    this.rolResponsable = false;

    this.activatedRoute.params.subscribe(params => {
      let id_usuario = params['id_usuario']
      console.log('usuario' + id_usuario);
      if (id_usuario) {
        this.userService.getUsuarioListar(id_usuario).subscribe((usuarios) => {
          this.usuarios = usuarios;
          this.roltouser.cedula = this.usuarios.cedula;
          for (let i = 0; i < usuarios.roles.length; i++) {
            console.log(usuarios.roles[i].nombre);
            this.roles.push(this.usuarios.roles[i].nombre);

            if (usuarios.roles[i].nombre == "ROLE_RESPONSABLE") {
              this.rolResponsable = true;
            } if (usuarios.roles[i].nombre == "ROLE_CONSTATANTE") {
              this.rolConstatante = true;
            }
          }
        })
      }
    })
  }

  public onChange(event, rol: String) {
    const checked = event.target.checked;
    if (checked) {
      this.roles.push(rol);
    } else {
      this.roles = this.roles.filter(
        (r) => r != rol);
    }
  }

  public Confirmar() {
    this.roltouser.roles = this.roles;
    console.log(this.roltouser);
    this.permisoservice.addRoleToUser(this.roltouser).subscribe(x => {
      this.roles = new Array<string>();
      this.cargarUsuario();

      Swal.fire({
        position: 'top',
        icon: 'success',
        title: 'Roles Actualizado',
        showConfirmButton: false,
        timer: 2000,
      });
      this.router.navigate(['/roles']);
    })
  }

}

