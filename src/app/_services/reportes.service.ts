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

 //Obtiene información de Autos Convertidos
getReporteAutosConvertidos(tipoVehiculo: string, fechaIni: string, fechaFin: string): Observable<any> {

  let params = new HttpParams();
  params = params.append('TipoVehiculo', tipoVehiculo);
  params = params.append('FechaInicio', fechaIni);
  params = params.append('FechaFin', fechaFin);

  return this.http.get<any>(`${environment.SERVER_URL}/reporte-vehiculos-convertidos`, {params: params})
  .pipe(map((res: Response) => {

      return res || {}
    }),
    catchError(this.handleError)
  )
}

//Obtiene información de Autos Sin concluir 
getReporteSinConcluir(): Observable<any> {

  return this.http.get<any>(`${environment.SERVER_URL}/reporte-vehiculos-sinconcluir`, {})
  .pipe(map((res: Response) => {

      return res || {}
    }),
    catchError(this.handleError)
  )
}

//Obtiene información de Autos con Ahorro por Período 
getReporteAhorroPeriodo(tipoPersona: string, sindicato: number): Observable<any> {

  let params = new HttpParams();
  params = params.append('TipoPersona', tipoPersona);
  params = params.append('IdSindicato', sindicato);
 
  return this.http.get<any>(`${environment.SERVER_URL}/reporte-ahorro-periodo`, {params: params})
  .pipe(map((res: Response) => {

      return res || {}
    }),
    catchError(this.handleError)
  )
}


//Obtiene información de Vehiculos que No Consumen GAS 
getReporteNoConsumen(sindicato: number): Observable<any> {

  let params = new HttpParams();
  params = params.append('IdSindicato', sindicato);
 
  return this.http.get<any>(`${environment.SERVER_URL}/reporte-vehiculos-noconsumen`, {params: params})
  .pipe(map((res: Response) => {

      return res || {}
    }),
    catchError(this.handleError)
  )
}


//Obtiene información de Ventas Recaudadas 
getReporteVtasRecaudadas(fechaIni: string, fechaFin: string): Observable<any> {

  let params = new HttpParams();
  params = params.append('FechaInicio', fechaIni);
  params = params.append('FechaFin', fechaFin);
 
  return this.http.get<any>(`${environment.SERVER_URL}/reporte-ventas-recauda`, {params: params})
  .pipe(map((res: Response) => {

      return res || {}
    }),
    catchError(this.handleError)
  )
}

//Obtiene información de Consumo de Estaciones 
getReporteConsumoEstaciones(fechaIni: string, fechaFin: string): Observable<any> {

  let params = new HttpParams();
  params = params.append('FechaIni', fechaIni);
  params = params.append('FechaFin', fechaFin);
 
  return this.http.get<any>(`${environment.SERVER_URL}/reporte-consumo-estaciones`, {params: params})
  .pipe(map((res: Response) => {

      return res || {}
    }),
    catchError(this.handleError)
  )
}

//Obtiene información para Reporte de Contratos sin Cita
getReporteContratosSinCita(): Observable<any> {

  return this.http.get<any>(`${environment.SERVER_URL}/reporte-contratos-sin-cita`, {})
  .pipe(map((res: Response) => {

      return res || {}
    }),
    catchError(this.handleError)
  )
}

//Obtiene información para Reporte de Análisis Situción Cita
  getReporteAnalisisSitCita(fechaIni: string, fechaFin: string): Observable<any> {

    let params = new HttpParams();
    params = params.append('FechaIni', fechaIni);
    params = params.append('FechaFin', fechaFin);
   
    return this.http.get<any>(`${environment.SERVER_URL}/reporte-analisis-sit-citas`, {params: params})
    .pipe(map((res: Response) => {
  
        return res || {}
      }),
      catchError(this.handleError)
    )
  }

//Obtiene información para Reporte Consumo It Ahorro
getReporteConsumoItAhorro(fecha: string): Observable<any> {

  let params = new HttpParams();
  params = params.append('Fecha', fecha);
 
  return this.http.get<any>(`${environment.SERVER_URL}/reporte-consumo-lt-ahorro`, {params: params})
  .pipe(map((res: Response) => {

      return res || {}
    }),
    catchError(this.handleError)
  )
}

//Obtiene información para Reporte Consumo It Incompleto
getReporteConsumoItIncompleto(fecha: string): Observable<any> {

  let params = new HttpParams();
  params = params.append('Fecha', fecha);
 
  return this.http.get<any>(`${environment.SERVER_URL}/reporte-consumo-lt-incompletos`, {params: params})
  .pipe(map((res: Response) => {

      return res || {}
    }),
    catchError(this.handleError)
  )
}

//Obtiene información para Reporte Consumo It Incompleto
getReporteBeneficioSalud(fecha: string): Observable<any> {

  let params = new HttpParams();
  params = params.append('Fecha', fecha);
 
  return this.http.get<any>(`${environment.SERVER_URL}/reporte-beneficio-salud`, {params: params})
  .pipe(map((res: Response) => {

      return res || {}
    }),
    catchError(this.handleError)
  )
}

//Obtiene información de Registros Vigentes
getRegistrosVigentes(sindicato: number): Observable<any> {

  let params = new HttpParams();
  params = params.append('Empresa', sindicato);

 
  return this.http.get<any>(`${environment.SERVER_URL}/Formalizados`, {params: params})
  .pipe(map((res: Response) => {

      return res || {}
    }),
    catchError(this.handleError)
  )
}

//Obtiene información de Autos Sin concluir 
getReportePilotoPorVencer(): Observable<any> {

  return this.http.get<any>(`${environment.SERVER_URL}/lLPVPilotos`, {})
  .pipe(map((res: Response) => {

      return res || {}
    }),
    catchError(this.handleError)
  )
}

 }