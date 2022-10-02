import { Component, OnInit } from '@angular/core';
import { DepartamentosService } from '../service/departamentos.service';
import { RegEdificioService } from '../service/reg-edificio.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Departamento } from '../models/departamento';


@Component({
  selector: 'app-departamentos',
  templateUrl: './departamentos.component.html',
  styleUrls: ['./departamentos.component.css']
})
export class DepartamentosComponent implements OnInit {

  departamentoForm!: FormGroup;

  departamentos = new Departamento;
  edificio: any;
  id_departamentoD: any;

  
  constructor(
    public fb: FormBuilder,
    public departamentoservice: DepartamentosService,
    public regedificioservice: RegEdificioService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {

    this.departamentoForm = this.fb.group({
      id_departamento : [''],
      nombre_departamento : ['', Validators.required],
      descripcion : ['', Validators.required],
      edificio : ['', Validators.required]
    });

    this.regedificioservice.getAllEdificios().subscribe(
      edificio => {
        this.edificio = edificio
        console.log(edificio);
      },
      error => (console.log(error))
    )

    this.id_departamentoD= this.route.snapshot.params['iddepartamento'];
    console.log(this.id_departamentoD);

    if (this.id_departamentoD) {
      this.cargarDatosEdit();
    }
  }

  guardarDepartamentos(): void {
    this.departamentoservice.saveDepartamentos(this.departamentoForm.value).subscribe(resp=>{
      this.departamentoForm.reset();
    },
      error=>(console.error(error))
    )
  }

  cargarDatosEdit() {
    this.departamentoservice.getByidDepartamento(this.id_departamentoD).subscribe((data: any)=> {
      this.departamentoForm.setValue(data);
      console.log(data);
    });
  }

  actualizarDepartamento(): void {
    this.departamentoservice.updateDepartamentos(this.departamentoForm.value).subscribe(resp => {
      console.log(resp)
      this.departamentoForm.reset();
    },
      error => (console.error(error))
    )
    
  }
}
