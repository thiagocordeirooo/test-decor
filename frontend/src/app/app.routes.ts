import { Routes } from "@angular/router";

import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./security/login/login.component";
import { LoggedInGuard } from "./security/loggedin.guard";

export const ROUTES: Routes = [
  { path: "", pathMatch: "full", redirectTo: "users" },
  { path: "login", component: LoginComponent },
  {
    path: "users",
    loadChildren: "./users/users.module#UsersModule",
    canLoad: [LoggedInGuard]
  },
  { path: "**", redirectTo: "users" }
];
