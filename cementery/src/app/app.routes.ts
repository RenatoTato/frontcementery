import { Routes } from '@angular/router';
import { authGuard } from './shared/guards/auth.guard';
import { LayoutAdminComponent } from '@shared/components/layout-admin/layout-admin.component';
import { LayoutComponent } from '@shared/components/layout/layout.component';
export const routes: Routes = [
    {
        path: '',
        component:LayoutComponent,
        children:[
            {
                path: '',
                loadComponent: ()=>import('@info/pages/info-dashboard/info-dashboard.component').then(m=>m.InfoDashboardComponent)
            },
            {
                path: 'guias',
                loadComponent: ()=>import('@info/pages/guias/guias.component').then(m=>m.GuiasComponent)
            },
            {
                path: 'servicios',
                loadComponent: ()=>import('@info/pages/servi-info/servi-info.component').then(m=>m.ServiInfoComponent)
            },
            {
                path: 'consulta-ser-queirodo',
                loadComponent: ()=>import('@info/pages/difunto-info/difunto-info.component').then(m=>m.DifuntoInfoComponent)
            },
            {
                path: 'articulos',
                loadComponent: ()=>import('@info/pages/articulos/articulos.component').then(m=>m.ArticulosComponent)
            },
        ]
    },
    {
        path: 'admin',
        component:LayoutAdminComponent,
        canActivate: [authGuard], // Protege las rutas del PanelAdmin
        children:[
            {
                path: 'dashboard',
                loadComponent: ()=>import('@admin/pages/dashboard/dashboard.component').then(m=>m.DashboardComponent)
            },
            {
                path: 'disponibilidad',
                loadComponent: ()=>import('@admin/pages/consulta-grafica/consulta-grafica.component').then(m=>m.ConsultaGraficaComponent)
            },
            {
                path:'articulo',
                loadComponent: ()=>import('@admin/pages/articulo/articulo.component').then(m=>m.ArticuloComponent)
            }
        ]
    },
    {
        path:'login',
        loadComponent:()=>import('@auth/login/login.component').then(m=>m.LoginComponent)
    },
    {
        path:'**',
        loadComponent:()=>import('@info/pages/not-found/not-found.component').then(m=>m.NotFoundComponent)
    }

];
