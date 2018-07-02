import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import { User } from "./user/user.model";
import { DECOR_API } from "../app.api";

@Injectable()
export class UsersService {
  users: User[];

  constructor(private http: HttpClient) {}

  getAll(): Observable<User[]> {
    return this.http.get<User[]>(`${DECOR_API}/users`);
  }

  getById(id: number): Observable<User> {
    return this.http.get<User>(`${DECOR_API}/users/${id}`);
  }

  save(user: User): Observable<User> {
    if (user.id) {
      return this.http.put<User>(`${DECOR_API}/users/${user.id}`, user);
    } else {
      return this.http.post<User>(`${DECOR_API}/users`, user);
    }
  }
}
