import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Citas, DictamenCita } from '../_models/cita.model';

@Injectable({
  providedIn: 'root'
})
export class CitasService {

  constructor(private http: HttpClient) { }

//Llena catálogo horas por día
getCatalogoHorasDisponibles(idTaller: number, dia: any): Observable<any> {

  let params = new HttpParams();
  params = params.append('IdTaller', idTaller);
  params = params.append('Fecha', dia);

  return this.http.get<any>(`${environment.SERVER_URL}/horas-disponibles`, {params: params})
  .pipe(map((res: Response) => {

      return res || {}
    }),
    catchError(this.handleError)
  )
}

//Llena catálogo horas por día
getColorDisponibles(idTaller: number, dia: any): Observable<any> {

  let params = new HttpParams();
  params = params.append('IdTaller', idTaller);
  params = params.append('Fecha', dia);

  return this.http.get<any>(`${environment.SERVER_URL}/taller-disponibilidad`, {params: params})
  .pipe(map((res: Response) => {

      return res || {}
    }),
    catchError(this.handleError)
  )
}

//Registra la Cita para la revisión del auto
postRegistraCita(citas: Citas): Observable<any> {

  return this.http.post<any>(`${environment.SERVER_URL}/cita-registro`, {'IdVehiculo': citas.IdVehiculo, 
  'IdConcesionario': citas.IdConcesionario, 'Fecha': citas.Fecha, 'IdTaller': citas.IdTaller})
  .pipe(map((res: Response) => { 

      return res || {}
    }),
    catchError(this.handleError)
  )
}

//Obtiene los datos de la cita
getCitaConcesionario(idCita: number): Observable<any> {

  let params = new HttpParams();
  params = params.append('IdCita', idCita);

  return this.http.get<any>(`${environment.SERVER_URL}/cita-id`, {params: params})
  .pipe(map((res: Response) => {

      return res || {}
    }),
    catchError(this.handleError)
  )
}


//Cancela la Cita de revisión
postCancelaCita(idVehiculo: number, idCita: number): Observable<any> {

  return this.http.post<any>(`${environment.SERVER_URL}/cita-cancelacion`, {'IdVehiculo': idVehiculo, 
  'IdCita': idCita})
  .pipe(map((res: Response) => { 

      return res || {}
    }),
    catchError(this.handleError)
  )
}


//Dictaminar la cita
postDictamenCita(dictamenCita: DictamenCita): Observable<any> {

  return this.http.post<any>(`${environment.SERVER_URL}/cita-dictamen`, {'IdVehiculo': dictamenCita.IdVehiculo, 'IdConcesionario': dictamenCita.IdConcesionario, 
  'IdCita': dictamenCita.IdCita, 'IdDictamen': dictamenCita.IdDictamen, 'Observaciones': dictamenCita.Observaciones})
  .pipe(map((res: Response) => { 

      return res || {}
    }),
    catchError(this.handleError)
  )
}

//Registra la Cita para la instalación del convertidor
postRegistraCitaInstalacion(citas: Citas): Observable<any> {

  return this.http.post<any>(`${environment.SERVER_URL}/cita-convertidor-registro`, {'IdVehiculo': citas.IdVehiculo, 
  'IdConcesionario': citas.IdConcesionario, 'Fecha': citas.Fecha, 'IdTaller': citas.IdTaller})
  .pipe(map((res: Response) => { 

      return res || {}
    }),
    catchError(this.handleError)
  )
}

//Cancela la Cita de instalación
postCancelaCitaInstalacion(idVehiculo: number, idCita: number): Observable<any> {

  return this.http.post<any>(`${environment.SERVER_URL}/cita-convertidor-cancelacion`, {'IdVehiculo': idVehiculo, 
  'IdCita': idCita})
  .pipe(map((res: Response) => { 

      return res || {}
    }),
    catchError(this.handleError)
  )
}


//Confirma la instalación del convertidor
postConfirmaInstalacionCita(citas: Citas): Observable<any> {

  return this.http.post<any>(`${environment.SERVER_URL}/instalacion`, {'IdVehiculo': citas.IdVehiculo, 
  'IdConcesionario': citas.IdConcesionario, 'FechaInstalacion': citas.Fecha})
  .pipe(map((res: Response) => { 

      return res || {}
    }),
    catchError(this.handleError)
  )
}

//Obtiene los datos de la cita de instalación
getCitaInstalacion(idCita: number): Observable<any> {

  let params = new HttpParams();
  params = params.append('IdCitaInstalacion', idCita);

  return this.http.get<any>(`${environment.SERVER_URL}/cita-instalacion-id`, {params: params})
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
