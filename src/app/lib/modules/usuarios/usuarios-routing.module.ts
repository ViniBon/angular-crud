import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuariosPage } from './pages/usuarios.page';
import { NovoUsuarioPage } from './pages/novo-usuario/novo-usuario.page';
import { DetalhesUsuarioPage } from './pages/detalhes-usuario/detalhes-usuario.page';

const routes: Routes = [
  {
    path: '',
    component: UsuariosPage
  },
  {
    path: 'novo-usuario',
    component: NovoUsuarioPage
  },
  {
    path: 'detalhes-usuario',
    component: DetalhesUsuarioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuariosRoutingModule { }
