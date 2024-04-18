import { NgModule } from '@angular/core';
import { PoPageModule } from '@po-ui/ng-components';
//import { CoreModule } from '../../core/core.module';
import { UsuariosComponent } from './pages/usuarios.component';
import { UsuariosRoutingModule } from './usuarios-routing.module';

@NgModule({
  declarations: [
    UsuariosComponent
  ],
  imports: [
   //CoreModule,
    PoPageModule,
    UsuariosRoutingModule,
  ]
})
export class UsuariosModule { }
