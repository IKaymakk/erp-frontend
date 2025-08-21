import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


import { AppRoutingModule } from './app-routing-module';
import { App } from './app';


import { RegisterComponent } from './pages/register.component/register.component';
import { ProfileComponent } from './pages/profile.component/profile.component';
import { RolesComponent } from './pages/roles.component/roles.component';
import { LoginComponent } from './pages/login.component/login.component';

import { AuthTokenInterceptor } from './core/interceptors/auth-token-interceptor';


@NgModule({
  declarations: [
    App,
    RegisterComponent,
    ProfileComponent,
    RolesComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthTokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [App]
})
export class AppModule { }
