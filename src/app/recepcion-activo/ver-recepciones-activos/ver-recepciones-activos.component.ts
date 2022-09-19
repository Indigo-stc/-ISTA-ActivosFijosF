import { Component, OnInit } from '@angular/core';
import { RecepcionActivoService } from 'src/app/service/recepcion-activo.service'; 

@Component({
  selector: 'app-ver-recepciones-activos',
  templateUrl: './ver-recepciones-activos.component.html',
  styleUrls: ['./ver-recepciones-activos.component.css']
})
export class VerRecepcionesActivosComponent implements OnInit {

  encabezado: any;

  constructor(
    public recepcionservice: RecepcionActivoService
  ) { }

  ngOnInit(): void {

    // Obtener los Encabezados o Recepciones
  this.recepcionservice.getAllEncabezado_ing().subscribe(
    encabezado => {
      this.encabezado = encabezado
      console.log(encabezado);
    },
    error => (console.log(error))
  )
  }

}
