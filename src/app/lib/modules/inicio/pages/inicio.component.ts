import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html'
})
export class InicioComponent implements OnInit {

  public get titulo(): string {
    return 'Inicio';//`${this.global.i18n.literals.bemVindo}, ${this.nomeUsuario}`;
  }

  private nomeUsuario = '';

  constructor(
  ) { }

  ngOnInit(): void {

  }

 
}
