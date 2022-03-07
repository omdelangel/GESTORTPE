import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable, throwError, Subject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Vehiculo } from '../_models';

@Injectable({
  providedIn: 'root'
})
export class VehiculoService {

  private subject = new Subject<any>();
  constructor(private http: HttpClient) { }

  //Observable para obtener el idVehiculo
  sendIdVehi(isView: number) {
    this.subject.next({ idVehiculo: isView });
  }
  onIdVehi(): Observable<any> {
    return this.subject.asObservable();
  }


  //Observable para obtener el idVehiculo y el idPropietario de la Edición
  sendIdVehiProp(idVehi: number, idProp: number) {
    this.subject.next({ idVehiculo: idVehi, idPropietario: idProp });
  }
  onIdVehiProp(): Observable<any> {
    return this.subject.asObservable();
  }


  //Registra vehiculo
  postRegistraVehiculo(vehiculo: Vehiculo): Observable<any> {

    return this.http.post<any>(`${environment.SERVER_URL}/vehiculo-edicion`, {
      'IdVehiculo': vehiculo.IdVehiculo,
      'IdConcesionario': vehiculo.IdConcesionario, 'VIN': vehiculo.VIN, 'IdSubmarca': vehiculo.IdSubmarca,
      'Modelo': vehiculo.Modelo, 'Placa': vehiculo.Placa, 'Color': vehiculo.Color
    })
      .pipe(map((res: Response) => {

        return res || {}
      }),
        catchError(this.handleError)
      )
  }


  //Consulta los datos de vehículo
  getVehiculo(IdVehiculo: number): Observable<any> {

    let params = new HttpParams();
    params = params.append('IdVehiculo', IdVehiculo);

    return this.http.get<any>(`${environment.SERVER_URL}/vehiculo`, { params: params })
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
