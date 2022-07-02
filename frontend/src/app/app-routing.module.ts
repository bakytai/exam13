import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { CatalogComponent } from './pages/catalog/catalog.component';
import { PlaceFormComponent } from './pages/place-form/place-form.component';
import { RoleGuardService } from './services/role-guard.service';

const routes: Routes = [
  {path: '', component: CatalogComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {
    path: 'new/place',
    canActivate: [RoleGuardService],
    data: {roles: ['admin', 'user']},
    component: PlaceFormComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
