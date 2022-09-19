export class Encabezado_ing {
    
    id_encabezado_ing:number=0;
    num_recep:string="";
    fecha_ingreso: Date | undefined;
    Documento:string='';
    estado: boolean = false;
    procedencia: any;
    departamento: any;
    usuario: any;
}

export class Detalle_ing {
    
    id_detalle_ing:number=0;
	codigoA:string='';
	descripcion:string='';
	Encabezado_ing: any;
}