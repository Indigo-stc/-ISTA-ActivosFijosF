import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegEdificioService } from 'src/app/service/reg-edificio.service';

@Component({
  selector: 'app-reg-edificio',
  templateUrl: './reg-edificio.component.html',
  styleUrls: ['./reg-edificio.component.css']
})
export class RegEdificioComponent implements OnInit {

  edificioForm!: FormGroup;
  public edificio:any;

  
  constructor(
    public fb: FormBuilder,
    public regedificioservice: RegEdificioService
  ) { }

  ngOnInit(): void {

    this.edificioForm = this.fb.group({
      id_edificio : [''],
      descripcion : ['', Validators.required],
      nombre_edificio : ['', Validators.required],
    });

    this.regedificioservice.getAllEdificios().subscribe(
      edificio => {
        this.edificio = edificio
        console.log(edificio);
      },
      error => (console.log(error))
    )
  }

  guardarEdificio(): void {
    this.regedificioservice.saveEdificios(this.edificioForm.value).subscribe(resp=>{
      this.edificioForm.reset();
      console.log("CLICK"); 
      this.edificio = this.edificio.filter( (edificio: any) => resp.id!==this.edificio.id)
      this.edificio.push(resp);
    },
      error=>(console.error(error))
    )
  }

  // Eliminar
  eliminarEdificio(id_edificio:number){
    this.regedificioservice.deleteEdificios(id_edificio).subscribe(resp=>{
    console.log(resp);  
    if (resp===true) {
      this.edificio.pop(id_edificio)
      this.edificio.push(resp);
    }
    
  },
  error=>(console.error(error))
  )
}

// Editar

editarEdificio(edificio:any){
  this.edificioForm.setValue({
    id_edificio: edificio.id_edificio,
    descripcion: edificio.descripcion,
    nombre_edificio: edificio.nombre_edificio,
  })
}
}
