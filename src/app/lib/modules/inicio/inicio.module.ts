import { NgModule } from '@angular/core';
import { PoPageModule } from '@po-ui/ng-components';
//import { CoreModule } from '../../core/core.module';
import { InicioPage } from './pages/inicio.page';
import { InicioRoutingModule } from './inicio-routing.module';

@NgModule({
  declarations: [
    InicioPage
  ],
  imports: [
   //CoreModule,
    PoPageModule,
    InicioRoutingModule,
  ]
})
export class InicioModule { }
