import { Component, OnInit } from '@angular/core';
import { DepartamentosService } from 'src/app/service/departamentos.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-ver-departamentos',
  templateUrl: './ver-departamentos.component.html',
  styleUrls: ['./ver-departamentos.component.css']
})
export class VerDepartamentosComponent implements OnInit {

  departamentoForm!: FormGroup;

  departamentos:any;

  constructor(
    public fb: FormBuilder,
    public departamentoservice: DepartamentosService,
  ) { }

  ngOnInit(): void {

    this.departamentoForm = this.fb.group({
      id_departamento : [''],
      nombre_departamento : ['', Validators.required],
      descripcion : ['', Validators.required],
      edificio : ['', Validators.required]
    });

    this.cargarLista();
  }

  cargarLista(){
    this.departamentoservice.getAllDepartamentos().subscribe(
      departamentos => {
        this.departamentos = departamentos
        console.log(departamentos);
      },
      error => (console.log(error))
    )
  }
  
}