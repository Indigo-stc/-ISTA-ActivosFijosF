
import { Component, ViewChild } from "@angular/core";
import { MatSidenav } from '@angular/material/sidenav';
import {BreakpointObserver} from '@angular/cdk/layout';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl:  './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent {

    @ViewChild(MatSidenav)
    sidenav!: MatSidenav;

    constructor(
        private observer: BreakpointObserver,
        private changeDedectionRef: ChangeDetectorRef
      ) { }

      ngOnInit(): void {
        this.changeDedectionRef.detectChanges();
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
}