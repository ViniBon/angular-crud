import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { PoBreadcrumb, PoPageAction } from '@po-ui/ng-components';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.page.html',
})
export class UsuariosPage implements OnInit {

  acoes: Array<PoPageAction> = [
    {
      label: 'Novo Usuário',
      type: 'primary',
      action: () => this.novoUsuario()
    },
  ];

  breadcrumb: PoBreadcrumb = {
    items: [
      { label: 'Início', link: '/' },
      { label: 'Usuários', link: '/usuarios' },
    ],
  };

  constructor(
    private router: Router,
    private activateRoute: ActivatedRoute
  ){  }

  public get titulo(): string {
    return 'Usuários';
  }

  ngOnInit(): void {  }

  novoUsuario() {
    void this.router.navigate(['novo-usuario'], { relativeTo: this.activateRoute });
  }

}
