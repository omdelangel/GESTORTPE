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
    IdDictamen:     string;
    Nombre:         string;
    Estatus:        boolean;    

    constructor(catalogoGeneral: { IdDictamen: string; Nombre: string; Estatus: boolean}){
        this.IdDictamen      = catalogoGeneral.IdDictamen;
        this.Nombre          = catalogoGeneral.Nombre; 
        this.Estatus         = catalogoGeneral.Estatus; 
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

