import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable, throwError, Subject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Propietario } from '../_models';


@Injectable({
  providedIn: 'root'
})
export class PropietarioService {

  private subject = new Subject<any>();
  constructor(private http: HttpClient) { }

  //Observable para obtener el idPropietario
  sendIdPrope(isView: number) {
    this.subject.next({ idVehiculo: isView });
  }
  onIdPrope(): Observable<any> {
    return this.subject.asObservable();
  }
  

//Registra propietario
postRegistraPropietario(propietario: Propietario): Observable<any> {

  console.log("DATOS DEL PROP");
  console.log(propietario);

  return this.http.post<any>(`${environment.SERVER_URL}/propietario-edicion`, {'IdPropietario': propietario.IdPropietario, 
  'IdVehiculo': propietario.IdVehiculo, 'Nombre': propietario.Nombre, 'Paterno': propietario.Paterno, 'Materno': propietario.Materno, 
  'RFC': propietario.RFC, 'CURP': propietario.CURP, 'FechaNacimiento': propietario.FechaNacimiento, 'TipoPersona': propietario.TipoPersona,
  'Genero': propietario.Genero, 'EstadoCivil': propietario.EstadoCivil, 'Calle': propietario.Calle, 'Exterior': propietario.Exterior, 
  'Interior': propietario.Interior, 'IdColonia': propietario.IdColonia, 'Telefono': propietario.Telefono, 'Celular': propietario.Celular, 
  'email': propietario.email, 'IdIdentificacion': propietario.IdIdentificacion, 'FolioIdentificacion': propietario.FolioIdentificacion })
  .pipe(map((res: Response) => {


      return res || {}
    }),
    catchError(this.handleError)
  )
}


 //Verifica si el RFC del propietario ya existe
 getPropietarioRFC(rfc: string): Observable<any> {

    let params = new HttpParams();
    params = params.append('RFC', rfc);
  
    return this.http.get<any>(`${environment.SERVER_URL}/propietario-rfc`, {params: params})
    .pipe(map((res: Response) => {
  
        return res || {}
      }),
      catchError(this.handleError)
    ) 
  }

  //Consulta los datos de propietario
 getPropietarioVehiculo(IdPropietario: number, IdVehiculo: number): Observable<any> {

  let params = new HttpParams();
  params = params.append('IdPropietario', IdPropietario);
  params = params.append('IdVehiculo', IdVehiculo);

  return this.http.get<any>(`${environment.SERVER_URL}/propietario-vehiculo`, {params: params})
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
