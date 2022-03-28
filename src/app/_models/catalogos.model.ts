import { Time } from "@angular/common";

export class CatalogoSindicatos {
    IdSindicato: number;
    Nombre: string;

    constructor(catalogoGeneral: { IdSindicato: number; Nombre: string}){
        this.IdSindicato = catalogoGeneral.IdSindicato;
        this.Nombre = catalogoGeneral.Nombre; 
    }    
}

export class CatalogoTpoAsignacion {
    IdAsignacionSindicato: number;
    AsignacionSindicato: string;

    constructor(catalogoGeneral: { IdAsignacionSindicato: number; AsignacionSindicato: string}){
        this.IdAsignacionSindicato = catalogoGeneral.IdAsignacionSindicato;
        this.AsignacionSindicato = catalogoGeneral.AsignacionSindicato; 
    }    
}

export class CatalogoDictamenes {
    IdDictamen    :string;
    Nombre        :string;
    Estatus       :boolean;    

    constructor(catalogoGeneral: {  IdDictamen    : string; 
                                    Nombre        : string; 
                                    Estatus       : boolean
                                }){
        this.IdDictamen      = catalogoGeneral.IdDictamen;
        this.Nombre          = catalogoGeneral.Nombre; 
        this.Estatus         = catalogoGeneral.Estatus; 
    }    
}

export class CatalogoRegiones {
    IdRegion      :number;
    Nombre        :string;
    Estatus       :boolean;    

    constructor(catalogoRegiones: { IdRegion      :number; 
                                    Nombre        :string; 
                                    Estatus       :boolean
                                }){
        this.IdRegion        = catalogoRegiones.IdRegion;
        this.Nombre          = catalogoRegiones.Nombre; 
        this.Estatus         = catalogoRegiones.Estatus; 
    }    
}

export class CatalogoTipoConvertidor {
    IdTipoConvertidor   :number;
    Descripcion         :string;
    Costo               :number;    
    Marca               :string;
    ConsumoRequerido    :number;

    constructor(catalogoTipoConvertidor: { 
        IdTipoConvertidor   :number;
        Descripcion         :string;
        Costo               :number;    
        Marca               :string;
        ConsumoRequerido    :number;
                                }){
        this.IdTipoConvertidor    = catalogoTipoConvertidor.IdTipoConvertidor  ;
        this.Descripcion          = catalogoTipoConvertidor.Descripcion        ;
        this.Costo                = catalogoTipoConvertidor.Costo              ;
        this.Marca                = catalogoTipoConvertidor.Marca              ;
        this.ConsumoRequerido     = catalogoTipoConvertidor.ConsumoRequerido   ;
    }    
}

export class CatalogoPerfiles {
    IdPerfil         :number;
    Descripcion      :string;
    FechaRegistro    :Date;    
    Estatus          :string;    


    constructor(catalogoGeneral: { IdPerfil         :number;
                                   Descripcion      :string;
                                   FechaRegistro    :Date;    
                                   Estatus          :string;    
    
                                }){
        this.IdPerfil          = catalogoGeneral.IdPerfil;
        this.Descripcion       = catalogoGeneral.Descripcion; 
        this.FechaRegistro     = catalogoGeneral.FechaRegistro; 
        this.Estatus           = catalogoGeneral.Estatus; 
    }    
}


export class UsuariosAltaEdicion {
    IdUsuario        :string;
    Nombre           :string;
    Contrasenia      :string;
    IdEmpleado       :number;
    IdPerfil         :number;
    FechaRegistro    :string;
    Estatus          :string;
    email            :string;
    Bloqueado        :boolean;
    Intentos         :number;
    UltimaTransaccion:string;

    constructor(usuariosAltaEdicion: { IdUsuario        :string; 
                                   Nombre           :string; 
                                   Contrasenia      :string; 
                                   IdEmpleado       :number; 
                                   IdPerfil         :number; 
                                   FechaRegistro    :string; 
                                   Estatus          :string; 
                                   email            :string; 
                                   Bloqueado        :boolean; 
                                   Intentos         :number; 
                                   UltimaTransaccion:string;
    }){
        this.IdUsuario             = usuariosAltaEdicion.IdUsuario        ; 
        this.Nombre                = usuariosAltaEdicion.Nombre           ; 
        this.Contrasenia           = usuariosAltaEdicion.Contrasenia      ; 
        this.IdEmpleado            = usuariosAltaEdicion.IdEmpleado       ; 
        this.IdPerfil              = usuariosAltaEdicion.IdPerfil         ; 
        this.FechaRegistro         = usuariosAltaEdicion.FechaRegistro    ; 
        this.Estatus               = usuariosAltaEdicion.Estatus          ; 
        this.email                 = usuariosAltaEdicion.email            ; 
        this.Bloqueado             = usuariosAltaEdicion.Bloqueado        ; 
        this.Intentos              = usuariosAltaEdicion.Intentos         ; 
        this.UltimaTransaccion     = usuariosAltaEdicion.UltimaTransaccion; 
    }    
}

export class CatalogoUsuarios {
    IdUsuario        :string;
    Nombre           :string;
    Contrasenia      :string;
    IdEmpleado       :number;
    IdPerfil         :number;
    Perfil           :string;
    FechaRegistro    :Date;
    Estatus          :string;
    email            :string;
    Bloqueado        :number;
    Intentos         :number;
    UltimaTransaccion:Date;

    constructor(catalogoUsuarios: { IdUsuario        :string; 
                                   Nombre           :string; 
                                   Contrasenia      :string; 
                                   IdEmpleado       :number; 
                                   IdPerfil         :number; 
                                   Perfil           :string;
                                   FechaRegistro    :Date; 
                                   Estatus          :string; 
                                   email            :string; 
                                   Bloqueado        :number; 
                                   Intentos         :number; 
                                   UltimaTransaccion:Date;
    }){
        this.IdUsuario             = catalogoUsuarios.IdUsuario        ; 
        this.Nombre                = catalogoUsuarios.Nombre           ; 
        this.Contrasenia           = catalogoUsuarios.Contrasenia      ; 
        this.IdEmpleado            = catalogoUsuarios.IdEmpleado       ; 
        this.IdPerfil              = catalogoUsuarios.IdPerfil         ; 
        this.Perfil                = catalogoUsuarios.Perfil           ; 
        this.FechaRegistro         = catalogoUsuarios.FechaRegistro    ; 
        this.Estatus               = catalogoUsuarios.Estatus          ; 
        this.email                 = catalogoUsuarios.email            ; 
        this.Bloqueado             = catalogoUsuarios.Bloqueado        ; 
        this.Intentos              = catalogoUsuarios.Intentos         ; 
        this.UltimaTransaccion     = catalogoUsuarios.UltimaTransaccion; 
    }    
}

export class CatalogoSindicato {
    IdSindicato            :number;
    Nombre                 :string;
    Seccion                :string;
    Responsable            :string;
    Direccion              :string;
    IdRegion               :number;
    IdTipoConvertidor      :number;
    Estatus                :string;

    constructor(catalogoSindicato: {
                                    IdSindicato            :number;
                                    Nombre                 :string;
                                    Seccion                :string;
                                    Responsable            :string;
                                    Direccion              :string;
                                    IdRegion               :number;
                                    IdTipoConvertidor      :number;
                                    Estatus                :string;
    }){
        this.IdSindicato            = catalogoSindicato.IdSindicato        ;
        this.Nombre                 = catalogoSindicato.Nombre             ;
        this.Seccion                = catalogoSindicato.Seccion            ;
        this.Responsable            = catalogoSindicato.Responsable        ;
        this.Direccion              = catalogoSindicato.Direccion          ;
        this.IdRegion               = catalogoSindicato.IdRegion           ;
        this.IdTipoConvertidor      = catalogoSindicato.IdTipoConvertidor  ;
        this.Estatus                = catalogoSindicato.Estatus            ;        
    }    
}

export class CatalogoEstaciones {
    IdEstacion                    :number;
    Nombre                        :string;
    Domicilio                     :string;
    Colonia                       :string;
    CP	                          :string;
    IdEntidadFederal              :string;
    IdMunicipio				      :string;
    Telefono					  :string;
    Ubicacion	                  :string;
    Empresa		                  :string;
    RFC			                  :string;
    Contacto		              :string;
    Region					      :string;
    Estatus					      :string;

    constructor(catalogoEstaciones: {
                                        IdEstacion                    :number;
                                        Nombre                        :string;
                                        Domicilio                     :string;
                                        Colonia                       :string;
                                        CP	                          :string;
                                        IdEntidadFederal              :string;
                                        IdMunicipio				      :string;
                                        Telefono					  :string;
                                        Ubicacion	                  :string;
                                        Empresa		                  :string;
                                        RFC			                  :string;
                                        Contacto		              :string;
                                        Region					      :string;
                                        Estatus					      :string;    
    }){
        this.IdEstacion               = catalogoEstaciones.IdEstacion           ;
        this.Nombre                   = catalogoEstaciones.Nombre               ;
        this.Domicilio                = catalogoEstaciones.Domicilio            ;
        this.Colonia                  = catalogoEstaciones.Colonia              ;
        this.CP	                      = catalogoEstaciones.CP	                ;
        this.IdEntidadFederal         = catalogoEstaciones.IdEntidadFederal     ;
        this.IdMunicipio			  = catalogoEstaciones.IdMunicipio		    ;
        this.Telefono				  = catalogoEstaciones.Telefono			    ;
        this.Ubicacion	              = catalogoEstaciones.Ubicacion	        ;
        this.Empresa		          = catalogoEstaciones.Empresa		        ;
        this.RFC			          = catalogoEstaciones.RFC			        ;
        this.Contacto		          = catalogoEstaciones.Contacto		        ;
        this.Region					  = catalogoEstaciones.Region			    ;
        this.Estatus				  = catalogoEstaciones.Estatus			    ;                
    }    
}

export class CatalogoTalleres {
    IdTaller                      :number;
    Nombre                        :string;
    RFC                           :string;
    Contacto                      :string;
    Domicilio	                  :string;
    IdColonia                     :string;
    Telefono					  :string;
    HorarioIni                    :Time;
    HorarioFin		              :Time;
    Concurrencia			      :string;
    DuracionCita		          :Time;
    Estatus					      :string;
    constructor(catalogoTalleres: {
                                    IdTaller                      :number;
                                    Nombre                        :string;
                                    RFC                           :string;
                                    Contacto                      :string;
                                    Domicilio	                  :string;
                                    IdColonia                     :string;
                                    Telefono					  :string;
                                    HorarioIni                    :Time;
                                    HorarioFin		              :Time;
                                    Concurrencia			      :string;
                                    DuracionCita		          :Time;
                                    Estatus					      :string;
        }){
            this.IdTaller     				= catalogoTalleres.IdTaller            ;
            this.Nombre       				= catalogoTalleres.Nombre              ;
            this.RFC          				= catalogoTalleres.RFC                 ;
            this.Contacto     				= catalogoTalleres.Contacto            ;
            this.Domicilio	  				= catalogoTalleres.Domicilio	       ;
            this.IdColonia    				= catalogoTalleres.IdColonia           ;
            this.Telefono		  			= catalogoTalleres.Telefono		       ;
            this.HorarioIni   				= catalogoTalleres.HorarioIni          ;
            this.HorarioFin	  				= catalogoTalleres.HorarioFin	       ;
            this.Concurrencia 				= catalogoTalleres.Concurrencia        ;
            this.DuracionCita 				= catalogoTalleres.DuracionCita        ;
            this.Estatus					= catalogoTalleres.Estatus			   ;                           
    }    
}


export class CP {
    Municipio: string;
    EntidadFederativa: string;
    asentamientos: Asentamientos[] = [];

    constructor(cp: {  
        Municipio: string;
        EntidadFederativa: string;}){
            this.Municipio = cp.Municipio;
            this.EntidadFederativa = cp.EntidadFederativa;
        }
}

export class Asentamientos {
    IdColonia: string = "";
    Colonia: string = "";
}

export class Identificaciones {
    IdIdentificacion: number = 0;
    Nombre: string = "";
    Enmisor: string = "";
}

export class Marcas {
    IdMarca: number = 0;
    Nombre: string = "";
}

export class Submarcas {
    IdSubmarca: number = 0;
    Nombre: string = "";
}

export class Dictamen {
    IdDictamen: number = 0;
    Nombre: string = "";
}

export class Entidades {
    IdEntidadFederal: string;
    Nombre: string;
    Abreviacion: string;
    constructor(entidades: {
        IdEntidadFederal: string;
        Nombre: string;
        Abreviacion: string;
    }) {
        this.IdEntidadFederal = entidades.IdEntidadFederal;
        this.Nombre = entidades.Nombre;
        this.Abreviacion = entidades.Abreviacion;
    }
}

export class Municipios {
    IdEntidadFederal: string;
    IdMunicipio: string;
    Nombre: string;
    Abreviacion: string;
    IdRegion: number;
    constructor(municipios: {
        IdEntidadFederal: string;
        IdMunicipio: string;
        Nombre: string;
        Abreviacion: string;
        IdRegion: number;
    }) {
        this.IdEntidadFederal = municipios.IdEntidadFederal;
        this.IdMunicipio = municipios.IdMunicipio;
        this.Nombre = municipios.Nombre;
        this.Abreviacion = municipios.Abreviacion;
        this.IdRegion = municipios.IdRegion;
    }
}

export class PreciosGas { 
    IdHistoricoGas: number;
    FechaAlta: string;
    FechaDesde: string;
    FechaHasta: string;
    IdEntidadFederal: string;
    IdMunicipio: string;
    PrecioKg: number;
    PrecioLtr: number;
    NombreE: string;
    NombreM: string;
    constructor(preciosGas: {
        IdHistoricoGas: number;
        FechaAlta: string;
        FechaDesde: string;
        FechaHasta: string;
        IdEntidadFederal: string;
        IdMunicipio: string;
        PrecioKg: number;
        PrecioLtr: number;
        NombreE: string;
        NombreM: string;
    }) {
        this.IdHistoricoGas = preciosGas.IdHistoricoGas;
        this.FechaAlta = preciosGas.FechaAlta;
        this.FechaDesde = preciosGas.FechaDesde;
        this.FechaHasta = preciosGas.FechaHasta;
        this.IdEntidadFederal = preciosGas.IdEntidadFederal;
        this.IdMunicipio = preciosGas.IdMunicipio;
        this.PrecioKg = preciosGas.PrecioKg;
        this.PrecioLtr = preciosGas.PrecioLtr;
        this.NombreE = preciosGas.NombreE;
        this.NombreM = preciosGas.NombreM;
    }

}


export class PreciosGasolina { 
    IdHistoricoGasolina: number;
    FechaAlta: string;
    FechaDesde: string;
    FechaHasta: string;
    IdEntidadFederal: string;
    IdMunicipio: string;
    PrecioLtr: number;
    NombreE: string;
    NombreM: string;
    constructor(preciosGasolina: {
        IdHistoricoGasolina: number;
        FechaAlta: string;
        FechaDesde: string;
        FechaHasta: string;
        IdEntidadFederal: string;
        IdMunicipio: string;
        PrecioLtr: number;
        NombreE: string;
        NombreM: string;
    }) {
        this.IdHistoricoGasolina = preciosGasolina.IdHistoricoGasolina;
        this.FechaAlta = preciosGasolina.FechaAlta;
        this.FechaDesde = preciosGasolina.FechaDesde;
        this.FechaHasta = preciosGasolina.FechaHasta;
        this.IdEntidadFederal = preciosGasolina.IdEntidadFederal;
        this.IdMunicipio = preciosGasolina.IdMunicipio;
        this.PrecioLtr = preciosGasolina.PrecioLtr;
        this.NombreE = preciosGasolina.NombreE;
        this.NombreM = preciosGasolina.NombreM;
    }

}

