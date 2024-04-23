import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { PoBreadcrumb, PoPageAction } from '@po-ui/ng-components';
import { GridUsuariosComponent } from '../components/grid-usuarios/grid-usuarios.component'

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.page.html',
})
export class UsuariosPage implements OnInit {

  constructor(
    private router: Router,
    private activateRoute: ActivatedRoute
  ){

  }
  
  actions: Array<PoPageAction> = [
    {
      label: 'Novo Usuário',
      type: 'primary',
      action: () => this.novoUsuario()
    },
  ];

  breadcrumb: PoBreadcrumb = {
    items: [
      { label: 'inicio', link: '/' },
      { label: 'usuarios', link: '/usuarios' },
    ],
  };

  public get titulo(): string {
    return 'Usuários';//`${this.global.i18n.literals.bemVindo}, ${this.nomeUsuario}`;
  }

  ngOnInit(): void {

  }

  novoUsuario() {
    void this.router.navigate(['novo-usuario'], { relativeTo: this.activateRoute });
  }

}
