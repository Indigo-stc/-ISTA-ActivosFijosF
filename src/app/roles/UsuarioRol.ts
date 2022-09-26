export class UsuarioRol{
    id_usuario: number=0;
	cedula: string='';
	nombres: string='';
	apellidos: string='';
	correo: string='';
	contrasenia: string='';
	roles: Rol[]=[];

}
class Rol{

	id_rol: any;
	nombre : any;
}