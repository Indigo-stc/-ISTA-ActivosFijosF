import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Enc_constatacion } from '../models/Enc_constatacion';
import { ConstatacionActivoService } from '../service/constatacion-activo.service';
import { DatePipe } from '@angular/common';
import { CargarScriptsService } from './../cargar-scripts.service';
//Import del storage
import { StorageService } from '../service/storage.service';
import { ColdObservable } from 'rxjs/internal/testing/ColdObservable';


@Component({
  selector: 'app-constatacion-activos',
  templateUrl: './constatacion-activos.component.html',
  styleUrls: ['./constatacion-activos.component.css'],
  providers: [DatePipe]
})
export class ConstatacionActivosComponent implements OnInit {
  
  form?: FormGroup;

  constatacion: Enc_constatacion = new Enc_constatacion();
  constataciones: any;
  username: any;
  constatacionForm!: FormGroup;
  usuario: any;

  //Variables de los datos del login.
  isLoggedIn = false;
  id_persona?: number;
  cedeula_p?: any;
  nombres_usuario?: string;
  apellidos_user?: string;
  user_final: any;

  //Date Variables
  date: Date;
  dateSet: string;

  constructor(
    private storageService: StorageService,
    private route: ActivatedRoute,
    public fomrmularioInicial: FormBuilder,
    public constatacionActivoService: ConstatacionActivoService,
    private miDatePipe: DatePipe,
    private _CargaScripts: CargarScriptsService
  ) { }

  ngOnInit(): any {
      //Formato a fechas actuales.. SET
      this.date = new Date();
      this.dateSet = this.miDatePipe.transform(this.date, 'yyyy-MM-dd');
      console.log("fechaaa v "+this.dateSet)

    //Carga de los nombres del usuario..
    this.isLoggedIn = this.storageService.isLoggedIn();

    if (this.isLoggedIn) {
      console.log('Estamos logiados satisfacririamente')
      const user = this.storageService.getUser();
      this.id_persona = user.id;
      this.nombres_usuario = user.nombres;
      this.cedeula_p = user.cedula;
      this.apellidos_user = user.apellidos;
      this.user_final = this.nombres_usuario.concat(' ' + this.apellidos_user)
      console.log("cedula "+this.cedeula_p)


      // alert('Estos son los datos que tenemos'+ this.id_persona +' '+this.nombres_usuario+ ' ' +this.apellidos_user)
    }

    this.form = this.fomrmularioInicial.group({
      Observacion: ['', Validators.required]

    });
  }
  // ID del encabezado
  cap_id_enc_constatacion: number;

  Observacion: string;
  Observaciones(e) {
    this.Observacion = e.target.value;
    console.log('observaciones -> ' + this.Observacion)
  }

  guardarEncabezadoConstatacion(): void {

    let enc_constatacion = {
        "nombres_Responsable": this.user_final,
        "estado": false,
        "id_Uresponsable": {
          "id_usuario": this.id_persona,
        },
        "observaciones": this.Observacion ,
        "cantactivos_Noconstatados": 0,
        "cantactivos_Constatados": 0,
        "cedula_Responsable": this.cedeula_p

    };

    this.constatacionActivoService.saveEnc_constatacion(enc_constatacion).subscribe({
      next: data => {
        this.cap_id_enc_constatacion = data.id_encabezado_ing;
        console.log('Codigo de encabezado-> ' + this.cap_id_enc_constatacion);
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

}