import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';

export const routes: Routes = [
    { path: 'items', component: DashboardComponent },
    { path: '', redirectTo: '/items', pathMatch: 'full' },
];
