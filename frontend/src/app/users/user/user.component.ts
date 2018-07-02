import { Component, OnInit } from "@angular/core";
import { User, UserProfile } from "./user.model";
import { ActivatedRoute, Router } from "@angular/router";
import { UsersService } from "../users.service";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { NotificationService } from "../../shared/notification/notification.service";
import { LoginService } from "../../security/login/login.service";

@Component({
  selector: "dec-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.css"]
})
export class UserComponent implements OnInit {
  userForm: FormGroup;
  user: User;
  profileDisabled: boolean = false;
  title: string = "Novo Usuário";

  constructor(
    private usersService: UsersService,
    private loginService: LoginService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    this.initialForm();

    if (this.activatedRoute.snapshot.params["id"]) {
      this.title = "Editar Usuário";
      this.usersService
        .getById(this.activatedRoute.snapshot.params["id"])
        .subscribe(user => {
          this.user = user;
          this.initialForm();
        });
    }
  }

  salvar() {
    const user = this.userForm.value;
    this.usersService.save(user).subscribe(() => {
      this.notificationService.notify("Tudo certo, Usuário Salvo.");
      this.router.navigate(["/users"]);
    });
  }

  initialForm() {
    this.userForm = this.formBuilder.group({
      id: this.formBuilder.control(this.user ? this.user.id : ""),
      email: this.formBuilder.control(this.user ? this.user.email : "", [
        Validators.required,
        Validators.email
      ]),
      name: this.formBuilder.control(this.user ? this.user.name : "", [
        Validators.required
      ]),
      lastName: this.formBuilder.control(this.user ? this.user.lastName : ""),
      password: this.formBuilder.control(this.user ? this.user.password : "", [
        Validators.required
      ]),
      profile: this.formBuilder.control(
        this.user ? this.user.profile : UserProfile.USER
      )
    });

    if (this.user && this.user.id === this.loginService.user.id) {
      this.profileDisabled = true;
    }
  }
}
