import { Component, OnInit } from '@angular/core';
import { RegEdificioService } from 'src/app/service/reg-edificio.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-ver-edificios',
  templateUrl: './ver-edificios.component.html',
  styleUrls: ['./ver-edificios.component.css']
})
export class VerEdificiosComponent implements OnInit {

  edificioForm!: FormGroup;

  edificio: any;

  constructor(
    public fb: FormBuilder,
    public regedificioservice: RegEdificioService
  ) { }

  ngOnInit(): any {

    this.edificioForm = this.fb.group({
      id_edificio: [''],
      nombre_edificio: ['', Validators.required],
      descripcion: ['', Validators.required],

    });

    this.cargarLista();
  }

  cargarLista(){
    this.regedificioservice.getAllEdificios().subscribe(
      edificio => {
        this.edificio = edificio
        console.log(edificio);
      },
      error => (console.log(error))
    )
  }

}

