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


  edificios: any;
  procedencia: any;
  departamentos: any;
  usuario: any;
  detalle: any;
  encabezado: any;
  detalleEnc: any;



  constructor(

    public fb: FormBuilder,
    public regedificioservice: RegEdificioService,
    public procedenciaservice: ProcedenciaService,
    public departamentoservice: DepartamentosService,
    public recepcionservice: RecepcionActivoService,
    private _CargaScripts: CargarScriptsService) {
    _CargaScripts.Carga(["js-constatacion-activos/activos"]);
  }
  ngOnInit(): any {

    this.recepcionForm = this.fb.group({
      id_encabezado_ing: [''],
      num_recep: ['', Validators.required],
      fecha_ingreso: ['', Validators.required],
      Documento: ['null', Validators.required],
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
    });

    // LLenar Edificios
    this.regedificioservice.getAllEdificios().subscribe(
      edificios => {
        this.edificios = edificios
        console.log(edificios);
      },
      error => (console.log(error))
    )

    // LLenar Encabezados
    this.recepcionservice.getAllEncabezado_ing().subscribe(
      encabezado => {
        this.encabezado = encabezado
        console.log(encabezado);
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


    // Departamentos
    this.departamentoservice.getAllDepartamentos().subscribe(
      departamentos => {
        this.departamentos = departamentos
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


    // Obtener los Encabezados
    this.recepcionservice.getAllEncabezado_ing().subscribe(
      recepcion => {
        this.recepcion = recepcion
      },
      error => (console.log(error))
    )

    this.recepcionservice.getAllDetalle_ing().subscribe(
      detalle => {
        this.detalle = detalle
        console.log(detalle);
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

  guardarEncabezado_ing(): void {
    this.recepcionservice.saveEncabezado_ing(this.recepcionForm.value).subscribe(resp => {
      this.recepcionForm.reset();
      this.recepciones.push(resp);
    },

      error => (console.error(error))
    )
  }

  guardarDetalle_ing(): void {
    this.recepcionservice.saveDetalle(this.recepcionFormDetalle.value).subscribe(resp => {
      this.recepcionFormDetalle.reset();
      this.detalle.push(resp);
    },
      error => (console.error(error))
    )
  }



  Finaliza(): void {
    this.recepcionFormDetalle.reset();
    this.recepcionForm.reset();
    Swal.fire('Recepcion Registrada Correctamente', 'Continue', 'success')
  }

  // Cargar Departamentes Anidado
  onSelect(event: any) {
    let id_edificio = event.target.value;
    console.log(id_edificio)
    this.departamentoservice.getAllDepartamentosByEdificio(id_edificio).subscribe(
      resp => {
        this.departamentos = resp;
      },
      error => (console.error(error))
    )
  }


  // Eliminar
  eliminarDetalle(id_detalle_ing: number) {
    this.recepcionservice.eliminarDetalle_ing(id_detalle_ing).subscribe(resp => {
      if (resp === true) {
        this.procedencia.pop(id_detalle_ing)
        this.procedencia.push(resp);
      }

    },
      error => (console.error(error))
    )
  }

  // Cargar tabla
  onSelectDetalle(event: any) {
    let id_encabezado_ing = event.target.value;
    console.log(id_encabezado_ing)
    this.recepcionservice.getDatosEncabezado(id_encabezado_ing).subscribe(
      resp => {
        this.detalleEnc = resp;
      },
      error => (console.error(error))
    )
  }

}