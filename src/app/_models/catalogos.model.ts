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

    constructor(catalogoGeneral: { IdUsuario        :string; 
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
        this.IdUsuario             = catalogoGeneral.IdUsuario        ; 
        this.Nombre                = catalogoGeneral.Nombre           ; 
        this.Contrasenia           = catalogoGeneral.Contrasenia      ; 
        this.IdEmpleado            = catalogoGeneral.IdEmpleado       ; 
        this.IdPerfil              = catalogoGeneral.IdPerfil         ; 
        this.FechaRegistro         = catalogoGeneral.FechaRegistro    ; 
        this.Estatus               = catalogoGeneral.Estatus          ; 
        this.email                 = catalogoGeneral.email            ; 
        this.Bloqueado             = catalogoGeneral.Bloqueado        ; 
        this.Intentos              = catalogoGeneral.Intentos         ; 
        this.UltimaTransaccion     = catalogoGeneral.UltimaTransaccion; 
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

    constructor(catalogoGeneral: { IdUsuario        :string; 
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
        this.IdUsuario             = catalogoGeneral.IdUsuario        ; 
        this.Nombre                = catalogoGeneral.Nombre           ; 
        this.Contrasenia           = catalogoGeneral.Contrasenia      ; 
        this.IdEmpleado            = catalogoGeneral.IdEmpleado       ; 
        this.IdPerfil              = catalogoGeneral.IdPerfil         ; 
        this.Perfil                = catalogoGeneral.Perfil           ; 
        this.FechaRegistro         = catalogoGeneral.FechaRegistro    ; 
        this.Estatus               = catalogoGeneral.Estatus          ; 
        this.email                 = catalogoGeneral.email            ; 
        this.Bloqueado             = catalogoGeneral.Bloqueado        ; 
        this.Intentos              = catalogoGeneral.Intentos         ; 
        this.UltimaTransaccion     = catalogoGeneral.UltimaTransaccion; 
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

