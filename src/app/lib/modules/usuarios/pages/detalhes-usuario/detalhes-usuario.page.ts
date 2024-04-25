import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { PoBreadcrumb, PoInputComponent, PoNotificationService, PoPageAction } from '@po-ui/ng-components';
import { IUsuario, UsuariosApiService } from '../../services/usuarios-api.service';

@Component({
  selector: 'app-detalhes-usuario',
  templateUrl: './detalhes-usuario.page.html',
  providers: [UsuariosApiService]
})
export class DetalhesUsuarioPage implements OnInit {

  public usuarioRegistro: any;

  constructor(
    private router: Router,
    private activateRoute: ActivatedRoute,
    private readonly usuariosApiService: UsuariosApiService, 
  ){  }
  
  actions: Array<PoPageAction> = [
    {
      label: 'Voltar',
      type: 'Default',
      action: () => this.voltar('/usuarios')
    },
  ];

  breadcrumb: PoBreadcrumb = {
    items: [
      { label: 'Inicio', link: '/' },
      { label: 'Usuarios', link: '/usuarios' },
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
