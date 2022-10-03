import { Component, OnInit } from '@angular/core';
import { ConstatacionActivoService } from 'src/app/service/constatacion-activo.service';

@Component({
  selector: 'app-ver-constatacion-activos',
  templateUrl: './ver-constatacion-activos.component.html',
  styleUrls: ['./ver-constatacion-activos.component.css']
})
export class VerConstatacionActivosComponent implements OnInit {
  
  encabezado: any;

  constructor(
    public constatacionActivoService: ConstatacionActivoService,
  ) { }

  ngOnInit(): void {

    // Obtener los Encabezados o Recepciones
  this.constatacionActivoService.getAllEnc_constatacion().subscribe(
    encabezado => {
      this.encabezado = encabezado
      console.log(encabezado);
    },
    error => (console.log(error))
  )
  }

}
