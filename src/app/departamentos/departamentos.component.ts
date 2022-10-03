import { Component, OnInit } from '@angular/core';
import { DepartamentosService } from '../service/departamentos.service';
import { RegEdificioService } from '../service/reg-edificio.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Departamento } from '../models/departamento';
import Swal from 'sweetalert2';


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

  // guardarDepartamentos(): void {
  //   this.departamentoservice.saveDepartamentos(this.departamentoForm.value).subscribe(resp=>{
  //     this.departamentoForm.reset();
  //   },
  //     error=>(console.error(error))
  //   )
  // }

  // cargarDatosEdit() {
  //   this.departamentoservice.getByidDepartamento(this.id_departamentoD).subscribe((data: any)=> {
  //     this.departamentoForm.setValue(data);
  //     console.log(data);
  //   });
  // }

  // actualizarDepartamento(): void {
  //   this.departamentoservice.updateDepartamentos(this.departamentoForm.value).subscribe(resp => {
  //     console.log(resp)
  //     this.departamentoForm.reset();
  //   },
  //     error => (console.error(error))
  //   )
    
  // }


  nombre_departamento: string;
  nombres_departamento(e) {
    this.nombre_departamento = e.target.value;
    console.log('Nombre departamento-> ' + this.nombre_departamento)
  }

  cap_nombre_departamento: string;

  guardarDepartamentos(): void {
    this.departamentoservice.getByNombreDepartamento(this.nombre_departamento).subscribe(
      resp =>{
        console.log(resp)
        this.cap_nombre_departamento = resp;
        if(this.nombre_departamento == this.cap_nombre_departamento){
          console.log('Departamento Repetido')
          Swal.fire({
            icon: 'error',title: 'Lo lamento....',text: 'Departamento Ya Existente',
          })
        }else{
          this.departamentoservice.saveDepartamentos(this.departamentoForm.value).subscribe(resp=>{
            if (resp = true) {
              this.departamentoForm.reset();    
              Swal.fire('Departamento Registrado Correctamente', 'Continue', 'success')
            } else {
              Swal.fire('Error', 'Erro de registro', 'warning')
            }
          },
            error => (console.error(error))
          )
        }
      }
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
      if (resp = true) {
        this.departamentoForm.reset();    
        Swal.fire('Departamento Actualizado Correctamente', 'Continue', 'success')
      } else {
        Swal.fire('Error', 'Error de actualizar', 'warning')
      }
    },
      error => (console.error(error))
    )  
  }

  limpiar(): void {
    console.log("limpiar")
    this.departamentoForm.reset();
  }

  
}
