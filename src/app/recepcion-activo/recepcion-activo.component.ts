import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { DepartamentosService } from '../service/departamentos.service';
import { RegEdificioService } from '../service/reg-edificio.service';
import { ProcedenciaService } from '../service/procedencia.service';
import { CargarScriptsService } from './../cargar-scripts.service';
import { FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Encabezado_ing } from '../models/Encabezado_ing';
import { RecepcionActivoService } from '../service/recepcion-activo.service';
import { Router } from '@angular/router';
import { ActivosService } from 'src/app/service/activos.service';
import { Activo } from 'src/app/models/activo';
import { Edificio } from '../models/edificio';
import { Departamento } from '../models/departamento';
import { Procedencia } from '../models/procedencia';

//Import del storage
import { StorageService } from '../service/storage.service';

//Import de DATE
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-recepcion-activo',
  templateUrl: './recepcion-activo.component.html',
  styleUrls: ['./recepcion-activo.component.css'],
  providers: [DatePipe]
})
export class RecepcionActivoComponent implements OnInit {

  form?: FormGroup;
  recepcionFormDetalle!: FormGroup;
  recepcion: Encabezado_ing = new Encabezado_ing();
  recepciones: any;
  edificios: Edificio[] = [];
  departamentos: any;
  procedencias: Procedencia[] = [];
  activo: Activo[] = [];
  username: any;

  recepcionForm!: FormGroup;

  procedencia: Procedencia[] = [];
  usuario: any;
  detalle: any;
  encabezado: any;
  detalleEnc: any;

  //Variables de los datos del login.
  isLoggedIn = false;
  id_persona?: number;
  nombres_usuario?: string;
  apellidos_user?: string;
  user_final: any;

  //Date Variables
  date: Date;
  dateSet: string;

  constructor(
    private storageService: StorageService,

    public fomrmularioInicial: FormBuilder,
    public regedificioservice: RegEdificioService,
    public procedenciaservice: ProcedenciaService,
    public departamentoservice: DepartamentosService,
    public recepcionservice: RecepcionActivoService,
    private miDatePipe: DatePipe,
    private _CargaScripts: CargarScriptsService
  ) {
    _CargaScripts.Carga(["js-constatacion-activos/activos"]);

  }

  ngOnInit(): any {
    //Formato a fechas actuales.. SET
    this.date = new Date();
    this.dateSet = this.miDatePipe.transform(this.date, 'yyyy-MM-dd');

    //Carga de los nombres del usuario..
    this.isLoggedIn = this.storageService.isLoggedIn();

    if (this.isLoggedIn) {
      console.log('Estamos logiados satisfacririamente')
      const user = this.storageService.getUser();
      this.id_persona = user.id;
      this.nombres_usuario = user.nombres;
      this.apellidos_user = user.apellidos;
      this.user_final = this.nombres_usuario.concat(' ' + this.apellidos_user)


      // alert('Estos son los datos que tenemos'+ this.id_persona +' '+this.nombres_usuario+ ' ' +this.apellidos_user)
    }
    this.findUserByNumRecep();

    this.form = this.fomrmularioInicial.group({
      num_recep: ['', Validators.required],
      fecha_ingreso: ['', Validators.required],
      Documento: ['vacio', Validators.required],
      estado: ['false', Validators.required],
      procedencia: ['', Validators.required],
      departamento: ['', Validators.required],
      usuario: ['', Validators.required],
    });


    // // SEGUDO DETALLE
    // this.recepcionFormDetalle = this.fb.group({
    //   id_detalle_ing: [' '],
    //   codigoA: [' ', Validators.required],
    //   descripcion: [' ', Validators.required],
    //   encabezado_ing: [' ', Validators.required],
    //   estado_detalle: ['false', Validators.required],
    // });

    // LLenar Edificios
    this.regedificioservice.getAllEdificios().subscribe(
      edificios => {
        this.edificios = edificios
      },
      error => (console.log(error))
    )

    // LLenar Procedencia
    this.procedenciaservice.getAllProcedencia().subscribe(
      procedencias => {
        this.procedencias = procedencias
      },
      error => (console.log(error))
    )

  }


  // new version

  num_recep: string;
  nums_recep(e) {
    this.num_recep = e.target.value;
    console.log('nombre recpcion-> ' + this.num_recep)
  }

  // fecha_ingreso: Date;
  // fechas_ingrso(e) {
  //   this.fecha_ingreso = e.target.value;
  //   console.log('fecha de ingreso: -> ' + this.fecha_ingreso)
  // }

  id_departamento: number;
  ids_Departamento(e) {
    this.id_departamento = e.target.value;
    console.log('Id del departameno-> ' + this.id_departamento)
  }

  id_procedencia: number;
  ids_procedencia(e) {
    this.id_procedencia = e.target.value;
    console.log('Id del procedncia-> ' + this.id_procedencia)
  }

  // ID del encabezado
  cap_id_encabezado_ing: number;

  guardarEncabezadoRecepcion(): void {

    let encabezados_ing = {
      "num_recep": this.num_recep,
      "documento": "N/A",
      "estado_detalle": false,
      "procedencia": {
        "id_procedencia": this.id_procedencia,
      },
      "departamento": {
        "id_departamento": this.id_departamento,
      },
      "usuario": {
        "id_usuario": this.id_persona,
      }

    };

    this.recepcionservice.saveEncabezado_ing(encabezados_ing).subscribe({
      next: data => {
        this.cap_id_encabezado_ing = data.id_encabezado_ing;
        console.log('Codigo de encabezado-> ' + this.cap_id_encabezado_ing);
        this.form.reset();
        console.log(data);
        console.log('Correcto el guardador del detalle')
      },
      error: err => {
        console.log('Error no se pudo guardar del encabezado')
      }
    });
  }

  limpiar(): void {
    console.log("limpiar")
    this.form.reset();
  }

  // Guardar el Detalle del Encabezado

  codigo_activo: string;
  codigos_activo(e) {
    this.codigo_activo = e.target.value;
    console.log('nombre recpcion-> ' + this.codigo_activo)
  }

  nombre_activo: string;
  nombres_activo(e) {
    this.nombre_activo = e.target.value;
    console.log('nombre recpcion-> ' + this.nombre_activo)
  }

  // ID del encabezado
  cap_id_detalle: number;

  cap_codigos_activos: string;

  guardarDetalle_ing(): void {

    let detalle_encabezado = {
      "codigoA": this.codigo_activo,
      "descripcion": this.nombre_activo,
      "estado_detalle": false,
      "encabezado_ing": {
        "id_encabezado_ing": this.cap_id_encabezado_ing,
      }

    };

    this.recepcionservice.validarCodigoActivo(this.codigo_activo).subscribe( 
      resp => {
        console.log(resp)
        this.cap_codigos_activos = resp;
        if (this.codigo_activo == this.cap_codigos_activos) {
          console.log('CODIGO REPETIDO')
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Codigo de Activo Existente!',
          })
        } else {
          console.log('CODIGO NO REPETIDO')
          this.recepcionservice.saveDetalle(detalle_encabezado).subscribe(
            data => {
              this.cap_id_detalle = data.id_detalle_ing;
              console.log('Codigo de detalle-> ' + this.cap_id_detalle);
              console.log(data);
              console.log('Correcto el guardador detalle del encaebado')
              console.log('uno' + this.cap_id_encabezado_ing)
              this.findUserByNumRecep();
            },
            error => {
              console.log('Erro el guardador detalle del encaebado')
            }
          )
        }
      },
      error => (console.error(error))
    )
  }



  Finaliza(): void {
    console.log('looo')
    Swal.fire('Recepcion Registrada Correctamente', 'Continue', 'success')
    location.reload();
  }


  // Eliminar
  eliminarDetalle(id: number) {
    this.recepcionservice.eliminarDetalle_ing(id).subscribe(resp => {
      console.log("Detalle eliminado")
      this.findUserByNumRecep();
    },
      error => (console.error(error))
    )
  }

  // Cargar tabla
  public detalleAct: any;
  public findUserByNumRecep() {
    let resp = this.recepcionservice.buscarNumRecepcion(this.num_recep);
    resp.subscribe((data) => (this.detalleAct = data));
  }

  //*****//
  // Cargar Departamentes Anidado
  cargarDepartamentosSegunEdificio(event) {
    let id_edificio = event.target.value;
    this.departamentoservice.getByidDepartamentos(id_edificio).subscribe(
      resp => {
        console.log(resp)
        this.departamentos = resp;
      },
      error => (console.error(error))
    )
  }

  // fin



}

