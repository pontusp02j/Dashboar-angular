import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserProfileCardComponent } from './features/user-profile-card/user-profile-card.component';

const routes: Routes = [
  { path: '', redirectTo: '/profile', pathMatch: 'full' },
  { path: 'profile', redirectTo: '/users', pathMatch: 'full' },  // redirecting to /users as an example, change as per your requirements
  { path: 'profile/:id', component: UserProfileCardComponent },
  { path: 'users', loadChildren: () => import('./features/user-management/user-management.module').then(m => m.UserManagementModule) }  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
