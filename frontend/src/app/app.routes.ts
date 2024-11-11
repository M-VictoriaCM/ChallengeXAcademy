import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { PlayerDetailsComponent } from './views/player-details/player-details.component';
import { NgModule } from '@angular/core';

export const routes: Routes = [
    {
        path:'home',
        component: HomeComponent
    },
    {
        path:'player/:id',
        component: PlayerDetailsComponent
    },
    { path:'', redirectTo:'/home', pathMatch:'full'},
    { path: '**', redirectTo:'/home', pathMatch:'full'}
];
@NgModule({
    imports:[RouterModule.forRoot(routes)],
    exports:[RouterModule]
})

export class AppRoutingModele{}
