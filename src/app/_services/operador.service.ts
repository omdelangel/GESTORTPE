import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable, throwError, Subject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Operador } from '../_models';

@Injectable({
  providedIn: 'root'
})
export class OperadorService {

  constructor(private http: HttpClient) { }

  //Consulta los operadores
  getOperadorVehiculo(Placa: string): Observable<any> {
    let params = new HttpParams();
    params = params.append('Placa', Placa);

    return this.http.get<any>(`${environment.SERVER_URL}/operadores-vehiculo`, { params: params })
      .pipe(map((res: Response) => {

        return res || {}
      }),
        catchError(this.handleError)
      )
  }

  //Registra/Edita operador
  postRegistraOperador(operador: Operador): Observable<any> {

    return this.http.post<any>(`${environment.SERVER_URL}/operador-edicion`, {
      'IdVehiculo': operador.IdVehiculo,
      'IdConcesionario': operador.IdConcesionario, 'IdOperador': operador.IdOperador, 'Nombre': operador.Nombre,
      'Paterno': operador.Paterno, 'Materno': operador.Materno, 'RFC': operador.RFC, 'CURP': operador.CURP,
      'FechaNacimiento': operador.FechaNacimiento, 'TipoPersona': operador.TipoPersona, 'Genero': operador.Genero,
      'EstadoCivil': operador.EstadoCivil, 'Calle': operador.Calle, 'Exterior': operador.Exterior, 'Interior': operador.Interior,
      'IdColonia': operador.IdColonia, 'Telefono': operador.Telefono, 'Celular': operador.Celular,
      'email': operador.email, 'IdIdentificacion': operador.IdIdentificacion, 'FolioIdentificacion': operador.FolioIdentificacion,
      'Licencia': operador.Licencia
    })
      .pipe(map((res: Response) => {


        return res || {}
      }),
        catchError(this.handleError)
      )
  }

  //Verifica si el RFC del operador ya existe
  getOperadorRFC(rfc: string): Observable<any> {

    let params = new HttpParams();
    params = params.append('RFC', rfc);

    return this.http.get<any>(`${environment.SERVER_URL}/operador-rfc`, { params: params })
      .pipe(map((res: Response) => {

        return res || {}
      }),
        catchError(this.handleError)
      )
  }

  //Cambia el estatus del operador
  postBajaOperador(idOperador: number, idVehiculo: number, estatus: string): Observable<any> {

    console.log("baja del operador");
    console.log(idOperador + " " + idVehiculo + " " +  estatus);


    return this.http.post<any>(`${environment.SERVER_URL}/operador-estatus`, {
      'IdOperador': idOperador, 'IdVehiculo': idVehiculo, 'Estatus': estatus
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
