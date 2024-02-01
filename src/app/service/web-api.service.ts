import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebApiService {

  //private apiUrl = 'https://jsonplaceholder.typicode.com/users'; // Replace with your API
  private apiUrl = 'http://localhost:8080/v1/users';

  constructor(private http: HttpClient) { }

  getUsers(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  getUserById(id: number): Observable<any> {
    return this.http.get<any>(this.apiUrl + '/' + id);
  }

  // delete user
  deleteUser(id: number): Observable<any> {
    return this.http.delete<any>(this.apiUrl + '/' + id);
  }

  // create user
  createUser(user: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, user);
  }

  // update user
  updateUser(user: any): Observable<any> {
    return this.http.put<any>(this.apiUrl + '/' + user.id, user);
  }
}
