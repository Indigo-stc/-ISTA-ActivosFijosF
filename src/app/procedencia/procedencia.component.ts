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
  id_procedencia: any;
  
  Procedencia = new Procedencia

  constructor(
    public fb: FormBuilder,
    public procedenciaservice: ProcedenciaService,
    private route: ActivatedRoute,
  ) {
  }
  ngOnInit(): any {


    // Crear un Formulario
    this.procedenciaForm = this.fb.group({
      id_procedencia: [''],
      nombre_procedencia: ['', Validators.required],
      descripcion: ['', Validators.required],

    });


    this.id_procedenciaP = this.route.snapshot.params['idprocedencia'];
    console.log(this.id_procedenciaP);

    if (this.id_procedenciaP) {
      this.cargarDatosEdit();
    }

  }

  /* **************************************************** */

  actualizarProcedencia(): void {
    this.procedenciaservice.updateProcedencia(this.procedenciaForm.value).subscribe(resp => {
      console.log(resp)
      this.procedenciaForm.reset();
    },
      error => (console.error(error))
    )
    
  }
  
  guardarProcedencia(): void {
    this.procedenciaservice.saveProcedencia(this.procedenciaForm.value).subscribe(resp => {
      this.procedenciaForm.reset();
    },
      error => (console.error(error))
    )
  }
  

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
