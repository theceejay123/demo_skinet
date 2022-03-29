import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { of, ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IAddress } from '../shared/models/address';
import { IUser } from '../shared/models/user';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private currentUserSrc: ReplaySubject<IUser> = new ReplaySubject<IUser>(1);
  currentUser$ = this.currentUserSrc.asObservable();

  baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient, private router: Router) {}

  public loadCurrentUser(token: string) {
    if (token === null) {
      this.currentUserSrc.next(null);
      return of(null);
    }

    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `Bearer ${token}`);

    return this.http.get(this.baseUrl + 'account', {headers}).pipe(
      map((user: IUser) => {
        if (user) {
          localStorage.setItem('token', user.token);
          this.currentUserSrc.next(user);
        }
      })
    );
  }

  public login(values: any) {
    return this.http.post(this.baseUrl + 'account/login', values).pipe(
      map((user: IUser) => {
        localStorage.setItem('token', user.token);
        this.currentUserSrc.next(user);
      })
    );
  }

  public register(values: any) {
    return this.http.post(this.baseUrl + 'account/register', values).pipe(
      map((user: IUser) => {
        if (user) {
          localStorage.setItem('token', user.token);
          this.currentUserSrc.next(user);
        }
      })
    );
  }

  public logout() {
    localStorage.removeItem('token');
    this.currentUserSrc.next(null);
    this.router.navigateByUrl('/');
  }

  public checkEmailExists(email: string) {
    return this.http.get(this.baseUrl + `account/emailexists?email=${email}`);
  }

  getUserAddress() {
    return this.http.get<IAddress>(this.baseUrl + 'account/address');
  }

  updateUserAddress(address: IAddress) {
    return this.http.put<IAddress>(this.baseUrl + 'account/address', address);
  }
}
