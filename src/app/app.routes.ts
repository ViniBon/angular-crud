import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/inicio',
        pathMatch: 'full'
    },
    {
        path: 'inicio',
        loadChildren: () => import('./lib/modules/inicio/inicio.module').then(m => m.InicioModule),
    },
    {
        path: 'usuarios',
        loadChildren: () => import('./lib/modules/usuarios/usuarios.module').then(m => m.UsuariosModule),
    },
];

@NgModule({
    imports: [RouterModule.forRoot(
      routes, {
      enableTracing: false
    }
    )],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }