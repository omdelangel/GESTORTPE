import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable, throwError, Subject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { ConcesionarioAltaEdicion } from '../_models';


@Injectable({
  providedIn: 'root'
})
export class ConcesionarioService {

  private subject = new Subject<any>();
  constructor(private http: HttpClient) { }

  //Observable para mostrar y ocultar la pestaña de propietarios
  sendView(isView: boolean) {
    this.subject.next({ text: isView });
  }
  onView(): Observable<any> {
    return this.subject.asObservable();
  }

  //Observable para obtener el idConcesionario
  sendIdConce(isView: number, nombre: string) {
    this.subject.next({ idConcesionario: isView, nombreConce: nombre});
  }
  onIdConce(): Observable<any> {
    return this.subject.asObservable();
  }

   //Observable para obtener el idVehiculo para la edición
   sendIdConceVehi(idConce: number, idVehi: number) {
    this.subject.next({ idConcesionario: idConce, idVehiculo: idVehi});
  }
  onIdConceVehi(): Observable<any> {
    return this.subject.asObservable();
  }

  //Consulta los datos de Concesionario para la reimpresión del QR
  getConcesionarioQR(placa: string): Observable<any> {

    let params = new HttpParams();
    params = params.append('Placa', placa);

    return this.http.get<any>(`${environment.SERVER_URL}/impresion-qr`, { params: params })
      .pipe(map((res: Response) => {

        return res || {}
      }),
        catchError(this.handleError)
      )
  }


  //Consulta los datos de Concesionario para la pantalla de Preregistro
  getPreRegConcesionario(): Observable<any> {   

    return this.http.get<any>(`${environment.SERVER_URL}/concesionario-prerregistro`)
      .pipe(map((res: Response) => {    

        return res || {}
      }),
        catchError(this.handleError)
      )
  }

   //Consulta los datos de Concesionario para la pantalla de Registro
   getRegistroConcesionario(): Observable<any> {   

    return this.http.get<any>(`${environment.SERVER_URL}/concesionario-registro`)
      .pipe(map((res: Response) => {    

        return res || {}
      }),
        catchError(this.handleError)
      )
  }

   //Consulta los datos de Concesionario para la pantalla de Verificación
   getConcesionarioVerifica(): Observable<any> {   

    return this.http.get<any>(`${environment.SERVER_URL}/concesionario-verificacion`)
      .pipe(map((res: Response) => {    

        return res || {}
      }),
        catchError(this.handleError)
      )
  }


  //Registra concesionarios
  postRegistraConcesionario(concesionario: ConcesionarioAltaEdicion): Observable<any> {

    return this.http.post<any>(`${environment.SERVER_URL}/concesionario-edicion`, {
      'IdConcesionario': concesionario.IdConcesionario,
      'Nombre': concesionario.Nombre, 'Paterno': concesionario.Paterno, 'Materno': concesionario.Materno, 'RFC': concesionario.RFC,
      'CURP': concesionario.CURP, 'FechaNacimiento': concesionario.FechaNacimiento, 'TipoPersona': concesionario.TipoPersona,
      'Genero': concesionario.Genero, 'EstadoCivil': concesionario.EstadoCivil, 'Calle': concesionario.Calle,
      'Exterior': concesionario.Exterior, 'Interior': concesionario.Interior, 'IdColonia': concesionario.IdColonia, 'Telefono': concesionario.Telefono,
      'Celular': concesionario.Celular, 'email': concesionario.email, 'IdIdentificacion': concesionario.IdIdentificacion, 'FolioIdentificacion': concesionario.FolioIdentificacion,
      'IdSindicato': concesionario.IdSindicato, 'IdAsignacionSindicato': concesionario.IdAsignacionSindicato, 'NumeroConcesion': concesionario.NumeroConcesion,
    })
      .pipe(map((res: Response) => {

        return res || {}
      }),
        catchError(this.handleError)
      )
  }


  //Verifica si el RFC del concesionario ya existe
  getConsecionarioRFC(rfc: string): Observable<any> {

    let params = new HttpParams();
    params = params.append('RFC', rfc);

    return this.http.get<any>(`${environment.SERVER_URL}/concesionario-rfc`, { params: params })
      .pipe(map((res: Response) => {

        return res || {}
      }),
        catchError(this.handleError)
      )
  }

  //Consulta los datos de concesionario para la edición
  getConsecionarioVehiculo(IdConcesionario: number, IdVehiculo: number): Observable<any> {

    let params = new HttpParams();
    params = params.append('IdConcesionario', IdConcesionario);
    params = params.append('IdVehiculo', IdVehiculo);

    return this.http.get<any>(`${environment.SERVER_URL}/concesionario-vehiculo`, { params: params })
      .pipe(map((res: Response) => {

        return res || {}
      }),
        catchError(this.handleError)
      )
  }

     //Consulta los datos de Concesionario para la instalación del convertidor
     getConcesionarioInstalacion(): Observable<any> {   

      return this.http.get<any>(`${environment.SERVER_URL}/concesionario-instalacion`)
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
