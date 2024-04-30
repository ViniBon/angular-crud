import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { PoBreadcrumb, PoPageAction } from '@po-ui/ng-components';
import {  UsuariosApiService } from '../../services/usuarios-api.service';

@Component({
  selector: 'app-detalhes-usuario',
  templateUrl: './detalhes-usuario.page.html',
  providers: [UsuariosApiService]
})
export class DetalhesUsuarioPage implements OnInit {

  public usuarioRegistro!: Object;

  constructor(
    private router: Router,
    private activateRoute: ActivatedRoute,
  ){  }
  
  acoes: Array<PoPageAction> = [
    {
      label: 'Voltar',
      type: 'Default',
      action: () => this.voltar('/usuarios')
    },
  ];

  breadcrumb: PoBreadcrumb = {
    items: [
      { label: 'Início', link: '/' },
      { label: 'Usuários', link: '/usuarios' },
      { label: 'Detalhes do usuário', link: '/detalhes-usuario' },
    ],
  };

  public get titulo(): string {
    return 'Detalhes do usuário';//`${this.global.i18n.literals.bemVindo}, ${this.nomeUsuario}`;
  }

  ngOnInit(): void {
    this.usuarioRegistro = this.activateRoute.snapshot.queryParams;
  }

  voltar(path: string): void {
    void this.router.navigate([path], { relativeTo: this.activateRoute });
  }
}
