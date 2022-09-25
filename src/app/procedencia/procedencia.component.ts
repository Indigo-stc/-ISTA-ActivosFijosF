import { Component, OnInit } from '@angular/core';
import { Procedencia } from '../models/procedencia';
import { ProcedenciaService } from '../service/procedencia.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';


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

  guardarProcedencia(): void {
    this.procedenciaservice.saveProcedencia(this.procedenciaForm.value).subscribe(resp => {
      if (resp = true) {
        this.procedenciaForm.reset();    
        Swal.fire('Procedencia Registrada Correctamente', 'Continue', 'success')
      } else {
        Swal.fire('Error', 'Erro de registro', 'warning')
      }
    },
      error => (console.error(error))
    )
  }


  actualizarProcedencia(): void {
    this.procedenciaservice.updateProcedencia(this.procedenciaForm.value).subscribe(resp => {
      this.procedenciaForm.reset();
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


}
