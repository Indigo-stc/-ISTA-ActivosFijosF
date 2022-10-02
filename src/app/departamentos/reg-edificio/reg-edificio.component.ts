import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegEdificioService } from 'src/app/service/reg-edificio.service';
import { ActivatedRoute } from '@angular/router';
import { Edificio } from 'src/app/models/edificio';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reg-edificio',
  templateUrl: './reg-edificio.component.html',
  styleUrls: ['./reg-edificio.component.css']
})
export class RegEdificioComponent implements OnInit {

  edificioForm!: FormGroup;
  id_edificioE: any;

  edificio = new Edificio;

  constructor(
    public fb: FormBuilder,
    public regedificioservice: RegEdificioService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): any {

    this.edificioForm = this.fb.group({
      id_edificio: [''],
      nombre_edificio: ['', Validators.required],
      descripcion: ['', Validators.required],
    });

    this.id_edificioE= this.route.snapshot.params['idedificio'];
    console.log(this.id_edificioE);

    if (this.id_edificioE) {
      this.cargarDatosEdit();
    }
  }

  nombre_edificio: string;
  nombres_edificio(e) {
    this.nombre_edificio = e.target.value;
    console.log('Nombre edificio-> ' + this.nombre_edificio)
  }

  cap_nombre_edificio: string;

  guardarEdificio(): void {
    this.regedificioservice.getByNombreEdificio(this.nombre_edificio).subscribe(
      resp =>{
        console.log(resp)
        this.cap_nombre_edificio = resp;
        if(this.nombre_edificio == this.cap_nombre_edificio){
          console.log('Edificio Repetido')
          Swal.fire({
            icon: 'error',title: 'Lo lamento....',text: 'Edificio Ya Existente',
          })
        }else{
          this.regedificioservice.saveEdificios(this.edificioForm.value).subscribe(resp=>{
            if (resp = true) {
              this.edificioForm.reset();    
              Swal.fire('Edificio Registrado Correctamente', 'Continue', 'success')
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
    this.regedificioservice.getByidEdificio(this.id_edificioE).subscribe((data: any)=> {
      this.edificioForm.setValue(data);
      console.log(data);
    });
  }

  actualizarEdificio(): void {
    this.regedificioservice.updateEdificios(this.edificioForm.value).subscribe(resp => {
      if (resp = true) {
        this.edificioForm.reset();    
        Swal.fire('Edificio Actualizado Correctamente', 'Continue', 'success')
      } else {
        Swal.fire('Error', 'Error de actualizar', 'warning')
      }
    },
      error => (console.error(error))
    )
    
  }

  limpiar(): void {
    console.log("limpiar")
    this.edificioForm.reset();
  }
}