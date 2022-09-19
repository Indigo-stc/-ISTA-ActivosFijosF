import { Component, OnInit } from '@angular/core';
import { DepartamentosService } from 'src/app/service/departamentos.service';
import { RegEdificioService } from 'src/app/service/reg-edificio.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-ver-departamentos',
  templateUrl: './ver-departamentos.component.html',
  styleUrls: ['./ver-departamentos.component.css']
})
export class VerDepartamentosComponent implements OnInit {

  departamentoForm!: FormGroup;

  public departamentos:any;
  edificios: any;

  constructor(
    public fb: FormBuilder,
    public departamentoservice: DepartamentosService,
    public regedificioservice: RegEdificioService
  ) { }

  ngOnInit(): void {

    this.departamentoForm = this.fb.group({
      id_departamento : [''],
      nombre_departamento : ['', Validators.required],
      descripcion : ['', Validators.required],
      edificio : ['', Validators.required]
    });

    this.regedificioservice.getAllEdificios().subscribe(
      edificios => {
        this.edificios = edificios
        console.log(edificios);
      },
      error => (console.log(error))
    )

    this.departamentoservice.getAllDepartamentos().subscribe(
      departamentos => {
        this.departamentos = departamentos
        console.log(departamentos);
      },
      error => (console.log(error))
    )
  }

  guardarDepartamentos(): void {
    this.departamentoservice.saveDepartamentos(this.departamentoForm.value).subscribe(resp=>{
      this.departamentoForm.reset();
      this.departamentos = this.departamentos.filter( (departamentos: any) => resp.id!==this.departamentos.id)
      this.departamentos.push(resp);
    },
      error=>(console.error(error))
    )
  }

  // Eliminar
  eliminarDepartamento(id_departamento:number){
    this.departamentoservice.deleteDepartamentos(id_departamento).subscribe(resp=>{
    console.log(resp);  
    if (resp===true) {
      this.departamentos.pop(id_departamento)
      this.departamentos.push(resp);
    }
    
  },
  error=>(console.error(error))
  )
}

// Editar

editarDepartamento(departamentos:any){
  this.departamentoForm.setValue({
    id_departamento: departamentos.id_departamento,
    nombre_departamento: departamentos.nombre_departamento,
    descripcion: departamentos.descripcion,
    edificio: departamentos.edificio
  })
}

}
