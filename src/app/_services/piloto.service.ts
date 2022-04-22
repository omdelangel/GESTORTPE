import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable, throwError, Subject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Citas } from '../_models/cita.model';
import { PromocionesSindicato } from '../_models/piloto.model';

@Injectable({
  providedIn: 'root'
})
export class PilotoService {

  SERVER_URLReg: string = `${environment.SERVER_URL}/definitivo-digitalizacion`;
  constructor(private http: HttpClient) { }

    //Consulta los concesionarios en programa Piloto
    getConcesionariosPiloto(idEmpresa: number): Observable<any> {

      let params = new HttpParams();
      params = params.append('IdEmpresa', idEmpresa);
  
      return this.http.get<any>(`${environment.SERVER_URL}/concesionario-piloto`, {params: params})
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

//Registra la Cita para la desinstalación del convertidor
postRegistraCitaDesinstalacion(citas: Citas): Observable<any> {

  console.log("Registra la Cita para la desinstalación del convertidor");

  return this.http.post<any>(`${environment.SERVER_URL}/cita-convertidor-desinstalacion`, {'IdVehiculo': citas.IdVehiculo, 
  'IdConcesionario': citas.IdConcesionario, 'Fecha': citas.Fecha, 'IdTaller': citas.IdTaller})
  .pipe(map((res: Response) => { 

      return res || {}
    }),
    catchError(this.handleError)
  )
}

//Confirma la desinstalación del convertidor
postConfirmaDesinstalacion(citas: Citas): Observable<any> {

  return this.http.post<any>(`${environment.SERVER_URL}/desinstalacion`, {'IdVehiculo': citas.IdVehiculo, 
  'IdConcesionario': citas.IdConcesionario, 'FechaDesinstalacion': citas.Fecha})
  .pipe(map((res: Response) => { 

      return res || {}
    }),
    catchError(this.handleError)
  )
}


//Reagenda la cita para la desinstalación del convertidor
postCitaModificacionConvertidor(citas: Citas): Observable<any> {

  console.log("Reagenda la cita para la instalación del convertidor en piloto");

  return this.http.post<any>(`${environment.SERVER_URL}/cita-convertidor-modificacion`, {'IdCita': citas.IdCita, 'IdVehiculo': citas.IdVehiculo, 
  'IdConcesionario': citas.IdConcesionario, 'Fecha': citas.Fecha, 'IdTaller': citas.IdTaller})
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

  //Consulta los concesionarios en programa Piloto
  getPromocionesEmpresa(): Observable<any> {

    return this.http.get<any>(`${environment.SERVER_URL}/lPromocionesSind`)
      .pipe(map((res: Response) => {

        return res || {}
      }),
        catchError(this.handleError)
      )
  }

    //Registra en tabla de promocionessindicato
  postRegistraPromocionesSindicato(promocionesSindicato: PromocionesSindicato): Observable<any> {

    return this.http.post<any>(`${environment.SERVER_URL}/Alta-PromoSindicato`, {
      'IdPromocion'            :promocionesSindicato.IdPromocion        ,
      'IdSindicato'            :promocionesSindicato.IdSindicato        ,
      'FechaInicio'            :promocionesSindicato.FechaInicio        ,
      'FechaTermino'           :promocionesSindicato.FechaTermino       ,
      'Duracion'               :promocionesSindicato.Duracion           ,
      'Litros'                 :promocionesSindicato.Litros             ,  
    })
      .pipe(map((res: Response) => {

        return res || {}
      }),
        catchError(this.handleError)
      )
  }

}
