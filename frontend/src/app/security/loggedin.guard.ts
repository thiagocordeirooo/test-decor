import { CanLoad, CanActivate } from "@angular/router";
import { Injectable } from "@angular/core";
import { LoginService } from "./login/login.service";

@Injectable()
export class LoggedInGuard implements CanLoad, CanActivate {
  constructor(private loginService: LoginService) {}

  canLoad(): boolean {
    return this.checkAuthentication();
  }

  canActivate(): boolean {
    return this.checkAuthentication();
  }

  checkAuthentication(): boolean {
    const loggedIn = this.loginService.loggedIn();

    if (!loggedIn) {
      this.loginService.logOut();
    }

    return loggedIn;
  }
}
