import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { CatalogoDictamenes, CatalogoUsuarios, UsuariosAltaEdicion, CatalogoTalleres, CatalogoEstaciones, CatalogoSindicato, Marca, Submarca, PreciosGas, PreciosGasolina, CatalogoAsignacionSindicato} from 'src/app/_models';

@Injectable({
  providedIn: 'root'
})
export class CatalogosService {

  SERVER_URLReg: string = `${environment.SERVER_URL}/Imagen-digitalizacion`;

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

    console.log()

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

//Llena catálogo de municipios
getCatalogoMunicipios(IdEntFed: number): Observable<any> {

  let params = new HttpParams();
  params = params.append('IdEntidadFederal', IdEntFed);  

  return this.http.get<any>(`${environment.SERVER_URL}/lMunicipios`, {params: params})
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

//Obtiene la información de la tabla de Usuarios
getCatalogoUsuarios(): Observable<any> {

  return this.http.get<any>(`${environment.SERVER_URL}/usuarios`, {})
  .pipe(map((res: Response) => {

      return res || {}
    }),
    catchError(this.handleError)
  )
}

//Obtiene la información de la tabla de Empleados (Cobradores)
getCatalogoCobradores(): Observable<any> {

  return this.http.get<any>(`${environment.SERVER_URL}/lSEmpleado`, {})
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

  //Registra usuarios
  postModificaUsuario(usuario: UsuariosAltaEdicion): Observable<any> {

    return this.http.post<any>(`${environment.SERVER_URL}/Modifica-Usuario`, {
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

//Obtiene lso valores de la tabla de Sindicatos
getCatalogoSindicato(): Observable<any> {

  return this.http.get<any>(`${environment.SERVER_URL}/sindicatos`, {})
  .pipe(map((res: Response) => {

      return res || {}
    }),
    catchError(this.handleError)
  )
}    

//Obtiene lso valores de la tabla de Estaciones
getCatalogoEstaciones(): Observable<any> {

  return this.http.get<any>(`${environment.SERVER_URL}/estaciones`, {})
  .pipe(map((res: Response) => {

      return res || {}
    }),
    catchError(this.handleError)
  )
}  

//Obtiene los valores de la tabla de Talleres
getCatalogoTalleres(): Observable<any> {

  return this.http.get<any>(`${environment.SERVER_URL}/talleres`, {})
  .pipe(map((res: Response) => {

      return res || {}
    }),
    catchError(this.handleError)
  )
}  


//Obtiene los valores de la tabla de Regiones
getCatalogoRegiones(): Observable<any> {

  return this.http.get<any>(`${environment.SERVER_URL}/lregiones`, {})
  .pipe(map((res: Response) => {

      return res || {}
    }),
    catchError(this.handleError)
  )
} 

//Obtiene los valores de la tabla de Tiposconvertidor
getCatalogoTipoConv(): Observable<any> {

  return this.http.get<any>(`${environment.SERVER_URL}/lconvertidores`, {})
  .pipe(map((res: Response) => {

      return res || {}
    }),
    catchError(this.handleError)
  )
} 

//Obtiene los valores de la tabla de Tiposconvertidor
getCatalogoTipoAsignacion(): Observable<any> {

  return this.http.get<any>(`${environment.SERVER_URL}/lTiposAsignacion`, {})
  .pipe(map((res: Response) => {

      return res || {}
    }),
    catchError(this.handleError)
  )
} 


  //Registra en tabla de Talleres
  postRegistraTaller(catalogoTalleres: CatalogoTalleres): Observable<any> {

    return this.http.post<any>(`${environment.SERVER_URL}/Alta-Taller`, {
      'IdTaller'               :catalogoTalleres.IdTaller,
      'Nombre'                 :catalogoTalleres.Nombre,
      'RFC'                    :catalogoTalleres.RFC,
      'Contacto'               :catalogoTalleres.Contacto,
      'Domicilio'              :catalogoTalleres.Domicilio,
      'IdColonia'              :catalogoTalleres.IdColonia,
      'Telefono'               :catalogoTalleres.Telefono,
      'HorarioIni'             :catalogoTalleres.HorarioIni,
      'HorarioFin'             :catalogoTalleres.HorarioFin,
      'Concurrencia'           :catalogoTalleres.Concurrencia,
      'DuracionCita'           :catalogoTalleres.DuracionCita,    
      'Estatus'                :catalogoTalleres.Estatus,    
    })
      .pipe(map((res: Response) => {

        return res || {}
      }),
        catchError(this.handleError)
      )
  }
  
  //Registra en tabla de Talleres
  postRegistraEstaciones(catalogoEstaciones: CatalogoEstaciones): Observable<any> {

    return this.http.post<any>(`${environment.SERVER_URL}/Alta-Estacion`, {
      'IdEstacion'              :catalogoEstaciones.IdEstacion      ,
      'Nombre'                  :catalogoEstaciones.Nombre          ,
      'Domicilio'               :catalogoEstaciones.Domicilio       ,
      'IdColonia'               :catalogoEstaciones.IdColonia       ,
      'Telefono'                :catalogoEstaciones.Telefono			  ,
      'Ubicacion'               :catalogoEstaciones.Ubicacion	      ,
      'Empresa'                 :catalogoEstaciones.Empresa		      ,
      'RFC'                     :catalogoEstaciones.RFC			        ,
      'Contacto'                :catalogoEstaciones.Contacto		    ,
      'Region'                  :catalogoEstaciones.Region				  ,
      'Estatus'                 :catalogoEstaciones.Estatus				  ,
      'TipoCombustible'         :catalogoEstaciones.TipoCombustible ,
      'ZonaFronteriza'          :catalogoEstaciones.ZonaFronteriza  ,
    })
      .pipe(map((res: Response) => {

        return res || {}
      }),
        catchError(this.handleError)
      )
  }


  //Registra en tabla de Sindicatos
  postRegistraSindicato(catalogoSindicato: CatalogoSindicato): Observable<any> {

    return this.http.post<any>(`${environment.SERVER_URL}/Alta-Sindicato`, {
      'IdSindicato'           : catalogoSindicato.IdSindicato      ,
      'Nombre'                : catalogoSindicato.Nombre           ,
      'Seccion'               : catalogoSindicato.Seccion          ,
      'Responsable'           : catalogoSindicato.Responsable      ,
      'Direccion'             : catalogoSindicato.Direccion        ,
      'IdRegion'              : catalogoSindicato.IdRegion         ,
      'IdTipoConvertidor'     : catalogoSindicato.IdTipoConvertidor,
      'Estatus'               : catalogoSindicato.Estatus          ,
    })
      .pipe(map((res: Response) => {

        return res || {}
      }),
        catchError(this.handleError)
      )
  }  

  //Registra en tabla de AsignacionSindicatos y Sindicatos
  postRegistraAsignacionSindicato(catalogoAsignacionSindicato: CatalogoAsignacionSindicato): Observable<any> {

    return this.http.post<any>(`${environment.SERVER_URL}/Alta-SindicTipAsig`, {
      'IdSindicato' 					          		:catalogoAsignacionSindicato.IdSindicato           							,
      'Nombre' 				                			:catalogoAsignacionSindicato.Nombre                							,
      'Seccion' 			    			          	:catalogoAsignacionSindicato.Seccion               							,
      'Responsable'           							:catalogoAsignacionSindicato.Responsable           							,
      'Direccion' 			            				:catalogoAsignacionSindicato.Direccion             							,
      'IdRegion' 					            	  	:catalogoAsignacionSindicato.IdRegion              							,
      'IdTipoConvertidor' 						    	:catalogoAsignacionSindicato.IdTipoConvertidor     							,
      'Estatus' 							              :catalogoAsignacionSindicato.Estatus               							,
      'IdTipoAsignacionA' 				  		  	:catalogoAsignacionSindicato.IdTipoAsignacionA     							,
      'PorcAhorroConcesionA' 			  				:catalogoAsignacionSindicato.PorcAhorroConcesionA  							,
      'PorcAhorroOperadorA' 		  					:catalogoAsignacionSindicato.PorcAhorroOperadorA   							,
      'PorcAhorroPropietarioA' 							:catalogoAsignacionSindicato.PorcAhorroPropietarioA							,
      'IdTipoAsignacionB' 			    				:catalogoAsignacionSindicato.IdTipoAsignacionB     							,
      'PorcAhorroConcesionB' 				  			:catalogoAsignacionSindicato.PorcAhorroConcesionB  							,
      'PorcAhorroOperadorB' 					  		:catalogoAsignacionSindicato.PorcAhorroOperadorB   							,
      'PorcAhorroPropietarioB' 							:catalogoAsignacionSindicato.PorcAhorroPropietarioB							,
      'IdTipoAsignacionC' 		    					:catalogoAsignacionSindicato.IdTipoAsignacionC     							,
      'PorcAhorroConcesionC' 			  				:catalogoAsignacionSindicato.PorcAhorroConcesionC  							,
      'PorcAhorroOperadorC' 				  			:catalogoAsignacionSindicato.PorcAhorroOperadorC   							,
      'PorcAhorroPropietarioC' 							:catalogoAsignacionSindicato.PorcAhorroPropietarioC							,
          })
      .pipe(map((res: Response) => {

        return res || {}
      }),
        catchError(this.handleError)
      )
  }  

  
  //Obtiene CP con base a la Colonia
  getObtenCP(IdColonia: any): Observable<any> {

  let params = new HttpParams();
  params = params.append('IdColonia', IdColonia);

  return this.http.get<any>(`${environment.SERVER_URL}/lColonia`, {params: params})
  .pipe(map((res: Response) => {

      return res || {}
    }),
    catchError(this.handleError)
  )
}


  //Modifica registro de Taller
  postModificaTaller(catalogoTalleres: CatalogoTalleres): Observable<any> {

    return this.http.post<any>(`${environment.SERVER_URL}/Modifica-Taller`, {
      'IdTaller'               :catalogoTalleres.IdTaller,
      'Nombre'                 :catalogoTalleres.Nombre,
      'RFC'                    :catalogoTalleres.RFC,
      'Contacto'               :catalogoTalleres.Contacto,
      'Domicilio'              :catalogoTalleres.Domicilio,
      'IdColonia'              :catalogoTalleres.IdColonia,
      'Telefono'               :catalogoTalleres.Telefono,
      'HorarioIni'             :catalogoTalleres.HorarioIni,
      'HorarioFin'             :catalogoTalleres.HorarioFin,
      'Concurrencia'           :catalogoTalleres.Concurrencia,
      'DuracionCita'           :catalogoTalleres.DuracionCita,    
      'Estatus'                :catalogoTalleres.Estatus,     
    })
      .pipe(map((res: Response) => {

        return res || {}
      }),
        catchError(this.handleError)
      )
  }



  //Modifica registro de Taller
  postModificaEstacion(catalogoEstaciones: CatalogoEstaciones): Observable<any> {
  
    return this.http.post<any>(`${environment.SERVER_URL}/Modifica-Estacion`, {
      'IdEstacion'        :catalogoEstaciones.IdEstacion ,
      'Nombre'            :catalogoEstaciones.Nombre     ,
      'Domicilio'         :catalogoEstaciones.Domicilio  ,
      'IdColonia'         :catalogoEstaciones.IdColonia  ,
      'Telefono'          :catalogoEstaciones.Telefono   ,
      'Ubicacion'         :catalogoEstaciones.Ubicacion  ,
      'Empresa'           :catalogoEstaciones.Empresa    ,
      'RFC'               :catalogoEstaciones.RFC        ,
      'Contacto'          :catalogoEstaciones.Contacto   ,
      'Region'            :catalogoEstaciones.Region     ,
      'Estatus'           :catalogoEstaciones.Estatus    ,  
      'TipoCombustible'   :catalogoEstaciones.TipoCombustible ,
      'ZonaFronteriza'    :catalogoEstaciones.ZonaFronteriza  ,

    })
      .pipe(map((res: Response) => {
  
        return res || {}
      }),
        catchError(this.handleError)
      )
  }  
  
  //Modifica Sindicatos usuarios
  postModificaSindicato(catalogoSindicato: CatalogoSindicato): Observable<any> {

    return this.http.post<any>(`${environment.SERVER_URL}/Modifica-Sindicato`, {
      'IdSindicato'           : catalogoSindicato.IdSindicato      ,
      'Nombre'                : catalogoSindicato.Nombre           ,
      'Seccion'               : catalogoSindicato.Seccion          ,
      'Responsable'           : catalogoSindicato.Responsable      ,
      'Direccion'             : catalogoSindicato.Direccion        ,
      'IdRegion'              : catalogoSindicato.IdRegion         ,
      'IdTipoConvertidor'     : catalogoSindicato.IdTipoConvertidor,
      'Estatus'               : catalogoSindicato.Estatus          ,   
    })
      .pipe(map((res: Response) => {

        return res || {}
      }),
        catchError(this.handleError)
      )
  }

//Llena catálogo de marcas
getCatalogoMarca(): Observable<any> {
  return this.http.get<any>(`${environment.SERVER_URL}/lMarcas`)
  .pipe(map((res: Response) => {

      return res || {}
    }),
    catchError(this.handleError)
  )
}  


  //Obtiene Catálogo de Marcas/Submarcas de una Marca en específico
getCatalogoMarcaSub(Marca: any): Observable<any> {

    let params = new HttpParams();
    params = params.append('IdMarca', Marca);
  
    return this.http.get<any>(`${environment.SERVER_URL}/Marca-Submarca`, {params: params})
    .pipe(map((res: Response) => {
  
        return res || {}
      }),
      catchError(this.handleError)
    )
}

  //Obtiene  Catálogo de Marcas/Submarcas de toda la información de las tablas
  getCatalogoMarcaSubmarca(): Observable<any> {
    console.log("getCatalogoMarcaSubmarca")

    return this.http.get<any>(`${environment.SERVER_URL}/Marca-SubmarcaCMPX`)
    .pipe(map((res: Response) => {
  
      console.log("RES")
      console.log(res)
        return res || {}

      }),
      catchError(this.handleError)
    )
}


  //Registra en tabla de Marcas
  postRegistraMarca(marca: Marca): Observable<any> {

    return this.http.post<any>(`${environment.SERVER_URL}/Alta-Marca`, {
      'IdMarca'               : marca.IdMarca                   ,
      'Nombre'                : marca.Nombre                    ,
      'Estatus'               : marca.Estatus                   ,
    })
      .pipe(map((res: Response) => {

        return res || {}
      }),
        catchError(this.handleError)
      )
  } 

  //Registra en tabla de Submarcas
  postRegistraSubmarca(submarca: Submarca): Observable<any> {

    return this.http.post<any>(`${environment.SERVER_URL}/Alta-SubMarca`, {
      'IdSubmarca'            : submarca.IdSubmarca                ,
      'IdMarca'               : submarca.IdMarca                   ,
      'Nombre'                : submarca.Nombre                    ,
      'TipoVehiculo'          : submarca.TipoVehiculo              ,
      'Estatus'               : submarca.Estatus                   ,
    })
      .pipe(map((res: Response) => {

        return res || {}
      }),
        catchError(this.handleError)
      )
  } 
  
  //Registra en tabla de Submarcas
  postModificaSubmarca(submarca: Submarca): Observable<any> {

    return this.http.post<any>(`${environment.SERVER_URL}/Modifica-SubMarca`, {
      'IdSubmarca'            : submarca.IdSubmarca                ,
      'IdMarca'               : submarca.IdMarca                   ,
      'Nombre'                : submarca.Nombre                    ,
      'TipoVehiculo'          : submarca.TipoVehiculo              ,
      'Estatus'               : submarca.Estatus                   ,
    })
      .pipe(map((res: Response) => {

        return res || {}
      }),
        catchError(this.handleError)
      )
  } 


  //Obtiene Catálogo de Marcas/Submarcas de una Marca en específico
  getCatalogoSubmarca(Marca: any): Observable<any> {

    let params = new HttpParams();
    params = params.append('IdMarca', Marca);
  
    return this.http.get<any>(`${environment.SERVER_URL}/lSubMarcas`, {params: params})
    .pipe(map((res: Response) => {
  
        return res || {}
      }),
      catchError(this.handleError)
    )
}  

  
  //Registra en tabla de Submarcas
  postModificaMarca(submarca: Submarca): Observable<any> {
    return this.http.post<any>(`${environment.SERVER_URL}/Modifica-Marca`, {
      'IdMarca'               : submarca.IdMarca                   ,
      'Nombre'                : submarca.Nombre                    ,
      'Estatus'               : submarca.Estatus                   ,
    })
      .pipe(map((res: Response) => {

        return res || {}
      }),
        catchError(this.handleError)
      )
  } 

//Guarda los documentos de la pantalla de Registro
postGuardaImagenRegistro(formData: any): Observable<any> {  

  return this.http.post<any>(this.SERVER_URLReg, formData)
  .pipe(map((res: Response) => {

      return res || {}
    }),
    catchError(this.handleError)
  )
}



  //Registra en tabla de Precios Gas
  postRegistraPreciosGas(preciosGas: PreciosGas): Observable<any> {

    return this.http.post<any>(`${environment.SERVER_URL}/Alta-Hgas`, {
      'IdHistoricoGas'          :preciosGas.IdHistoricoGas          ,
      'FechaAlta'               :preciosGas.FechaAlta               ,
      'FechaDesde'              :preciosGas.FechaDesde              ,
      'FechaHasta'              :preciosGas.FechaHasta              ,
      'IdEntidadFederal'        :preciosGas.IdEntidadFederal        ,
      'IdMunicipio'             :preciosGas.IdMunicipio             ,
      'PrecioKg'                :preciosGas.PrecioKg                ,
      'PrecioLtr'               :preciosGas.PrecioLtr               ,
      'NombreE'                 :preciosGas.NombreE                 ,  
      'NombreM'                 :preciosGas.NombreM                 , 
    })
      .pipe(map((res: Response) => {

        return res || {}
      }),
        catchError(this.handleError)
      )
  } 

  //Registra en tabla de Precios Gas
  postRegistraPreciosGasolina(preciosGasolina: PreciosGasolina): Observable<any> {

    return this.http.post<any>(`${environment.SERVER_URL}/Alta-Hgasolina`, {
      'IdHistoricoGasolina'     :preciosGasolina.IdHistoricoGasolina     ,
      'FechaAlta'               :preciosGasolina.FechaAlta               ,
      'FechaDesde'              :preciosGasolina.FechaDesde              ,
      'FechaHasta'              :preciosGasolina.FechaHasta              ,
      'IdEntidadFederal'        :preciosGasolina.IdEntidadFederal        ,
      'IdMunicipio'             :preciosGasolina.IdMunicipio             ,
      'PrecioLtr'               :preciosGasolina.PrecioLtr               ,
      'NombreE'                 :preciosGasolina.NombreE                 ,  
      'NombreM'                 :preciosGasolina.NombreM                 , 
    })
      .pipe(map((res: Response) => {

        return res || {}
      }),
        catchError(this.handleError)
      )
  }   
}
