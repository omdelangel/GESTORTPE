import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable, throwError, Subject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Incidente, CitasIncidente, DictamenCitaIncidente } from '../_models';

@Injectable({
  providedIn: 'root'
})
export class IncidenteService {

  SERVER_URL: string = `${environment.SERVER_URL}/evidencia-edicion`;  
  SERVER_URLSeguro: string = `${environment.SERVER_URL}/siniestro-edicion`;  
  SERVER_URLI: string = `${environment.SERVER_URL}/doc-incidente`;  


  constructor(private http: HttpClient) { }

  //Consulta Concesionario-Incidente
  getConcesionarioIncidente(Placa: string): Observable<any> {
    let params = new HttpParams();
    params = params.append('Placa', Placa);

    return this.http.get<any>(`${environment.SERVER_URL}/concesionario-incidente`, { params: params })
      .pipe(map((res: Response) => {

        return res || {}
      }),
        catchError(this.handleError)
      )
  }  

//Actualiza el siniestro para Concesionario-Incidente
postConcesionarioIncidenteSiniestro(IdVehiculo :number, IdTipoIncidente :string): Observable<any> {

  return this.http.post<any>(`${environment.SERVER_URL}/incidente-siniestro`, {
    'IdVehiculo'       : IdVehiculo,
    'IdTipoIncidente'  : IdTipoIncidente,

  })
  .pipe(map((res: Response) => {

      return res || {}
    }),
    catchError(this.handleError)
  )
}

//Registra la Cita para un incidente
postRegistraCitaIncidente(citasIncidente: CitasIncidente): Observable<any> {

  return this.http.post<any>(`${environment.SERVER_URL}/cita-incidente`, 
  {
    'IdIncidenteSiniestro'       :citasIncidente.IdIncidenteSiniestro     ,
    'Fecha'                      :citasIncidente.Fecha                    ,
    'IdTaller'                   :citasIncidente.IdTaller                 ,
    'IdCita'                     :citasIncidente.IdCita                   ,    
  })
  .pipe(map((res: Response) => { 

      return res || {}
    }),
    catchError(this.handleError)
  )
}


//Registra la Cita para un incidente
postModificaCitaIncidente(citasIncidente: CitasIncidente): Observable<any> {

  return this.http.post<any>(`${environment.SERVER_URL}/cita-incidente-modificacion`, 
  {
    'IdIncidenteSiniestro'       :citasIncidente.IdIncidenteSiniestro     ,
    'Fecha'                      :citasIncidente.Fecha                    ,
    'IdTaller'                   :citasIncidente.IdTaller                 ,
    'IdCita'                     :citasIncidente.IdCita                   ,    
  })
  .pipe(map((res: Response) => { 

      return res || {}
    }),
    catchError(this.handleError)
  )
}



//Registra la evidencia del siniestro
postGuardaEvidencias(formData: any): Observable<any> { 

  return this.http.post<any>(this.SERVER_URL, formData)
  .pipe(map((res: Response) => {

      return res || {}
    }),
    catchError(this.handleError)
  )
}

 //Consulta las evidencias
 getDocumentosEvidencia(idSiniestro: number): Observable<any> {

  let params = new HttpParams();
  params = params.append('IdSiniestro', idSiniestro);

  return this.http.get<any>(`${environment.SERVER_URL}/vehiculo-evidencias`, {params: params})
  .pipe(map((res: Response) => {

      return res || {}
    }),
    catchError(this.handleError)
  ) 
}

//Obtiene los datos de la cita de instalación
getCitaIncidente(idCita: number): Observable<any> {

  let params = new HttpParams();
  params = params.append('IdCita', idCita);

  return this.http.get<any>(`${environment.SERVER_URL}/cita-incidente-id`, {params: params})
  .pipe(map((res: Response) => {

      return res || {}
    }),
    catchError(this.handleError)
  )
}

//Cancela la Cita del Incidente
postCancelaCitaIncidente(IdIncidenteSiniestro: number, IdCita: number): Observable<any> {

  return this.http.post<any>(`${environment.SERVER_URL}/cita-incidente-cancelacion`, {'IdIncidenteSiniestro': IdIncidenteSiniestro, 
  'IdCita': IdCita})
  .pipe(map((res: Response) => { 

      return res || {}
    }),
    catchError(this.handleError)
  )
}


//Dictaminar la cita
postDictamenCitaIncidente(dictamenCitaIncidente: DictamenCitaIncidente): Observable<any> {

  return this.http.post<any>(`${environment.SERVER_URL}/cita-incidente-dictamen`, 
  {
    'IdCita'                :dictamenCitaIncidente.IdCita                  ,  
    'IdIncidenteSiniestro'  :dictamenCitaIncidente.IdIncidenteSiniestro    ,
    'IdDictamen'            :dictamenCitaIncidente.IdDictamen              ,
    'Observaciones'         :dictamenCitaIncidente.Observaciones           ,
    'ArchivoDictamen'       :dictamenCitaIncidente.ArchivoDictamen        
  })}


//Registra la fecha del arreglo
postRegistraFechaArreglo(idIncidenteSiniestro: string, fechaArreglo: string, tipoIncidente: string): Observable<any> {

  return this.http.post<any>(`${environment.SERVER_URL}/asignacion-fecha-arreglo`, {'IdIncidenteSiniestro': idIncidenteSiniestro, 
  'FechaArreglo': fechaArreglo, 'TipoIncidente': tipoIncidente})
  .pipe(map((res: Response) => { 

      return res || {}
    }),
    catchError(this.handleError)
  )
}


//Elimina la evidencia
postEliminaEvidencia(idSiniestro: number, idEvidencias: number): Observable<any> {


  return this.http.post<any>(`${environment.SERVER_URL}/vehiculo-evidencia`, { 
  'IdSiniestro': idSiniestro, 'IdEvidencias': idEvidencias})
  .pipe(map((res: Response) => { 

      return res || {}
    }),
    catchError(this.handleError)
  )
}

//Registra el dictamen del Seguro
postGuardaDocumentoSeguro(formData: any): Observable<any> { 

  return this.http.post<any>(this.SERVER_URLSeguro, formData)
  .pipe(map((res: Response) => {

      return res || {}
    }),
    catchError(this.handleError)
  )
}

//Consulta el dictamen del seguro
getDocumentoSeguro(idSiniestro: number, idVehiculo: number): Observable<any> {

  let params = new HttpParams();
  params = params.append('IdSiniestro', idSiniestro);
  params = params.append('IdVehiculo', idVehiculo);


  return this.http.get<any>(`${environment.SERVER_URL}/consulta-siniestro`, {params: params})
  .pipe(map((res: Response) => {

    return res || {}
  }),
  catchError(this.handleError)
)
}

    

 //Consulta las evidencias del dictamen del taller 
 getDoctosEvidenciaDictamenTaller(IdCita: number, IdIncidenteSiniestro: number): Observable<any> {

  let params = new HttpParams();
  params = params.append('IdCita', IdCita);
  params = params.append('IdIncidenteSiniestro', IdIncidenteSiniestro);

  return this.http.get<any>(`${environment.SERVER_URL}/doc-incidente-taller`, {params: params})
  .pipe(map((res: Response) => {

      return res || {}
    }),
    catchError(this.handleError)
  ) 
}


//Registra el archivo de un ditamen del taller para in Incidente
postGuardaEvidenciaDictamenTaller(formData: any): Observable<any> { 

  console.log("postGuardaEvidenciaDictamenTaller SErver")
  console.log(formData)
  return this.http.post<any>(this.SERVER_URLI, formData)
  .pipe(map((res: Response) => {

    return res || {}
    }),
    catchError(this.handleError)
  )
}

//Elimina la evidencia
postEliminaEvidenciaDictamenTaller(IdCita: number, IdIncidenteSiniestro: number): Observable<any> {


  return this.http.post<any>(`${environment.SERVER_URL}/doc-incidente-eliminacion`, { 
  'IdCita': IdCita, 
  'IdIncidenteSiniestro': IdIncidenteSiniestro})
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
