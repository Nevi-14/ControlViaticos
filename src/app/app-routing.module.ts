import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes, CanLoad } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [

  {
    path: '',
    redirectTo: 'inicio-sesion',
    pathMatch: 'full'
  },
  {
    path: 'calendario-popover',
    loadChildren: () => import('./pages/calendario-popover/calendario-popover.module').then( m => m.CalendarioPopoverPageModule)
  },

  {
    path: 'inicio-sesion',
    loadChildren: () => import('./pages/inicio-sesion/inicio-sesion.module').then( m => m.InicioSesionPageModule)
  },
  {
    path: 'inicio',
    loadChildren: () => import('./pages/inicio/inicio.module').then( m => m.InicioPageModule),
    canLoad:[AuthGuard]
  },
  {
    path: 'control-viaticos',
    loadChildren: () => import('./pages/control-viaticos/control-viaticos.module').then( m => m.ControlViaticosPageModule)
  },
  {
    path: 'perfil',
    loadChildren: () => import('./pages/perfil/perfil.module').then( m => m.PerfilPageModule)
  },
  {
    path: 'adelanto-viaticos',
    loadChildren: () => import('./pages/adelanto-viaticos/adelanto-viaticos.module').then( m => m.AdelantoViaticosPageModule)
  },
  {
    path: 'estado-cuenta',
    loadChildren: () => import('./pages/estado-cuenta/estado-cuenta.module').then( m => m.EstadoCuentaPageModule)
  },
  {
    path: 'filtrar-gastos',
    loadChildren: () => import('./pages/filtrar-gastos/filtrar-gastos.module').then( m => m.FiltrarGastosPageModule)
  }






 
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
