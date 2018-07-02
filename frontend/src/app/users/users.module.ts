import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { UsersComponent } from "./users.component";
import { UserComponent } from "./user/user.component";
import { AdminGuard } from "../security/admin.guard";
import { MaterialModule } from "../material/material.module";
import { SharedModule } from "../shared/shared.module";

const ROUTES: Routes = [
  { path: "", component: UsersComponent },
  { path: "user/:id", component: UserComponent, canActivate: [AdminGuard] },
  { path: "user", component: UserComponent, canActivate: [AdminGuard] }
];

@NgModule({
  declarations: [UsersComponent, UserComponent],
  imports: [RouterModule.forChild(ROUTES), MaterialModule, SharedModule]
})
export class UsersModule {}
