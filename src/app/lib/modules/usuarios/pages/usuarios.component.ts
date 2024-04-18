import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html'
})
export class UsuariosComponent implements OnInit {

  public get titulo(): string {
    return 'Inicio';//`${this.global.i18n.literals.bemVindo}, ${this.nomeUsuario}`;
  }

  private nomeUsuario = '';

  constructor(
  ) { }

  ngOnInit(): void {

  }

 
}
