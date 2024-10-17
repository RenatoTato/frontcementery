import { Routes } from '@angular/router';
import { authGuard } from './shared/guards/auth.guard';
export const routes: Routes = [
    {
        path: '',
        loadComponent: ()=>import('@info/pages/info-dashboard/info-dashboard.component').then(m=>m.InfoDashboardComponent)
    },
    {
        path: 'admin',
        loadComponent:()=>import('@admin/pages/dashboard/dashboard.component').then(m=>m.DashboardComponent),
        canActivate: [authGuard]
    },
    {
        path:'**',
        loadComponent:()=>import('@info/pages/not-found/not-found.component').then(m=>m.NotFoundComponent)
    }

];
