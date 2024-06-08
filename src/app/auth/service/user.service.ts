import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'app/auth/models';
import { environment } from 'environments/environment';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class UserService {
  /**
   *
   * @param {HttpClient} _http
   */
  constructor(private _http: HttpClient) {}

  /**
   * Get all users
   */
  getAll() {
    return this._http.get<User[]>(`http://localhost:4000/users`);
  }

  /**
   * Get user by id
   */
  getById(id: number) {
    return this._http.get<User>(`http://localhost:4000/users/${id}`);
  }
  getRoles() {
    return this._http
      .get<any>(`${environment.apiLiveUrl}/services/app/User/GetRoles`)
      .pipe(
        map(response => {
          
          return response;  
        })
      );
  }
  createUser(user:any){
    return this._http.post<any>(`${environment.apiLiveUrl}/services/app/User/Create`,user)
    .pipe(
      map(response => {
        
        return response;  
      })
    );
  }
}
