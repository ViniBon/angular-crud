import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { PoPageAction } from '@po-ui/ng-components';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html'
})
export class InicioPage implements OnInit {

  actions: Array<PoPageAction> = [
    {
      label: 'novoUsuario',

      type: 'primary',
      action: () => this.novoUsuario()
    },
  ];

  public get titulo(): string {
    return 'Inicio';//`${this.global.i18n.literals.bemVindo}, ${this.nomeUsuario}`;
  }

  private nomeUsuario = '';



  ngOnInit(): void {

  }

  novoUsuario() {
    //void this.router.navigate(['novo-processo'], { relativeTo: this.activateRoute });
  }

}
