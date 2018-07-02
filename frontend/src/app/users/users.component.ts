import { Component, OnInit } from "@angular/core";
import { UsersService } from "./users.service";
import { Observable } from "rxjs";
import { User } from "./user/user.model";
import { DataSource } from "@angular/cdk/table";
import { LoginService } from "../security/login/login.service";

@Component({
  selector: "dec-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.css"]
})
export class UsersComponent implements OnInit {
  dataSource = new UsersDataSource(this.usersService);
  displayedColumns = ["id", "email", "name", "lastName", "profile"];
  isAdminUser: boolean = false;

  constructor(
    private usersService: UsersService,
    private loginService: LoginService
  ) {}

  ngOnInit() {
    this.isAdminUser = this.loginService.isAdminUser();
    if (this.isAdminUser) {
      this.displayedColumns.push("actions");
    }
  }
}

export class UsersDataSource extends DataSource<any> {
  constructor(private usersService: UsersService) {
    super();
  }
  connect(): Observable<User[]> {
    return this.usersService.getAll();
  }
  disconnect() {}
}
