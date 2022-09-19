import { Component, OnInit } from '@angular/core';
import { Historial } from './historial';
import { HISTORIAL } from './historial.json';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css']
})
export class HistorialComponent implements OnInit {
  historial: Historial[]=[];
  constructor() { }

  ngOnInit(): void {
    this.historial= HISTORIAL;
  }

}
