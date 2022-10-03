import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule, Routes } from '@angular/router';

import {HttpClientModule} from '@angular/common/http';
import { ActivosComponent } from './activos/activos.component';

import { RecepcionActivoComponent } from './recepcion-activo/recepcion-activo.component';
import { ConsultasActivosComponent } from './consultas-activos/consultas-activos.component';

import { FormsModule,ReactiveFormsModule } from '@angular/forms';
//importa de servicio javascript
import { CargarScriptsService } from './cargar-scripts.service';
//fin de servicio
//rutas
import { app_routing } from './app.routes';
// import { FormComponent } from './recepcion-activo/form.component';
import { ProcedenciaComponent } from './procedencia/procedencia.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DepartamentosComponent } from './departamentos/departamentos.component';
import { AsignarActivoComponent } from './asignar-activo/asignar-activo.component';
import { HomeComponent } from './home/home.component';
import { ListarActivosComponent } from './listar-activos/listar-activos.component';
import { VerRecepcionesActivosComponent } from './recepcion-activo/ver-recepciones-activos/ver-recepciones-activos.component';
// import { VerRecepcionesActivosComponent } from '../app/recepcion-activo/ver-recepciones-activos/ver-recepciones-activos.component';
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

//Impot del interceptor
import { httpInterceptorProviders } from './helpers/http.interceptor';
import { ConstatacionActivosComponent } from './constatacion-activos/constatacion-activos.component';
import { VerConstatacionActivosComponent } from './constatacion-activos/ver-constatacion-activos/ver-constatacion-activos.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ActivosComponent,
    RecepcionActivoComponent,
    ConsultasActivosComponent,
    ProcedenciaComponent,
    DepartamentosComponent,
    AsignarActivoComponent,
    HomeComponent,
    ListarActivosComponent,
    VerRecepcionesActivosComponent,
    VerRegistrosActivosComponent,
    VerDepartamentosComponent,
    RegEdificioComponent,
    VerProcedenciaComponent,
    LoginComponent,
    FormComponent,
    RolesComponent,
    PermisosComponent,
    HistorialComponent,
    VerEdificiosComponent,
    ConstatacionActivosComponent,
    VerConstatacionActivosComponent
  ],


  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    app_routing,
    BrowserAnimationsModule
  ],
  providers: [
    CargarScriptsService,
    httpInterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
