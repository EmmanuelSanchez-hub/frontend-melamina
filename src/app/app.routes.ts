import { Routes } from '@angular/router';
import { Login } from './core/auth/pages/login/login';
import { authGuard } from './core/auth/guards/auth-guard';
import { MainLayout } from './core/layout/main-layout/main-layout';
import { Dashboard } from './features/dashboard/pages/dashboard/dashboard';
import { ErrorConexion } from './core/pages/error-conexion/error-conexion';
import { PublicLayout } from './features/public/layout/public-layout/public-layout';
import { Registro } from './features/public/pages/registro/registro';

export const routes: Routes = [
  // ===================== RUTAS PÚBLICAS =====================
  { path: '',
    component: PublicLayout,
    children:[
      { path: '', loadComponent: () => import('./features/landing/pages/landing/landing').then(m => m.Landing) },
      { path: 'registro-publico',component: Registro},
      { path: 'contactar', loadComponent: () => import('./features/landing/pages/contactar/contactar').then(m => m.Contactar) },
      { path: 'catalogo', loadChildren: () => import('./features/public/catalogo/catalogo-module').then(m => m.CatalogoModule)}
    ]
  },
  
  
  { path: 'login', component: Login },
  { path: 'error-conexion', component: ErrorConexion },

  // Rutas privadas envueltas por el MainLayout
  {
    path: 'app',
    component: MainLayout,
    canActivateChild: [authGuard],
    children: [
      { path: 'dashboard', component: Dashboard },

      {
        path: 'products',
        loadChildren: () =>
          import('./features/products/products-module')
            .then(m => m.ProductsModule)
      },
      {
        path: 'proveedores',
        loadChildren: () =>
          import('./features/proveedores/proveedores-module')
            .then(m => m.ProveedoresModule)
      },
      {
        path: 'clientes',
        loadChildren: () =>
          import('./features/clientes/clientes-module')
            .then(m => m.ClientesModule)
      },
      {
        path: 'usuarios',
        loadChildren: () =>
          import('./features/usuarios/usuarios-module')
            .then(m => m.UsuariosModule)
      },
      {
        path: 'inventario',
        loadChildren: () =>
          import('./features/inventario/inventario-module')
            .then(m => m.InventarioModule)
      },
      {
        path: 'movimientos',
        loadChildren: () =>
          import('./features/movimientos/movimientos-module')
            .then(m => m.MovimientosModule),
      }
    ]
  },
  { path: '**', redirectTo: '' }
];
