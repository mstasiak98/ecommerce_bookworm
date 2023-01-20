import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly BASE_URL = environment.baseUrl + '/auth/';
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  constructor(private httpClient: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    return this.httpClient.post(
      this.BASE_URL + 'signin',
      {
        username: username,
        password: password,
      },
      this.httpOptions
    );
  }

  register(username: string, email: string, password: string): Observable<any> {
    return this.httpClient.post(
      this.BASE_URL + 'signup',
      {
        username: username,
        email: email,
        password: password,
      },
      this.httpOptions
    );
  }

  logout(): Observable<any> {
    return this.httpClient.post(this.BASE_URL + 'signout', null);
  }
}
