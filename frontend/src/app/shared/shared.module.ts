import { NgModule, ModuleWithProviders } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { AuthInterceptor } from "../security/auth.interceptor";

import { LoginService } from "../security/login/login.service";
import { UsersService } from "../users/users.service";

import { LoggedInGuard } from "../security/loggedin.guard";
import { AdminGuard } from "../security/admin.guard";
import { NotificationService } from "./notification/notification.service";
import { HeaderPageComponent } from "./header-page/header-page.component";

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HeaderPageComponent
  ],
  declarations: [HeaderPageComponent]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    const AuthInterceptorProvider = {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    };

    return {
      ngModule: SharedModule,
      providers: [
        LoginService,
        UsersService,
        LoggedInGuard,
        AdminGuard,
        AuthInterceptorProvider,
        NotificationService
      ]
    };
  }
}
