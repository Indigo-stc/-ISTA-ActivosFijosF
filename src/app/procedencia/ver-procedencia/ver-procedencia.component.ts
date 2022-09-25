import { Component, OnInit } from '@angular/core';
import { ProcedenciaService } from 'src/app/service/procedencia.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Procedencia } from 'src/app/models/procedencia';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ver-procedencia',
  templateUrl: './ver-procedencia.component.html',
  styleUrls: ['./ver-procedencia.component.css']
})
export class VerProcedenciaComponent implements OnInit {

  procedenciaForm!: FormGroup;
  procedencia: Procedencia[]=[];

  constructor(
    public fb: FormBuilder,
    public procedenciaservice: ProcedenciaService
  ) {
  }
  ngOnInit(): any {

    // Crear un Formulario
    this.procedenciaForm = this.fb.group({
      id_procedencia: [''],
      nombre_procedencia: ['', Validators.required],
      descripcion: ['', Validators.required],

    });

    this.cargarLista();
  }

  //cargar lista --Obtener las procedencias
  cargarLista() {
    this.procedenciaservice.getAllProcedencia().subscribe(
      procedencia => {
        this.procedencia = procedencia
        console.log(procedencia);
      },
      error => (console.log(error))
    )

  }

  // Eliminar
  eliminarProcedencia(id_procedencia: number) {
    this.procedenciaservice.deleteProcedencia(id_procedencia).subscribe(resp => {
      if (resp === true) {
        this.cargarLista();
      }else { 
        
      }

    },
      error => (console.error(error))
    )
  }

  // Editar
  editarProcedencia(procedencia: any) {
    this.procedenciaForm.setValue({
    })
  }
}
