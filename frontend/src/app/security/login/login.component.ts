import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { LoginService } from "./login.service";
import { Router } from "@angular/router";
import { NotificationService } from "../../shared/notification/notification.service";

@Component({
  selector: "dec-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  showPassword = false;

  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private router: Router,
    private notificationService: NotificationService
  ) {
    loginService.logOut();
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: this.formBuilder.control("", [
        Validators.required,
        Validators.email
      ]),
      password: this.formBuilder.control("", [Validators.required])
    });
  }

  login() {
    this.loginService
      .login(this.loginForm.value.email, this.loginForm.value.password)
      .subscribe(
        () => this.redirectToHome(),
        resp => this.notificationService.notify(resp.error.message)
      );
  }

  redirectToHome() {
    this.router.navigate(["/users"]);
  }
}
