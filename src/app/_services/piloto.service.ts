import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable, throwError, Subject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class PilotoService {

  SERVER_URLReg: string = `${environment.SERVER_URL}/definitivo-digitalizacion`;
  constructor(private http: HttpClient) { }

    //Consulta los concesionarios en programa Piloto
    getConcesionariosPiloto(): Observable<any> {
  
      return this.http.get<any>(`${environment.SERVER_URL}/concesionario-piloto`)
        .pipe(map((res: Response) => {
  
          return res || {}
        }),
          catchError(this.handleError)
        )
    }

  //Registra la respuesta del concesionario (AceptoConvertidor SI o NO)
  postPilotoRespuesta(idContrato: number, aceptoConvertidor: number): Observable<any> {

    return this.http.post<any>(`${environment.SERVER_URL}/piloto-respuesta`, {
      'IdContrato': idContrato, 'AceptoConvertidor': aceptoConvertidor
    })
      .pipe(map((res: Response) => {

        return res || {}
      }),
        catchError(this.handleError)
      )
  }


   //Consulta los datos generales del contrato
   getContratoPiloto(idCotrato: number): Observable<any> {

    let params = new HttpParams();
    params = params.append('IdContrato', idCotrato);
  
    return this.http.get<any>(`${environment.SERVER_URL}/contrato-definitivo`, { params: params })
      .pipe(map((res: Response) => {

        return res || {}
      }),
        catchError(this.handleError)
      )
  }

     //Consulta los documentos 
     getDocumentosPiloto(idVehiculo: number): Observable<any> {

      let params = new HttpParams();
      params = params.append('IdVehiculo', idVehiculo);
    
      return this.http.get<any>(`${environment.SERVER_URL}/documentos-definitivo`, { params: params })
        .pipe(map((res: Response) => {
  
          return res || {}
        }),
          catchError(this.handleError)
        )
    }

    //Guarda los documentos digitlizados
  postGuardaDocumentoRegistroPiloto(formData: any): Observable<any> {  

  return this.http.post<any>(this.SERVER_URLReg, formData)
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
