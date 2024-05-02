import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { PoPageAction } from '@po-ui/ng-components';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html'
})
export class InicioPage implements OnInit {

  actions: Array<PoPageAction> = [
    {
      label: 'TESTE',
      type: 'primary',
    },
  ];

  public get titulo(): string {
    return 'Inicio';
  }

  ngOnInit(): void { }
}
