import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Vehiculo } from '../_models';

@Injectable({
  providedIn: 'root'
})
export class TalleresService {

  constructor(private http: HttpClient) { }

   //Consulta los datos de Talleres
   getTalleres(): Observable<any> {
  
    return this.http.get<any>(`${environment.SERVER_URL}/taller-cita`)
    .pipe(map((res: Response) => {
  
        return res || {}
      }),
      catchError(this.handleError)
    ) 
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
