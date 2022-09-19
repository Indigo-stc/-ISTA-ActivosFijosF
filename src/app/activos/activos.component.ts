import { Component, OnInit } from '@angular/core';
import { CargarScriptsService } from './../cargar-scripts.service';
import { FormBuilder,FormControl } from '@angular/forms';
import { FormGroup, Validators } from '@angular/forms';
import { ActivosService } from 'src/app/service/activos.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-activos',
  templateUrl: './activos.component.html',
  styleUrls: ['./activos.component.css']

})
export class ActivosComponent implements OnInit {
  recepcionForm!: FormGroup;
  BuscarRecepForm!: FormGroup;
  detalleRecep:any;

  constructor( 
    public fb: FormBuilder,
    public buscarRecep:ActivosService,
    private _CargaScripts:CargarScriptsService)
  {
    
    _CargaScripts.Carga(["js-activos/activos"]);
  }
  ngOnInit(): any {

    this.recepcionForm = this.fb.group({
      encabezado_ing: [' ', Validators.required],
    });

    this.buscarRecep.getAllDetalle_ing().subscribe(
      detalleRecep => {
        this.detalleRecep = detalleRecep
        console.log(detalleRecep);
      },
      error => (console.log(error))
    )


//////fddddddd
// this.buscarRecep.buscarRecepcionAct().subscribe(data=>{
//   this.isexist=data.filter(value => value.estado==true).length==0
//   this.cordinador=data;
//   this.filteredOptions = this.myControl.valueChanges.pipe(
//     startWith(''),
//     map(values=>this.filter(values)),
//   );
//   this.issloading=false;
// })

   }  



  BuscarRecepcionDet(id_encabezado_ing:number){
    this.buscarRecep.buscarRecepcionAct(id_encabezado_ing).subscribe(resp=>{
    if (resp===true) {
      this.detalleRecep.pop(id_encabezado_ing)
      this.detalleRecep.push(resp);
    }
    
  },
  error=>(console.error(error))
  )
  }
}



