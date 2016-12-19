import { CountryOfOriginChecker } from '../providers/countryOfOriginChecker';
import { PermissionService } from '../providers/permissionService';
import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    PermissionService,
    CountryOfOriginChecker
  ]
})
export class AppModule { }
