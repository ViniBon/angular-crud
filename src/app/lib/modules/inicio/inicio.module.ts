import { NgModule } from '@angular/core';
import { PoAccordionModule, PoPageModule } from '@po-ui/ng-components';
//import { CoreModule } from '../../core/core.module';
import { InicioPage } from './pages/inicio.page';
import { InicioRoutingModule } from './inicio-routing.module';

@NgModule({
  declarations: [
    InicioPage
  ],
  imports: [
    PoPageModule,
    InicioRoutingModule,
    PoAccordionModule
  ]
})
export class InicioModule { }
