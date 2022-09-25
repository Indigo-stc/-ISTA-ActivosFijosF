import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegEdificioService } from 'src/app/service/reg-edificio.service';
import { ActivatedRoute } from '@angular/router';
import { Edificio } from 'src/app/models/edificio';

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

  guardarEdificio(): void {
    this.regedificioservice.saveEdificios(this.edificioForm.value).subscribe(resp=>{
      this.edificioForm.reset();
    },
      error=>(console.error(error))
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
      console.log(resp)
      this.edificioForm.reset();
    },
      error => (console.error(error))
    )
    
  }
}
