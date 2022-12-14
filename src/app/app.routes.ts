import { Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActivosComponent } from './activos/activos.component';
import { RecepcionActivoComponent } from './recepcion-activo/recepcion-activo.component';
import { ConsultasActivosComponent } from './consultas-activos/consultas-activos.component';
// import { ResgistroResponsablesComponent } from './activos/resgistro-responsables/resgistro-responsables.component';
import { DepartamentosComponent } from './departamentos/departamentos.component';
import { AsignarActivoComponent } from './asignar-activo/asignar-activo.component';
import { ProcedenciaComponent } from './procedencia/procedencia.component';
import { ListarActivosComponent } from './listar-activos/listar-activos.component';
import { HomeComponent } from './home/home.component';
import { VerRecepcionesActivosComponent } from './recepcion-activo/ver-recepciones-activos/ver-recepciones-activos.component';
import { VerRegistrosActivosComponent } from './activos/ver-registros-activos/ver-registros-activos.component';
import { VerDepartamentosComponent } from './departamentos/ver-departamentos/ver-departamentos.component';
import { RegEdificioComponent } from './departamentos/reg-edificio/reg-edificio.component';
import { VerProcedenciaComponent } from './procedencia/ver-procedencia/ver-procedencia.component';
import { LoginComponent } from './login/login.component';
import { FormComponent } from './registrar/registrar.component';

import { RolesComponent } from './roles/roles.component';
import { PermisosComponent } from './roles/permisos/permisos.component';
import { HistorialComponent } from './roles/Historial/historial.component';
import { VerEdificiosComponent } from './departamentos/ver-edificios/ver-edificios.component';
import { VigilanteGuard } from './vigilante.guard';
import { ConstatacionActivosComponent } from './constatacion-activos/constatacion-activos.component';
import { VerConstatacionActivosComponent } from './constatacion-activos/ver-constatacion-activos/ver-constatacion-activos.component';

const app_routes: Routes = [
  {path: 'regconstatacion', component: ConstatacionActivosComponent},
  { path: 'Gestion_activos', component: ActivosComponent },
  { path: 'Recepcion_Activos', component: RecepcionActivoComponent },
  { path: 'Consultas_Activos', component: ConsultasActivosComponent },
  { path: 'procedencia', component: ProcedenciaComponent },
  { path: 'departamentos', component: DepartamentosComponent },
  { path: 'asignar_activo', component: AsignarActivoComponent },
  { path: 'listarActivos', component: ListarActivosComponent },
  { path: 'home', component: HomeComponent, canActivate: [VigilanteGuard] },
  {
    path: 'Recepcion_Activos/verTodos',
    component: VerRecepcionesActivosComponent,
  },
  {
    path: 'Constatacion_Activos/verTodos',
    component: VerConstatacionActivosComponent,
  },
  {
    path: 'Registro_Activos/verTodos',
    component: VerRegistrosActivosComponent,
  },
  { path: 'departamentos/verTodos', component: VerDepartamentosComponent },
  { path: 'departamentos/editar/:iddepartamento', component: DepartamentosComponent },
  { path: 'regedificio', component: RegEdificioComponent },
  { path: 'veredificios/verTodos', component: VerEdificiosComponent},
  { path: 'regedificio/editar/:idedificio', component: RegEdificioComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registra', component: FormComponent },
  { path: 'roles', component: RolesComponent, canActivate: [VigilanteGuard] },
  { path: 'permisos', component: PermisosComponent },
  { path: 'historial', component: HistorialComponent },

  { path: 'procedencia/VerTodos', component: VerProcedenciaComponent },

  { path: 'procedencia/edit/:idprocedencia', component: ProcedenciaComponent },

  {path: 'permisos/edit/:id_usuario', component: PermisosComponent},

  {path: '**',pathMatch:'full',redirectTo:'login'}
];
export const app_routing = RouterModule.forRoot(app_routes);
