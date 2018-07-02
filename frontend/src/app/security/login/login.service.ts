import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, BehaviorSubject } from "rxjs";
import { tap } from "rxjs/operators";
import { User, UserProfile } from "../../users/user/user.model";
import { Router } from "@angular/router";

import { DECOR_API } from "../../app.api";

@Injectable()
export class LoginService {
  user: User;
  private isAuthenticated: BehaviorSubject<boolean>;
  private userLogged: BehaviorSubject<User>;

  constructor(private http: HttpClient, private router: Router) {
    this.user = JSON.parse(localStorage.getItem("user"));
    this.userLogged = new BehaviorSubject<User>(this.user);
    this.isAuthenticated = new BehaviorSubject<boolean>(!!this.user);
  }

  checkIsAuthenticated(): Observable<boolean> {
    return this.isAuthenticated.asObservable();
  }

  currentUser(): Observable<User> {
    return this.userLogged.asObservable();
  }

  loggedIn(): boolean {
    return this.user != undefined;
  }

  isAdminUser(): boolean {
    return !!this.user && this.user.profile === UserProfile.ADMIN;
  }

  login(email: string, password: string): Observable<User> {
    return this.http
      .post<User>(`${DECOR_API}/auth/login`, { email, password })
      .pipe(
        tap(user => {
          this.user = user;
          localStorage.setItem("user", JSON.stringify(user));
          this.isAuthenticated.next(true);
          this.userLogged.next(user);
        })
      );
  }

  logOut() {
    this.user = undefined;
    this.isAuthenticated.next(false);
    this.userLogged.next(undefined);
    localStorage.removeItem("user");
    this.router.navigate(["/login"]);
  }
}
