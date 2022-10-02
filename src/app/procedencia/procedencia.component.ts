// import { Component, OnInit } from '@angular/core';
// import { Procedencia } from '../models/procedencia';
// import { ProcedenciaService } from '../service/procedencia.service';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { ActivatedRoute } from '@angular/router';
// import Swal from 'sweetalert2';


// @Component({
//   selector: 'app-procedencia',
//   templateUrl: './procedencia.component.html',
//   styleUrls: ['./procedencia.component.css']
// })
// export class ProcedenciaComponent implements OnInit {

//   procedenciaForm!: FormGroup;
//   id_procedenciaP: any;
//   procedencia: Procedencia = new Procedencia();

//   constructor(
//     public fb: FormBuilder,
//     public procedenciaservice: ProcedenciaService,
//     private route: ActivatedRoute,
//   ) {
//   }
//   ngOnInit(): any {

//     this.procedenciaForm = this.fb.group({
//       id_procedencia: [''],
//       nombre_procedencia: ['', Validators.required],
//       descripcion: ['', Validators.required],
//     });

//     this.id_procedenciaP = this.route.snapshot.params['idprocedencia'];
//     if (this.id_procedenciaP) {
//       this.cargarDatosEdit();
//     }

//   }

//   guardarProcedencia(): void {
//     this.procedenciaservice.saveProcedencia(this.procedenciaForm.value).subscribe(resp => {
//       if (resp = true) {
//         this.procedenciaForm.reset();    
//         Swal.fire('Procedencia Registrada Correctamente', 'Continue', 'success')
//       } else {
//         Swal.fire('Error', 'Erro de registro', 'warning')
//       }
//     },
//       error => (console.error(error))
//     )
//   }


//   actualizarProcedencia(): void {
//     this.procedenciaservice.updateProcedencia(this.procedenciaForm.value).subscribe(resp => {
//       this.procedenciaForm.reset();
//     },
//       error => (console.error(error))
//     )
//   }

//   cargarDatosEdit() {
//     this.procedenciaservice.getByidProcedencia(this.id_procedenciaP).subscribe((data:any)=> {
//       this.procedenciaForm.setValue(data);
//       console.log(data);
//     });
//   }


// }




import { Component, OnInit } from '@angular/core';
import { Procedencia } from '../models/procedencia';
import { ProcedenciaService } from '../service/procedencia.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { VerProcedenciaComponent } from './ver-procedencia/ver-procedencia.component';


@Component({
  selector: 'app-procedencia',
  templateUrl: './procedencia.component.html',
  styleUrls: ['./procedencia.component.css']
})
export class ProcedenciaComponent implements OnInit {

  procedenciaForm!: FormGroup;
  id_procedenciaP: any;
  procedencia: Procedencia = new Procedencia();

  constructor(
    public fb: FormBuilder,
    public procedenciaservice: ProcedenciaService,
    private route: ActivatedRoute,
  ) {
  }
  ngOnInit(): any {

    this.procedenciaForm = this.fb.group({
      id_procedencia: [''],
      nombre_procedencia: ['', Validators.required],
      descripcion: ['', Validators.required],
    });

    this.id_procedenciaP = this.route.snapshot.params['idprocedencia'];
    if (this.id_procedenciaP) {
      this.cargarDatosEdit();
    }

  }

  nombre_procedencia: string;
  nombres_procedencia(e) {
    this.nombre_procedencia = e.target.value;
    console.log('Nombre procedencia-> ' + this.nombre_procedencia)
  }

  cap_nombre_procedencia: string;

  guardarProcedencia(): void {
    this.procedenciaservice.getByNombreProcedencia(this.nombre_procedencia).subscribe(
      resp =>{
        console.log(resp)
        this.cap_nombre_procedencia = resp;
        if(this.nombre_procedencia == this.cap_nombre_procedencia){
          console.log('Procedencia Repetido')
          Swal.fire({
            icon: 'error',title: 'Lo lamento....',text: 'Procedencia Ya Existente',
          })
        }else{
          this.procedenciaservice.saveProcedencia(this.procedenciaForm.value).subscribe(resp => {
            if (resp = true) {
              this.procedenciaForm.reset();    
              Swal.fire('Procedencia Registrada Correctamente', 'Continue', 'success')
            } else {
              Swal.fire('Error', 'Error de registro', 'warning')
            }
          },
            error => (console.error(error))
          )
        }
      }
    )
    
  }


  actualizarProcedencia(): void {
    this.procedenciaservice.updateProcedencia(this.procedenciaForm.value).subscribe(resp => {
      if (resp = true) {
        this.procedenciaForm.reset();    
        Swal.fire('Procedencia Actualizada Correctamente', 'Continue', 'success')
      } else {
        Swal.fire('Error', 'Error de actualizar', 'warning')
      }
    },
      error => (console.error(error))
    )
  }

  cargarDatosEdit() {
    this.procedenciaservice.getByidProcedencia(this.id_procedenciaP).subscribe((data:any)=> {
      this.procedenciaForm.setValue(data);
      console.log(data);
    });
  }

  limpiar(): void {
    console.log("limpiar")
    this.procedenciaForm.reset();
  }
}
