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
  //***********//
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

    // alert('Cogigo que llega: -> '+this.id_persona)

    this.activoCompletForm = this.reg.group({
      // id_detalle_ing:[''],
      id_activo: [''],
      codigo_activo: [''],
      nombre: [''],
      serie: [''],
      marca: [''],
      modelo: [''],
      imagen: [''],
      descripcion: [''],
      costo: [''],
      estado_fisico: [''],
      disponibilidad: ['true'],
    });
    this.recepcionForm = this.fb.group({
      encabezado_ing: [' ', Validators.required],
    });

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

    // LLenar Departamentos
    this.departamentoservice.getAllDepartamentos().subscribe(
      (departamentos) => {
        this.departamentos = departamentos;
      },
      (error) => console.log(error)
    );

    /////////////////////////////////////////
    // this.activoServe.getAllEncabezado().subscribe(
    //   (detalleAct) => {
    //     this.detalleAct = detalleAct;
    //     console.log(detalleAct);
    //   },
    //   (error) => console.log(error)
    // );
    /////llevar a tabla
    // this.activo = new Activo();
    // this.id = this.activateRoute.snapshot.params['id'];
    // this.activoServe.getByidActivo(this.id).subscribe(
    //   (data) => {
    //     console.log(data);
    //     this.activo = data;
    //   },
    //   (error) => console.log(error)
    // );
  }

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

  ////////////////////
  BuscarRecepcionDet(id_encabezado_ing: number) {
    this.buscarRecep.buscarRecepcionAct(id_encabezado_ing).subscribe(
      (resp) => {
        if (resp === true) {
          this.detalleRecep.pop(id_encabezado_ing);
          this.detalleRecep.push(resp);
        }
      },
      (error) => console.error(error)
    );
  }

  // Cargar Departamentes Anidado
  onSelect(event: any) {
    let id_edificio = event.target.value;
    console.log(id_edificio);
    this.departamentoservice.getByidDepartamentos(id_edificio).subscribe(
      (resp) => {
        console.log(resp)
        this.departamentos = resp;
        // alert('Valor resultado'+this.departamentos)
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

  pasarCodigoActivo(cod_pro, id_detallea) {
    this.salida = cod_pro;
    // alert(id_detallea)
    this.value = (document.getElementById("CodigoActivo") as HTMLInputElement).value;
    this.value = this.salida;

    this.id_detalle = id_detallea;
    console.log(this.id_detalle)

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
      "estado_fisico":this.estadoA,
      "fecha_ingreso": null,
      "id_activo":{
        "id_activo":this.id_activo1
      },
      "id_departamento":{
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
      "id_detalle_ing":this.id_detalle,
      "estado_detalle": true,
    };
    
    this.activoServe.updateDetalleEstadoDeIngreso(detalle_ing).subscribe({
      next: data => {
        console.log(data);
        console.log('Se actualizo el detalle')
      },
      error: err => {
        console.log('Error al actualizar el detalle')
      }
    });
  }


}
