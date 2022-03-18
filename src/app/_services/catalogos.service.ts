import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { CatalogoDictamenes, CatalogoUsuarios, UsuariosAltaEdicion } from 'src/app/_models';

@Injectable({
  providedIn: 'root'
})
export class CatalogosService {

  constructor(private http: HttpClient) {}


//Llena catálogo de Sindicatos
getCatalogoSindicatos(): Observable<any> {
  return this.http.get<any>(`${environment.SERVER_URL}/sindicatos-lista`)
  .pipe(map((res: Response) => {

      return res || {}
    }),
    catchError(this.handleError)
  )
}




//Llena catálogo Tipos de Asignación
getCatalogoTposAsignacion(sindicato: any): Observable<any> {

  let params = new HttpParams();
  params = params.append('IdSindicato', sindicato);

  return this.http.get<any>(`${environment.SERVER_URL}/tipos-asignacion-lista`, {params: params})
  .pipe(map((res: Response) => {

      return res || {}
    }),
    catchError(this.handleError)
  )
}


//Llena catálogo de Perfiles
getCatalogoPerfiles(): Observable<any> {
  return this.http.get<any>(`${environment.SERVER_URL}/perfiles`)
  .pipe(map((res: Response) => {

      return res || {}
    }),
    catchError(this.handleError)
  )
}

//consulta por CP
getConsultaCP(cp: any): Observable<any> {

  let params = new HttpParams();
  params = params.append('CP', cp);

  return this.http.get<any>(`${environment.SERVER_URL}/cp-asentamientos`, {params: params})
  .pipe(map((res: Response) => {

      return res || {}
    }),
    catchError(this.handleError)
  )
}

//Llena catálogo de tipos de identificación
getCatalogoIdentificacion(): Observable<any> {
  return this.http.get<any>(`${environment.SERVER_URL}/identificaciones-lista`)
  .pipe(map((res: Response) => {

      return res || {}
    }),
    catchError(this.handleError)
  )
}

//Llena catálogo de marcas
getCatalogoMarcas(): Observable<any> {
  return this.http.get<any>(`${environment.SERVER_URL}/marcas-lista`)
  .pipe(map((res: Response) => {

      return res || {}
    }),
    catchError(this.handleError)
  )
}

//Llena catálogo de submarcas
getCatalogoSubmarcas(marca: number): Observable<any> {

  let params = new HttpParams();
  params = params.append('IdMarca', marca);

  return this.http.get<any>(`${environment.SERVER_URL}/submarcas-lista`, {params: params})
  .pipe(map((res: Response) => {

      return res || {}
    }),
    catchError(this.handleError)
  )
}

//Llena catálogo de submarcas
getCatalogoDictamen(): Observable<any> {

  return this.http.get<any>(`${environment.SERVER_URL}/dictamen-lista`)
  .pipe(map((res: Response) => {

      return res || {}
    }),
    catchError(this.handleError)
  )
}

//Llena catálogo de entidades
getCatalogoEntidades(): Observable<any> {
  return this.http.get<any>(`${environment.SERVER_URL}/entidades`)
  .pipe(map((res: Response) => {

      return res || {}
    }),
    catchError(this.handleError)
  )
}

//Consulta los precios del gas
getPreciosGas(fechaDesde: string, fechaHasta: string, idEntidadFederal: string): Observable<any> {

  let params = new HttpParams();
  params = params.append('FechaDesde', fechaDesde);
  params = params.append('FechaHasta', fechaHasta);
  params = params.append('IdEntidadFederal', idEntidadFederal);

  return this.http.get<any>(`${environment.SERVER_URL}/hgas`, {params: params})
  .pipe(map((res: Response) => {

      return res || {}
    }),
    catchError(this.handleError)
  )
}


//Consulta los precios del gas
getPreciosGasolina(fechaDesde: string, fechaHasta: string, idEntidadFederal: string): Observable<any> {

  let params = new HttpParams();
  params = params.append('FechaDesde', fechaDesde);
  params = params.append('FechaHasta', fechaHasta);
  params = params.append('IdEntidadFederal', idEntidadFederal);

  return this.http.get<any>(`${environment.SERVER_URL}/hgasolina`, {params: params})
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

//Obtiene la información existente en la tabla de Dictámenes
getCatalogoDictamenes(): Observable<any> {

  return this.http.get<any>(`${environment.SERVER_URL}/cat-dictamenes`, {})
  .pipe(map((res: Response) => {

      return res || {}
    }),
    catchError(this.handleError)
  )
}

//Actualiza el estatus de Activo/Inactivo de la información de la tabla de Dictámenes
actualizaCatalogoDictamen(catalogoDictamenes: CatalogoDictamenes): Observable<any> {

  return this.http.post<any>(`${environment.SERVER_URL}/cat-dictamen`, {
    'IdDictamen': catalogoDictamenes.IdDictamen,
    'Estatus': catalogoDictamenes.Estatus,
  })
  .pipe(map((res: Response) => {

      return res || {}
    }),
    catchError(this.handleError)
  )
}

//Actualiza el valor de la columna Bloqueado de la información de la tabla de Usuarios
getCatalogoUsuarios(): Observable<any> {

  return this.http.get<any>(`${environment.SERVER_URL}/usuarios`, {})
  .pipe(map((res: Response) => {

      return res || {}
    }),
    catchError(this.handleError)
  )
}


//Actualiza el valor de la columna Bloqueado de la información de la tabla de Usuarios
getCatUsuBloqueado(catalogoUsuarios: CatalogoUsuarios): Observable<any> {

  return this.http.post<any>(`${environment.SERVER_URL}/Bloquea-Usuario`, {
    'IdUsuario': catalogoUsuarios.IdUsuario,
    'Bloqueado': catalogoUsuarios.Bloqueado,

  })
  .pipe(map((res: Response) => {

      return res || {}
    }),
    catchError(this.handleError)
  )
}

  //Registra usuarios
  postRegistraUsuario(usuario: UsuariosAltaEdicion): Observable<any> {

    return this.http.post<any>(`${environment.SERVER_URL}/Alta-Usuario`, {
      'IdUsuario'        :usuario.IdUsuario,
      'Nombre'           :usuario.Nombre,
      'Contrasenia'      :usuario.Contrasenia,
      'IdEmpleado'       :usuario.IdEmpleado,
      'IdPerfil'         :usuario.IdPerfil,
      'FechaRegistro'    :usuario.FechaRegistro,
      'Estatus'          :usuario.Estatus,
      'email'            :usuario.email,
      'Bloqueado'        :usuario.Bloqueado,
      'Intentos'         :usuario.Intentos,
      'UltimaTransaccion':usuario.UltimaTransaccion,    
    })
      .pipe(map((res: Response) => {

        return res || {}
      }),
        catchError(this.handleError)
      )
  }

}
