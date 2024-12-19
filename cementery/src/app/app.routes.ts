import { Routes } from '@angular/router';
import { authGuard } from './shared/guards/auth.guard';
import { LayoutAdminComponent } from '@shared/components/layout-admin/layout-admin.component';
import { LayoutComponent } from '@shared/components/layout/layout.component';
import { adminGuard } from '@externo/guards/admin.guard';
export const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: '',
                loadComponent: () => import('@info/pages/info-dashboard/info-dashboard.component').then(m => m.InfoDashboardComponent)
            },
            {
                path: 'guias',
                loadComponent: () => import('@info/pages/guias/guias.component').then(m => m.GuiasComponent)
            },
            {
                path: 'servicios',
                loadComponent: () => import('@info/pages/servi-info/servi-info.component').then(m => m.ServiInfoComponent)
            },
            {
                path: 'consulta-ser-queirodo',
                loadComponent: () => import('@info/pages/difunto-info/difunto-info.component').then(m => m.DifuntoInfoComponent)
            },
            {
                path: 'articulos',
                loadComponent: () => import('@info/pages/articulos/articulos.component').then(m => m.ArticulosComponent)
            },
            {
                path: 'articulos/:id',
                loadComponent: () => import('@info/pages/articulos/articulos.component').then(m => m.ArticulosComponent)
            },
            {
                path: 'obituarios',
                loadComponent: () => import('@info/pages/obituarios-pinfo/obituarios-pinfo.component').then(m => m.ObituariosPinfoComponent)
            },
            {
                path: 'obituarios/:id',
                loadComponent: () => import('@info/pages/articulos/articulos.component').then(m => m.ArticulosComponent)
            },
        ]
    },
    {
        path: 'admin',
        component: LayoutAdminComponent,
        canActivate: [authGuard], // Protege las rutas del PanelAdmin
        children: [
            {
                path: 'dashboard',
                loadComponent: () => import('@admin/pages/dashboard/dashboard.component').then(m => m.DashboardComponent)
            },
            {
                path: 'disponibilidad',
                loadComponent: () => import('@admin/pages/consulta-grafica/consulta-grafica.component').then(m => m.ConsultaGraficaComponent)
            },
            {
                path: 'articulo',
                loadComponent: () => import('@admin/pages/articulo/articulo.component').then(m => m.ArticuloComponent)
            },
            {
                path: 'difunto',
                loadComponent: () => import('@admin/pages/difunto-dashboard/difunto-dashboard.component').then(m => m.DifuntoDashboardComponent)
            },
            {
                path: 'guia',
                loadComponent: () => import('@admin/pages/guia-dashboard/guia-dashboard.component').then(m => m.GuiaDashboardComponent)
            },
            {
                path: 'iglesia',
                loadComponent: () => import('@admin/pages/iglesia/iglesia.component').then(m => m.IglesiaComponent)
            },
            {
                path: 'info',
                loadComponent: () => import('@admin/pages/info/info.component').then(m => m.InfoComponent)
            },
            {
                path: 'obituario',
                loadComponent: () => import('@admin/pages/obituario-dashboard/obituario-dashboard.component').then(m => m.ObituarioDashboardComponent)
            },
            {
                path: 'servicio',
                loadComponent: () => import('@admin/pages/servicio-dashboard/servicio-dashboard.component').then(m => m.ServicioDashboardComponent)
            },
            {
                path: 'tumba',
                loadComponent: () => import('@admin/pages/tumba-dashboard/tumba-dashboard.component').then(m => m.TumbaDashboardComponent)
            },
            {
                path: 'historial',
                loadComponent: () => import('@admin/pages/historial/historial.component').then(m => m.HistorialComponent),
                canActivate: [adminGuard], // Aplica el guard aqu
            },
            {
                path: 'notificaciones',
                loadComponent: () => import('@admin/pages/notifications/notifications.component').then(m => m.NotificationsComponent),
            },
            {
                path: 'notificaciones/:id',
                loadComponent: () => import('@admin/pages/notifications/notifications.component').then(m => m.NotificationsComponent),
            },
        ]
    },
    {
        path: 'login',
        loadComponent: () => import('@auth/login/login.component').then(m => m.LoginComponent)
    },
    {
        path: '**',
        loadComponent: () => import('@info/pages/not-found/not-found.component').then(m => m.NotFoundComponent)
    }

];
