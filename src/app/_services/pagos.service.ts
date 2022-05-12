import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable, throwError, Subject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Pagos, PagoVentanilla } from '../_models';

@Injectable({
  providedIn: 'root'
})
export class PagosService {

  constructor(private http: HttpClient) { }

//Consulta los pagos pendientes 
 getPagosPendientes(placa: string): Observable<any> {

  let params = new HttpParams();
  params = params.append('Placa', placa);

  return this.http.get<any>(`${environment.SERVER_URL}/pagos-pendientes`, {params: params})
  .pipe(map((res: Response) => {

      return res || {}
    }),
    catchError(this.handleError)
  ) 
}

 //Guarda el pago 
 postPagoVentanilla(pago: PagoVentanilla): Observable<any> {

  return this.http.post<any>(`${environment.SERVER_URL}/pago-ventanilla`, {
    'IdContrato': pago.IdContrato, 'Importe': pago.Importe, 'FormaPago': pago.FormaPago
  })
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
