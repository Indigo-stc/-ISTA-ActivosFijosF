import { Component, OnInit } from '@angular/core';
import { Procedencia } from '../models/procedencia';
import { ProcedenciaService } from '../service/procedencia.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-procedencia',
  templateUrl: './procedencia.component.html',
  styleUrls: ['./procedencia.component.css']
})
export class ProcedenciaComponent implements OnInit {

  // Guardar Procedencia
  // VARIABLES
  procedenciaForm!: FormGroup;
  id_procedenciaP: any;

  // creacion de array

  procedencia: any;

  constructor(
    public fb: FormBuilder,
    public procedenciaservice: ProcedenciaService,
    private route: ActivatedRoute,
  ) {
  }
  ngOnInit(): any {

    // Crear un Formulario
    // para guardar  pr
    this.procedenciaForm = this.fb.group({
      id_procedencia: [''],
      nombre_procedencia: ['', Validators.required],
      descripcion: ['', Validators.required],

    });

    // Obtener las procedencias
    this.procedenciaservice.getAllProcedencia().subscribe(
      procedencia => {
        this.procedencia = procedencia
        console.log(procedencia);
      },
      error => (console.log(error))
    )

    this.id_procedenciaP = this.route.snapshot.params['idprocedencia'];
    console.log(this.id_procedenciaP);

    if (this.id_procedenciaP) {
      this.cargarDatosEdit();
    }


  }



  // Guardar el Activo

  guardarProcedencia(): void {
    this.procedenciaservice.saveProcedencia(this.procedenciaForm.value).subscribe(resp => {
      this.procedenciaForm.reset();
      this.procedencia = this.procedencia.filter((procedencia: any) => resp.id !== this.procedencia.id)
      this.procedencia.push(resp);
    },
      error => (console.error(error))
    )
  }

  // Eliminar
  // eliminarProcedencia(id_procedencia: number) {
  //   this.procedenciaservice.deleteProcedencia(id_procedencia).subscribe(resp => {
  //     if (resp === true) {
  //       this.procedencia.pop(id_procedencia)
  //       this.procedencia.push(resp);
  //     }

  //   },
  //     error => (console.error(error))
  //   )
  // }

  // Editar

  editarProcedencia(procedencia: any) {
    this.procedenciaForm.setValue({
      id_procedencia: procedencia.id_procedencia,
      nombre_procedencia: procedencia.nombre_procedencia,
      descripcion: procedencia.descripcion,

    })
  }

  cargarDatosEdit() {
    this.procedenciaservice.getByidProcedencia(this.id_procedenciaP).subscribe((data:any)=> {
      this.procedenciaForm.setValue(data);
      console.log(data);

    });
  }

}
