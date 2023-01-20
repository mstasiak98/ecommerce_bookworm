import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private readonly USER_KEY = 'auth_user';

  constructor() {}

  cleanSession(): void {
    sessionStorage.clear();
  }

  public saveSession(user: any): void {
    sessionStorage.removeItem(this.USER_KEY);
    sessionStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }

  public getUser(): any {
    const user = sessionStorage.getItem(this.USER_KEY);

    return user ? user : null;
  }

  public isLoggedIn(): boolean {
    const user = sessionStorage.getItem(this.USER_KEY);
    return !!user;
  }
}
