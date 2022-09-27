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
import { concat } from 'rxjs';
@Component({
  selector: 'app-recepcion-activo',
  templateUrl: './recepcion-activo.component.html',
  styleUrls: ['./recepcion-activo.component.css']
})
export class RecepcionActivoComponent implements OnInit {


  recepcionForm!: FormGroup;
  recepcionFormDetalle!: FormGroup;

  recepcion: Encabezado_ing = new Encabezado_ing();
  recepciones: any;

  edificios: Edificio[] = [];
  departamentos: any //esto esetaba como array
  procedencia: Procedencia[] = [];

  usuario: any;
  detalle: any;
  encabezado: any;
  detalleEnc: any;

  activo:Activo[]=[];

  //Variables de los datos del login.
  isLoggedIn = false;
  id_persona?: number;
  nombres_usuario?: string;
  apellidos_user?: string;
  user_final:any;

  constructor(
    private storageService: StorageService,

    public fb: FormBuilder,
    public regedificioservice: RegEdificioService,
    public procedenciaservice: ProcedenciaService,
    public departamentoservice: DepartamentosService,
    public recepcionservice: RecepcionActivoService,
    private activoTabla:ActivosService,
    private router:Router,
    private _CargaScripts: CargarScriptsService) {
    _CargaScripts.Carga(["js-constatacion-activos/activos"]);
  
  }
  ngOnInit(): any {

    //Carga de los nombres del usuario..
    this.isLoggedIn = this.storageService.isLoggedIn();

    if (this.isLoggedIn) {
      console.log('Estamos logiados satisfacririamente')
      const user = this.storageService.getUser();
      this.id_persona = user.id;
      this.nombres_usuario= user.nombres;
      this.apellidos_user= user.apellidos;
      this.user_final= this.nombres_usuario.concat(' '+this.apellidos_user)
    

      // alert('Estos son los datos que tenemos'+ this.id_persona +' '+this.nombres_usuario+ ' ' +this.apellidos_user)
    }

    this.recepcionForm = this.fb.group({
      id_encabezado_ing: [''],
      num_recep: ['', Validators.required],
      fecha_ingreso: ['', Validators.required],
      Documento: ['vacio', Validators.required],
      estado: ['false', Validators.required],
      procedencia: ['', Validators.required],
      departamento: ['', Validators.required],
      usuario: ['', Validators.required],
    });



    // SEGUDO DETALLE
    this.recepcionFormDetalle = this.fb.group({
      id_detalle_ing: [' '],
      codigoA: [' ', Validators.required],
      descripcion: [' ', Validators.required],
      encabezado_ing: [' ', Validators.required],
      estado_detalle: ['false', Validators.required],
    });

    // LLenar Edificios
    this.regedificioservice.getAllEdificios().subscribe(
      edificios => {
        this.edificios = edificios
      },
      error => (console.log(error))
    )


    // LLenar Encabezados
    this.recepcionservice.getAllEncabezado_ing().subscribe(
      encabezado => {
        this.encabezado = encabezado
      },
      error => (console.log(error))
    )

    // Usuario Temporal
    this.recepcionservice.getAllUsuarios().subscribe(
      usuarios => {
        this.usuario = usuarios
      },
      error => (console.log(error))
    )


    // LLenar Procedencia
    this.procedenciaservice.getAllProcedencia().subscribe(
      procedencia => {
        this.procedencia = procedencia
      },
      error => (console.log(error))
    )

    this.recepcionservice.getAllDetalle_ing().subscribe(
      detalle => {
        this.detalle = detalle
      },
      error => (console.log(error))
    )

  }

  // Obtenner el Dato del input ***********************************************************************************

  escribirInput(event: any) {
    let cedulaCap = event.target.value;
    this.recepcionservice.getDatosUsuario(cedulaCap).subscribe(resp => {
      console.log(resp)
      this.recepcion.usuario = resp.nombre + ' hola';
    },
      error => (console.error(error))
    )
  }

  //  ***************************************************************************************************************

  guardarDetalle_ing(): void {
    this.recepcionservice.saveDetalle(this.recepcionFormDetalle.value).subscribe(resp => {
      this.recepcionFormDetalle.reset();
      this.detalle.push(resp);
    },
      error => (console.error(error))
    )
  }

  guardarEncabezado_ing(): void {
    this.recepcionservice.saveEncabezado_ing(this.recepcionForm.value).subscribe(resp => {
      this.recepcionForm.reset();
      // Obtener los Encabezados
      this.recepcionservice.getAllEncabezado_ing().subscribe(
        encabezado => {
          this.encabezado = encabezado
        },
        error => (console.log(error))
      )
    },

      error => (console.error(error))
    )
  }


  Finaliza(): void {
    this.recepcionFormDetalle.reset();
    this.recepcionForm.reset();

    // Cargar tabla vacia
    let id_encabezado_ing_vacia = 0;
    this.recepcionservice.getDatosEncabezado(id_encabezado_ing_vacia).subscribe(
      resp => {
        this.detalleEnc = resp;
      },
      error => (console.error(error))
    )
    Swal.fire('Recepcion Registrada Correctamente', 'Continue', 'success')
  }

  // Cargar Departamentes Anidado
  onSelect(event: any) {
    let id_edificio = event.target.value;
    this.departamentoservice.getByidDepartamentos(id_edificio).subscribe(
      resp => {
        this.departamentos = this.departamentos;
      },
      error => (console.error(error))
    )
  }


  // Eliminar
  eliminarDetalle(id_detalle_ing: number) {
    this.recepcionservice.eliminarDetalle_ing(id_detalle_ing).subscribe(resp => {
      if (resp === true) {
        this.procedencia.pop()
        this.procedencia.push(resp);
      }

    },
      error => (console.error(error))
    )
  }

  // Cargar tabla
  onSelectDetalle(event: any) {
    let id_encabezado_ing = event.target.value;
    this.recepcionservice.getDatosEncabezado(id_encabezado_ing).subscribe(
      resp => {
        this.detalleEnc = resp;
      },
      error => (console.error(error))
    )
  }

  //*************//
   // Cargar Departamentes Anidado
   cargarDepartamentosSegunEdificio(event) {
    let id_edificio = event.target.value;
    alert("Id edificio " + id_edificio)
    this.departamentoservice.getByidDepartamentos(id_edificio).subscribe(
      resp  => {
        console.log(resp)
        this.departamentos = resp;
      },
      error => (console.error(error))
    )
  }


}

