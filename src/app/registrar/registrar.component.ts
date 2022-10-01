import { Component, OnInit } from '@angular/core';

import { Usuarios } from '../models/usuarios';

import { CreateAccountService } from '../service/createaccount.service';

import { BaseFenixService } from '../service/base-fenix.service';

//Import de las clases..
import { Verpersonaf } from '../models/verpersonaf';

//Importamos la libreria de sweetaler2
import Swal from 'sweetalert2';

//Import de las rutas..
import { Router } from '@angular/router';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css'],
})
export class FormComponent implements OnInit {
  public usuario: Usuarios = new Usuarios();

  estadoContra: boolean = false;


  constructor(
    private router: Router,
    private createAccountService: CreateAccountService,
    private bd_fenix: BaseFenixService
  ) { }

  ngOnInit() { }

  public create(): void {
    if (this.estadoContra == false) {
      Swal.fire({
        text: 'Contraseña no cumple con los requisitos de seguridad.',
        icon: 'error',
        confirmButtonText: 'Cool',
      });
    } else {
      let interceptor = this.usuario.correo.split('@');

      let dominio = interceptor[1];

      if (dominio === 'tecazuay.edu.ec') {
        this.createAccountService.createUser(this.usuario).subscribe(
          (data) => {
            Swal.fire({
              position: 'top',
              icon: 'success',
              title: 'Cuenta creada satisfactoriamente.',
              showConfirmButton: false,
              timer: 2000,
            });
            this.router.navigate(['/login']);
          },
          (err) => {
            console.log('Lo que me viene en el err --> ' + err.error.message);

            switch (err.error.message) {
              case 'Error: Usuario ya esta en la BD!':
                Swal.fire(
                  'No se puedo crear el usuario',
                  `Este usuario ya esta registrado`,
                  'error'
                );
                break;

              case 'Error: El usuario no esta en FENIX!':
                Swal.fire(
                  'Docente no registrado en FENIX',
                  `Este docenete no se encuentra registrado en fenix.`,
                  'error'
                );
                break;

              case 'Error: Usted no puede ingresar un correo existente!':
                Swal.fire(
                  'Correo institucional ya registrado',
                  `El correo ingresaso ya eta registrado con otro docente.`,
                  'error'
                );
                break;
            }
          }
        );
      } else {
        Swal.fire(
          'El correo no es institucional',
          `Corre incorrecto`,
          'warning'
        );
      }
    }
  }

  validarCoontra(evento: any) {
    let password = evento.target.value;

    if (
      password.length >= 6 &&
      password.match(/.*[A-Z]/) &&
      password.match(/.*[a-z]/)
    ) {
      console.log('Contra correcta..');
      this.estadoContra = true;
    } else {
      this.estadoContra = false;
      console.log('Fail..');
    }
    this.geteventOculta()
  }

  geteventOculta() {
    const spamm = document.getElementById('elemento') as HTMLButtonElement | null;
    if (spamm != null) {

      if (this.estadoContra == false) {
        spamm.style.display = 'block';
      }

      if (this.estadoContra == true) {
        spamm.style.display = 'none';
      }
    }
  }

  //Vamos a manejar el evento de busqueda..
  correoe = document.getElementById('correo');
  public personas: Verpersonaf = new Verpersonaf();

  public consultaUserFenix(ci: string): void {
    this.bd_fenix.consultarUser(ci).subscribe((response) => {
      this.usuario.nombre = response.nombres;
      this.usuario.apellido = response.apellidos;
      this.usuario.correo = response.correo_institucional;
    });
  }

  escribirInput(evento: any) {
    let cedulaF = evento.target.value;

    if (cedulaF.length == 10) {
      console.log('paso con 10');
      this.bd_fenix.consultarUser(cedulaF).subscribe((response) => {
        if (response == null) {
          Swal.fire(
            'Docente no registrado en FENIX',
            `Verifique si su cedula esta correcta.`,
            'warning'
          );
        } else {
          const campoCorreo = document.getElementById(
            'correoe'
          ) as HTMLButtonElement | null;

          if (response.correo_institucional == null) {
            if (campoCorreo == null) {
            } else {
              campoCorreo.disabled = false;
            }
          } else {
            if (campoCorreo == null) {
            } else {
              campoCorreo.disabled = true;
            }
          }
          this.usuario.nombre = response.nombres;
          this.usuario.apellido = response.apellidos;
          this.usuario.correo = response.correo_institucional;
        }
      });
    } else {
      this.usuario.nombre = '';
      this.usuario.apellido = '';
      this.usuario.correo = '';
    }
    console.log(evento.target.value);
  }

  //Metodo que nos servira para autocompletar con el tecazuay
  autoEmail(evento: any) {
    let cedulaF = evento.target.value;

    let valor = cedulaF.substr(-1);

    cedulaF = cedulaF.trim();

    let cedulafinal = cedulaF.split(' ').join('');

    this.usuario.correo = cedulafinal;
    if (valor == '@') {
      console.log(cedulaF);
      this.usuario.correo = cedulafinal + 'tecazuay.edu.ec';
    }
  }

}
