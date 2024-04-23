import { NgModule } from '@angular/core';
import { PoBreadcrumbModule, PoDividerModule, PoDynamicModule, PoFieldModule, PoLoadingModule, PoModalModule, PoPageModule, PoTableModule } from '@po-ui/ng-components';
import { UsuariosPage } from './pages/usuarios.page';
import { UsuariosRoutingModule } from './usuarios-routing.module';
import { GridUsuariosComponent } from './components/grid-usuarios/grid-usuarios.component';
import { CommonModule } from '@angular/common';
import { NovoUsuarioPage } from './pages/novo-usuario/novo-usuario.page';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    UsuariosPage,
    GridUsuariosComponent,
    NovoUsuarioPage,
  ],
  imports: [
   //CoreModule,
    CommonModule,
    PoBreadcrumbModule,
    PoPageModule,
    UsuariosRoutingModule,
    PoTableModule,
    PoDividerModule,
    PoModalModule,
    PoDynamicModule,
    PoLoadingModule,
    PoFieldModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: []
})
export class UsuariosModule { }
