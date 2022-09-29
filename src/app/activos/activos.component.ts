import { Component, OnInit, Input } from '@angular/core';
import { CargarScriptsService } from './../cargar-scripts.service';
import { FormBuilder, FormControl } from '@angular/forms';
import { FormGroup, Validators } from '@angular/forms';
import { ActivosService } from 'src/app/service/activos.service';
import { DepartamentosService } from '../service/departamentos.service';
import { RegEdificioService } from '../service/reg-edificio.service';
import { ActivatedRoute } from '@angular/router';
import { RecepcionActivoService } from '../service/recepcion-activo.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Activo } from '../models/activo';

import { StorageService } from '../service/storage.service';


declare var jQuery: any;
declare var $: any;
@Component({
  selector: 'app-activos',
  templateUrl: './activos.component.html',
  styleUrls: ['./activos.component.css'],
})
export class ActivosComponent implements OnInit {




  recepcionForm!: FormGroup;
  BuscarRecepForm!: FormGroup;
  listarActivoForm!: FormGroup;
  detalleRecep: any;
  public detalleAct: any;
  //para traer de la table
  activoForm!: FormGroup;
  activoCompletForm!: FormGroup;
  id: number = 0;
  activo: any;
  //para buscar por nume recep
  recep: any;
  num_recep: string = '';
  id_buscador: any;
  //*****//
  edificios: any;
  departamentos: any;

  constructor(
    public fb: FormBuilder,
    public reg: FormBuilder,
    public buscarRecep: ActivosService,
    private _CargaScripts: CargarScriptsService,
    public regedificioservice: RegEdificioService,
    public departamentoservice: DepartamentosService,
    private activateRoute: ActivatedRoute,
    private route: Router,

    private activoServe: ActivosService,
    private storageService: StorageService,

  ) {
    _CargaScripts.Carga(['js-activos/activos']);
  }

  public findUserByNumRecep() {
    let resp = this.activoServe.buscarNumRecepcion(this.num_recep);
    resp.subscribe((data) => (this.detalleAct = data));
  }

  //Verifcar si el user esta logiado..
  isLoggedIn = false;
  id_persona?: number; // valor del usuario que este log
  ngOnInit(): any {
    this.isLoggedIn = this.storageService.isLoggedIn();

    if (this.isLoggedIn) {
      console.log('Estamos logiados satisfacririamente')
      const user = this.storageService.getUser();
      this.id_persona = user.id;
    }

    this.buscarRecep.getAllDetalle_ing().subscribe(
      (detalleRecep) => {
        this.detalleRecep = detalleRecep;
        console.log(detalleRecep);
      },
      (error) => console.log(error)
    );

    // LLenar Edificios
    this.regedificioservice.getAllEdificios().subscribe(
      (edificios) => {
        this.edificios = edificios;
        console.log(edificios);
      },
      (error) => console.log(error)
    );


  }



  // NEW VERSION


  onSubmit() {
    this.activoServe.traerDatos(this.id, this.activo).subscribe(
      (data) => console.log(data),
      (error) => console.log(error)
    );
    this.activo = new Activo();
    this.route.navigate(['/Gestionar_activos']);
  }

  ////update
  traerDatos(id: number) {
    this.route.navigate(['Gestion_activos', id]);
  }

  // Cargar Departamentes Anidado
  onSelect(event: any) {
    let id_edificio = event.target.value;
    console.log(id_edificio);
    this.departamentoservice.getByidDepartamentos(id_edificio).subscribe(
      (resp) => {
        console.log(resp)
        this.departamentos = resp;
      },
      (error) => console.error(error)
    );
  }

  Finaliza(): void {
    // this.recepcionFormDetalle.reset();
    // this.recepcionForm.reset();

    // // Cargar tabla vacia
    // let id_encabezado_ing_vacia = 0;
    // this.recepcionservice.getDatosEncabezado(id_encabezado_ing_vacia).subscribe(
    //   resp => {
    //     this.detalleEnc = resp;
    //   },
    //   error => (console.error(error))
    // )
    Swal.fire('Activo Registrado Correctamente', 'Continue', 'success');
  }


  salida: string = "";
  id_detalle: number;
  //cap_id_encabezado: number;
  pasarCodigoActivo(cod_pro, id_detallea, id_encabezadoa_ing) {
    this.salida = cod_pro;
    // alert(id_detallea)
    this.value = (document.getElementById("CodigoActivo") as HTMLInputElement).value;
    this.value = this.salida;
    this.id_detalle = id_detallea;
    this.cap_id_encabezado = id_encabezadoa_ing;
    console.log(this.id_detalle)
    console.log("este es el id del enca=> " + this.cap_id_encabezado)
  }

  @Input()
  value: string = "";
  estadoA: string = '';
  dispocicionAc: boolean;


  form: any = {
    id_activo: null,
    codigo_activo: null,
    nombre: null,
    serie: null,
    marca: null,
    modelo: null,
    imagen: null,
    descripcion: null,
    costo: null,
    estado_fisico: this.estadoA,
    disponibilidad: null,
  };

  listaEstado: string[] = ["Bueno", "Malo", "dañado"];
  listaDispocicion: string[] = ["Ocupado", "Disponible"];

  estadoActivo(e) {
    console.log(e.target.value)
    this.estadoA = e.target.value;
  }

  dispocicionActivo(e) {
    console.log(e.target.value)
    let valorRes = e.target.value;
    if (valorRes == 'Ocupado') {
      this.dispocicionAc = false;
    }
    if (valorRes == 'Disponible') {
      this.dispocicionAc = true;
    }
  }

  //Resgitro del activo
  id_activo1: number;
  registroAc(): void {
    const { nombre, serie, marca, modelo, imagen, descripcion, costo } = this.form;
    this.activoServe.GuardarAc(this.value, nombre, serie, marca, modelo, imagen, descripcion, costo, this.estadoA, this.dispocicionAc).subscribe({
      next: data => {
        this.id_activo1 = data.id_activo;
        console.log(data);
        console.log('Codigo de ingreso-> ' + this.id_activo1);
        console.log('Correcto el ingreso del activo')
        this.guardarHistorialActivo();
        this.actualizarDetalleEstado();
      },
      error: err => {
        console.log('Error no se pudo guardar el activo')
      }
    });
  }

  // historial
  id_departamento: number;
  ids_Departamento(e) {
    this.id_departamento = e.target.value;
    console.log('Id del departameno-> ' + this.id_departamento)
  }

  guardarHistorialActivo(): void {

    let historial_ing = {
      "estado_fisico": this.estadoA,
      "id_activo": {
        "id_activo": this.id_activo1
      },
      "id_departamento": {
        "id_departamento": this.id_departamento
      },
      "id_detalle_ing": {
        "id_detalle_ing": this.id_detalle
      },
      "id_responsable": {
        "id_usuario": this.id_persona
      }

    };

    this.activoServe.saveHistorialActivos(historial_ing).subscribe({
      next: data => {
        console.log(data);
        console.log('Correcto el ingreso del del historial del detalle de activo')
      },
      error: err => {
        console.log('Error no se pudo guardar del historial del detalle de activo')
      }
    });
  }

  actualizarDetalleEstado(): void {

    let detalle_ing = {
      "id_detalle_ing": this.id_detalle,
      "estado_detalle": true,
      "encabezado_ing": {
        "id_encabezado_ing": 0
      }
    };

    this.activoServe.updateDetalleEstadoDeIngreso(detalle_ing).subscribe({
      next: data => {
        console.log(data);
        console.log('Se actualizo el detalle')
        this.verificarElConteoDeDatos();
      },
      error: err => {
        console.log('Error al actualizar el detalle')
        this.verificarElConteoDeDatos();
      }
    });
  }

  cap_id_encabezado: number;
  conteo: number;
  verificarElConteoDeDatos(): void {
    this.activoServe.conteoDeDatosDelDetalle(this.cap_id_encabezado).subscribe({
      next: data => {
        console.log('Este es el id del enca a enviar' + this.cap_id_encabezado)
        console.log(data);
        this.conteo = data;
        console.log('Este es los ingresados ' + this.conteo)
        console.log('Esto se va a comparar ' + this.conteo)
        if (this.conteo == 0) {
          this.actualizarEncabezadoEstado();
        } else {
          console.log('Falta de ingresar ' + this.conteo)
        }
      },
      error: err => {
        console.log('Error al acapturar el conteo')
      }
    });
  }


  actualizarEncabezadoEstado(): void {

    let detalle_ing = {
      "id_encabezado_ing": this.cap_id_encabezado,
      "estado": true,
    };

    this.activoServe.updateEncabezadoEstadoDeIngreso(detalle_ing).subscribe({
      next: data => {
        console.log(data);
        console.log('Se actualizo el encabezado')
      },
      error: err => {
        console.log('Error al actualizar el encabezado')
      }
    });
  }


}
