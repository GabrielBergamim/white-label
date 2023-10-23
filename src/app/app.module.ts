import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Institution, InstitutionService } from './services/institution.service';

const appInitializerFactory = (institutionService: InstitutionService) => {
  return () => new Promise<void>((res, err) => {
    institutionService.loadInstitutions().subscribe({
      next: (institutions: Institution[]) => {
        console.log(institutions);
        institutionService.setInstitutions(institutions);
        res();
      },
      error: () => err()
    });
  });
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializerFactory,
      deps: [InstitutionService],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
