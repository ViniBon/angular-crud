import { NgModule } from '@angular/core';
import { PoPageModule } from '@po-ui/ng-components';
//import { CoreModule } from '../../core/core.module';
import { InicioComponent } from './pages/inicio.component';
import { InicioRoutingModule } from './inicio-routing.module';

@NgModule({
  declarations: [
    InicioComponent
  ],
  imports: [
   //CoreModule,
    PoPageModule,
    InicioRoutingModule,
  ]
})
export class InicioModule { }
