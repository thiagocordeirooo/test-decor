import { CanActivate, Router } from "@angular/router";
import { Injectable, Injector } from "@angular/core";
import { LoginService } from "./login/login.service";

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private injector: Injector) {}

  canActivate(): boolean {
    const loginService = this.injector.get(LoginService);
    const router = this.injector.get(Router);

    const isAdmin = loginService.isAdminUser();
    if (!isAdmin) {
      router.navigate(["/"]);
    }
    return isAdmin;
  }
}
