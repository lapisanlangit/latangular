import { Injectable } from '@angular/core';
import { BaseService } from '../../shared/base/base.service';
import { Observable } from 'rxjs';
import { map, catchError, retry } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Login, User } from './login';


@Injectable()
export class LoginService extends BaseService {

  public isLoggedIn:boolean=false;
  public redirectUrl: string;

  constructor(private http: HttpClient) {
    super();

  }



  public login(nilaiKirim: Login): Observable<User[]> {
    return this.http.post<User[]>(this.URL_ROOT + 'data/user/login', nilaiKirim)
      .pipe(
        catchError(this.handleError)
      );
  }

}

