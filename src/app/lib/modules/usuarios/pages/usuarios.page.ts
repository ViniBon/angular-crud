import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { PoBreadcrumb, PoPageAction } from '@po-ui/ng-components';
import { GridUsuariosComponent } from '../components/grid-usuarios/grid-usuarios.component'

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.page.html',
})
export class UsuariosPage implements OnInit {
  
  actions: Array<PoPageAction> = [
    {
      label: 'Novo Usuário',

      type: 'primary',
      action: () => this.novoUsuario()
    },
  ];



  public get titulo(): string {
    return 'Usuários';//`${this.global.i18n.literals.bemVindo}, ${this.nomeUsuario}`;
  }

  private nomeUsuario = '';




  ngOnInit(): void {

  }

  novoUsuario() {
    //void this.router.navigate(['novo-processo'], { relativeTo: this.activateRoute });
  }

}
