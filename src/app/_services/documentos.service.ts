import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { DocumentoVerificacion } from '../_models/documentos.model';

@Injectable({
  providedIn: 'root'
})
export class DocumentosService {

  SERVER_URL: string = `${environment.SERVER_URL}/documento-edicion`;  
  SERVER_URLReg: string = `${environment.SERVER_URL}/documento-digitalizacion`;
  constructor(private http: HttpClient) { }

  //Consulta los documentos asociados a un vehículo
getDocumentosVehiculo(vehiculo: number): Observable<any> {

  let params = new HttpParams();
  params = params.append('IdVehiculo', vehiculo);

  return this.http.get<any>(`${environment.SERVER_URL}/vehiculo-documentos`, {params: params})
  .pipe(map((res: Response) => {

      return res || {}
    }),
    catchError(this.handleError)
  ) 
}


//Guarda los documentos PDF
postGuardaDocumentoPDF(formData: any): Observable<any> {  

  return this.http.post<any>(this.SERVER_URL, formData)
  .pipe(map((res: Response) => {

      return res || {}
    }),
    catchError(this.handleError)
  )
}

 //Consulta los datos de contrato
 getVehiculoContrato(IdVehiculo: number): Observable<any> {

  let params = new HttpParams();
  params = params.append('IdVehiculo', IdVehiculo);

  console.log(IdVehiculo);

  return this.http.get<any>(`${environment.SERVER_URL}/contrato`, { params: params })
    .pipe(map((res: Response) => {

      return res || {}
    }),
      catchError(this.handleError)
    )
}

//Consulta los datos de contrato
getDocumentosContrato(IdVehiculo: number): Observable<any> {

  let params = new HttpParams();
  params = params.append('IdVehiculo', IdVehiculo);

  return this.http.get<any>(`${environment.SERVER_URL}/documentos-contrato`, { params: params })
    .pipe(map((res: Response) => {

      return res || {}
    }),
      catchError(this.handleError)
    )
}

//Guarda los documentos de la pantalla de Registro
postGuardaDocumentoRegistro(formData: any): Observable<any> {  

  return this.http.post<any>(this.SERVER_URLReg, formData)
  .pipe(map((res: Response) => {

      return res || {}
    }),
    catchError(this.handleError)
  )
}

//Guarda las observaciones de los documentos revisados
postDocumentoVerifica(documento: DocumentoVerificacion): Observable<any> {

  return this.http.post<any>(`${environment.SERVER_URL}/documento-verificacion`, {
    'IdVehiculo': documento.IdVehiculo, 'IdConcesionario': documento.IdConcesionario, 
    'IdDocumento': documento.IdDocumento, 'Correcto': documento.Correcto, 'Observaciones': documento.Observaciones})
    .pipe(map((res: Response) => {

      return res || {}
    }),
      catchError(this.handleError)
    )
}

//Consulta los datos de contrato
getContratoId(idContrato: number): Observable<any> {

  let params = new HttpParams();
  params = params.append('IdContrato', idContrato);

  return this.http.get<any>(`${environment.SERVER_URL}/contratoDocumento`, { params: params })
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
