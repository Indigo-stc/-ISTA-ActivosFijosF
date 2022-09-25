import { Component, OnInit } from '@angular/core';
import { ActivosService } from 'src/app/service/activos.service';

@Component({
  selector: 'app-ver-registros-activos',
  templateUrl: './ver-registros-activos.component.html',
  styleUrls: ['./ver-registros-activos.component.css']
})
export class VerRegistrosActivosComponent implements OnInit {
  listarActivos:any;

  constructor(
    public listarAllActivos:ActivosService,
  ) { }

  ngOnInit(): void {
    
 //listar Activos
        this.listarAllActivos.getAllActivos().subscribe(
          listarActivos => {
            this.listarActivos = listarActivos
            console.log(listarActivos);
          },
          error => (console.log(error+"hhhhh"))
        )
  }

}


