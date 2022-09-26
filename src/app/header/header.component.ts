
import { Component, ViewChild } from "@angular/core";
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout';
import { ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs';

import { StorageService } from '../service/storage.service';
import { CreateAccountService } from '../service/createaccount.service';
import { EventBusService } from '../shared/event-bus.service';
import Swal from "sweetalert2"; 

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent {

  private roles: string[] = [];
  isLoggedIn = false;
  
  username?: string;

  id_persona?: string;

  eventBusSub?: Subscription;

  //Acceso dependiendo de sus roles..

  //Roles Acceso-------------------------
  rolAdmin=false;
  rolSolicitante=false;
  rolConstatante=false;
  rolResponsable=false;

  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  constructor(
    private storageService: StorageService,
    private authService: CreateAccountService,
    private eventBusService: EventBusService,

    private observer: BreakpointObserver,
    private changeDedectionRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.changeDedectionRef.detectChanges();

    //Metodo incorporado para el login..
    this.isLoggedIn = this.storageService.isLoggedIn();

    if (this.isLoggedIn) {
      console.log('Estamos logiados satisfacririamente')
      const user = this.storageService.getUser();
      this.roles = user.roles;

      this.rolAdmin = this.roles.includes('ROLE_ADMIN');
      this.rolSolicitante = this.roles.includes('ROLE_SOLICITANTE');
      this.rolConstatante = this.roles.includes('ROLE_CONSTATANTE');
      this.rolResponsable = this.roles.includes('ROLE_RESPONSABLE');
      
      this.username = user.correo;
      this.id_persona= user.id;
      console.log('La obtencio del email del storage--> ' + user.correo)
    }

    this.eventBusSub = this.eventBusService.on('logout', () => {
      this.logout();
    });
  }

  ngAfterContentInit() {
    this.observer.observe(['(max-width: 800px)']).subscribe((res) => {
      if (res.matches) {
        this.sidenav.mode = 'over';
        this.sidenav.close();
      } else {
        // this.sidenav.mode = 'side';
        // this.sidenav.open();
      }
    });
  }



  //Parte de login y logout..
  logout(): void {

    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 5000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })
    
    Toast.fire({
      icon: 'success',
      title: 'Signed in successfully'
    })

    this.authService.logout().subscribe({
      next: res => {
        console.log('Salimos del sistema con --> ' + res)
        console.log(res);
        this.storageService.clean();
        window.location.reload();
      },
      error: err => {
        console.log('Tenemos un error a la hora de un logOut')
        console.log(err);
      }
    });
  }
}