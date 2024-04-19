import { NgModule } from '@angular/core';
import { PoGridModule, PoPageModule } from '@po-ui/ng-components';
//import { CoreModule } from '../../core/core.module';
import { UsuariosPage } from './pages/usuarios.page';
import { UsuariosRoutingModule } from './usuarios-routing.module';
import { GridUsuariosComponent } from './components/grid-usuarios/grid-usuarios.component';
import { UsuariosApiService } from './services/usuarios-api.service';
@NgModule({
  declarations: [
    UsuariosPage,
    GridUsuariosComponent,
  ],
  imports: [
   //CoreModule,
    PoPageModule,
    UsuariosRoutingModule,
    PoGridModule
  ],
  providers: []
})
export class UsuariosModule { }
