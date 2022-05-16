import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable, throwError, Subject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Incidente } from '../_models';

@Injectable({
  providedIn: 'root'
})
export class IncidenteService {

  SERVER_URL: string = `${environment.SERVER_URL}/evidencia-edicion`;  


  constructor(private http: HttpClient) { }

  //Consulta Concesionario-Incidente
  getConcesionarioIncidente(Placa: string): Observable<any> {
    let params = new HttpParams();
    params = params.append('Placa', Placa);

    return this.http.get<any>(`${environment.SERVER_URL}/concesionario-incidente`, { params: params })
      .pipe(map((res: Response) => {

        return res || {}
      }),
        catchError(this.handleError)
      )
  }  

//Actualiza el siniestro para Concesionario-Incidente
postConcesionarioIncidenteSiniestro(IdVehiculo :number, IdTipoIncidente :string): Observable<any> {

  return this.http.post<any>(`${environment.SERVER_URL}/incidente-siniestro`, {
    'IdVehiculo'       : IdVehiculo,
    'IdTipoIncidente'  : IdTipoIncidente,

  })
  .pipe(map((res: Response) => {

      return res || {}
    }),
    catchError(this.handleError)
  )
}


//Registra la evidencia del siniestro
postGuardaEvidencias(formData: any): Observable<any> { 

  return this.http.post<any>(this.SERVER_URL, formData)
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
