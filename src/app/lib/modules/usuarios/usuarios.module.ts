import { NgModule } from '@angular/core';
import { PoBreadcrumbModule, PoComboComponent, PoDividerModule, PoDynamicModule, PoFieldModule, PoInfoModule, PoLoadingModule, PoModalModule, PoModule, PoPageModule, PoTableModule } from '@po-ui/ng-components';
import { UsuariosPage } from './pages/usuarios.page';
import { UsuariosRoutingModule } from './usuarios-routing.module';
import { GridUsuariosComponent } from './components/grid-usuarios/grid-usuarios.component';
import { CommonModule } from '@angular/common';
import { NovoUsuarioPage } from './pages/novo-usuario/novo-usuario.page';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DetalhesUsuarioPage } from './pages/detalhes-usuario/detalhes-usuario.page';
import { DetalhesUsuarioComponent } from './components/detalhes-usuario/detalhes-usuario.component';
import { PoComboBaseComponent } from '@po-ui/ng-components/lib/components/po-field/po-combo/po-combo-base.component';
@NgModule({
  declarations: [
    UsuariosPage,
    GridUsuariosComponent,
    NovoUsuarioPage,
    DetalhesUsuarioPage,
    DetalhesUsuarioComponent,
  ],
  imports: [
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
    PoInfoModule,
  ],
  providers: [],
})
export class UsuariosModule { }
