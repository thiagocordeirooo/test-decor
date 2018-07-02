import { Component, OnInit } from "@angular/core";
import { LoginService } from "../security/login/login.service";
import { User } from "../users/user/user.model";

@Component({
  selector: "dec-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit {
  isAuthenticated: boolean;
  currentUser: User;

  constructor(private loginService: LoginService) {}

  ngOnInit() {
    this.loginService
      .checkIsAuthenticated()
      .subscribe(isAuthenticated => (this.isAuthenticated = isAuthenticated));

    this.loginService
      .currentUser()
      .subscribe(currentUser => (this.currentUser = currentUser));
  }

  logOut() {
    this.loginService.logOut();
  }
}
