import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import {
  PoCheckboxGroupOption,
  PoDialogService,
  PoMenuItem,
  PoMenuModule,
  PoModalAction,
  PoModalComponent,
  PoModalModule,
  PoNotificationService,
  PoPageModule,
  PoRadioGroupModule,
  PoRadioModule,
  PoToolbarAction,
  PoToolbarModule,
  PoToolbarProfile,
} from '@po-ui/ng-components';
import { IdiomasApiService } from './lib/shared/services/idiomas-api.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    PoToolbarModule,
    PoMenuModule,
    PoPageModule,
    HttpClientModule,
    PoModalModule,
    PoRadioModule,
    PoRadioGroupModule
  ],
  providers: [IdiomasApiService],
  templateUrl: './app.component.html',
})
export class AppComponent {

  @ViewChild('modal') modalComponent!: PoModalComponent;

  readonly menus: Array<PoMenuItem> = [
    { 
      label: 'Início', 
      link: 'inicio', 
      icon: 'po-icon-home',
    },
    { 
      label: 'Usuários',
      link: 'usuarios', 
      icon: 'po-icon-user',
    },
  ];

  perfil: PoToolbarProfile = {
    avatar: 'https://via.placeholder.com/48x48?text=AVATAR',
    subtitle: 'example@gmail.com',
    title: 'Vini - Dev'
  };

  fechar: PoModalAction = {
    label: 'Fechar',
    action: () => {
      this.closeModal();
    },
  };

  confirmar: PoModalAction = {
    label: 'Confirmar',
    action: () => {
      this.changeLanguage();
    },
  };

  acoesPeril: Array<PoToolbarAction> = [
    { icon: 'po-icon-user', label: 'Usuário'},
    { icon: 'po-icon-world', label: 'Idiomas', action:() => this.openModal() },
    { icon: 'po-icon-exit', label: 'LogOut', type: 'danger', separator: true}
  ];

  linguagemOpcoes: Array<PoCheckboxGroupOption> = [
    { value: 'ingles', label: 'Inglês' },
    { value: 'portugues', label: 'Português' }
  ];

  constructor(
    private poDialog: PoDialogService,
    private poNotification: PoNotificationService, 
    private readonly idiomasApiService: IdiomasApiService
  ) {  }

  openModal(): void {
    this.modalComponent.open();
  }

  private changeLanguage() {  }

  closeModal() {
    this.modalComponent.close();
  }
}
