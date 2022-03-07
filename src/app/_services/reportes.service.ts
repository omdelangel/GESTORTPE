import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReportesService {

  constructor(private http: HttpClient) { }

  //Consulta los datos de Concesionario para la reimpresión del QR
getReporteSitActualConce(sindicato: number): Observable<any> {

 let params = new HttpParams();
 params = params.append('IdSindicato', sindicato);

 return this.http.get<any>(`${environment.SERVER_URL}/reporte-situacion-vehiculo`, {params: params})
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