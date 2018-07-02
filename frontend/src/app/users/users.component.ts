import { Component, OnInit } from "@angular/core";
import { UsersService } from "./users.service";
import { LoginService } from "../security/login/login.service";
import { MatTableDataSource } from "@angular/material";

@Component({
  selector: "dec-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.css"]
})
export class UsersComponent implements OnInit {
  dataSource = new MatTableDataSource([]);
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

    this.usersService
      .getAll()
      .subscribe(users => (this.dataSource = new MatTableDataSource(users)));
  }

  filter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
