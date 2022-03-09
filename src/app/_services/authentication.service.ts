import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  headers = new HttpHeaders().set('Content-Type', 'application/json');
  currentUser = {};

  constructor(private http: HttpClient,
    private router: Router) { }

 //Llama al servicio para logearse al sistema 
 login(username: string, password: string) {

  return this.http.post<any>(`${environment.SERVER_URL}/login`, { 'Usuario': username, 'Contrasenia': password })
    .pipe(map(user => {
      console.log("user");
      console.log(user);
      // login successful if there's a jwt token in the response
      if (user && user.token) {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        sessionStorage.setItem('access_token', user.token);
        sessionStorage.setItem('usuario', JSON.stringify(user.usuario));
        this.currentUser = user;
      }
      return user;
    }));
}

get isLoggedIn(): boolean {
  let authToken = sessionStorage.getItem('access_token');
  return (authToken !== null) ? true : false;
}

//Obtiene token del storage
getToken() {
  return sessionStorage.getItem('access_token');
}

//Sale de la navegación 
logout() {
  let removeToken = sessionStorage.removeItem('access_token');
  sessionStorage.removeItem("usuario");
  if (removeToken == null) {
    this.router.navigate(['login']);
  }
}

// Error 
handleError(error: HttpErrorResponse) {
  let msg = '';
  if (error.error instanceof ErrorEvent) {
    // client-side error
    msg = error.error.message;
  } else {
    // server-side error
    msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
  }
  return throwError(msg);
}
}

