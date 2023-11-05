import { NgModule, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Route, Router, RouterModule, RouterStateSnapshot, Routes, UrlMatchResult, UrlSegment, UrlSegmentGroup } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { InstitutionService } from './services/institution.service';
import { map } from 'rxjs';

const institutionGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const institutionService = inject(InstitutionService);
  const institution = route.paramMap.get('institution');
  const router = inject(Router);

  if (state.url === '/not-found') {
    return true;
  }

  return institutionService.getInstitutions().pipe(
    map(institutions => institutions.filter(({ name }) => name === institution)),
    map(institutions => {
      if (institutions.length === 0) {
        return router.createUrlTree(['/not-found']);
      }

      return true;
    })
  );
}

const emptyInstitutionGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const router = inject(Router);

  if (state.url === '/not-found') {
    return true;
  }

  if (route.url.length < 2) {
    return router.createUrlTree(['/fiserv/home']);
  }

  return true;
}

const routes: Routes = [
  // {
  //   path: ':institution',
  //   children: [
  //     { path: 'home', component: HomeComponent },
  //     { path: 'login', component: LoginComponent }
  //   ],
  //   canActivate: [institutionGuard]
  // },
  {
    path: ':institution/login',
    component: LoginComponent,
    canActivate: [institutionGuard]
  },
  {
    path: ':institution/home',
    component: HomeComponent,
    canActivate: [institutionGuard]
  },
  // {
  //   path: '',
  //   redirectTo: 'fiserv/home',
  //   pathMatch: 'prefix'
  // },
  // {
  //   path: 'not-found',
  //   component: NotfoundComponent
  // },
  {
    path: '**',
    canActivate: [emptyInstitutionGuard],
    component: NotfoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
