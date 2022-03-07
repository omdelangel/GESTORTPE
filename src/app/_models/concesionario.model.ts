export class ConcesionarioConsulta {
    nombreConcesionario: string;
    modeloAnio: string;
    serie: string;
    placa: string;
    detalleOperador: DetalleOperador[] = [];


    constructor(concesionarioConsulta: { nombreConcesionario: string; modeloAnio: string; serie: string, placa: string}){
        this.nombreConcesionario = concesionarioConsulta.nombreConcesionario;
        this.modeloAnio = concesionarioConsulta.modeloAnio;
        this.serie = concesionarioConsulta.serie;
        this.placa = concesionarioConsulta.placa;
    }    
}

export class DetalleOperador {
    idOperdor: number = 0;
    nombreOperador: string = "";
    RFC: number = 0;
    CURP: number = 0;
}

export class ConcesionarioAltaEdicion {
    IdConcesionario: number;
    Nombre: string;
    Paterno: string;
    Materno: string;
    NombreCompleto: string;
    RFC: string;
    CURP: string;
    FechaNacimiento: string;
    TipoPersona: string;
    Genero: string;
    EstadoCivil: string;
    Calle: string;
    Exterior: string;
    Interior: string;
    IdColonia: number;
    Telefono: string;
    Celular: string;
    email: string;
    IdIdentificacion: string;
    FolioIdentificacion: string;
    IdSindicato: number;
    IdAsignacionSindicato: number;
    NumeroConcesion: string;

    constructor(concesionarioAltaEdicion: {
        IdConcesionario: number;
        Nombre: string;
        Paterno: string;
        Materno: string;
        NombreCompleto: string;
        RFC: string;
        CURP: string;
        FechaNacimiento: string;
        TipoPersona: string;
        Genero: string;
        EstadoCivil: string;
        Calle: string;
        Exterior: string;
        Interior: string;
        IdColonia: number;
        Telefono: string;
        Celular: string;
        email: string;
        IdIdentificacion: string;
        FolioIdentificacion: string;
        IdSindicato: number;
        IdAsignacionSindicato: number;
        NumeroConcesion: string;}) {   
        this.IdConcesionario = concesionarioAltaEdicion.IdConcesionario;
        this.Nombre = concesionarioAltaEdicion.Nombre;
        this.Paterno = concesionarioAltaEdicion.Paterno;
        this.Materno = concesionarioAltaEdicion.Materno;
        this.NombreCompleto = concesionarioAltaEdicion.NombreCompleto;
        this.RFC = concesionarioAltaEdicion.RFC;
        this.CURP = concesionarioAltaEdicion.CURP;
        this.FechaNacimiento = concesionarioAltaEdicion.FechaNacimiento;
        this.TipoPersona = concesionarioAltaEdicion.TipoPersona;
        this.Genero = concesionarioAltaEdicion.Genero;
        this.EstadoCivil = concesionarioAltaEdicion.EstadoCivil;
        this.Calle = concesionarioAltaEdicion.Calle;
        this.Exterior = concesionarioAltaEdicion.Exterior;
        this.Interior = concesionarioAltaEdicion.Interior;
        this.IdColonia = concesionarioAltaEdicion.IdColonia;
        this.Telefono = concesionarioAltaEdicion.Telefono;
        this.Celular = concesionarioAltaEdicion.Celular;
        this.email = concesionarioAltaEdicion.email;
        this.IdIdentificacion = concesionarioAltaEdicion.IdIdentificacion;
        this.FolioIdentificacion = concesionarioAltaEdicion.FolioIdentificacion;
        this.IdSindicato = concesionarioAltaEdicion.IdSindicato;
        this.IdAsignacionSindicato = concesionarioAltaEdicion.IdAsignacionSindicato;
        this.NumeroConcesion = concesionarioAltaEdicion.NumeroConcesion;
        
    }
        
}


export class ConcesionarioRegistro {
        IdConcesionario: number;
        NombreConcesionario: string;
        FechaRegistro: string;
        IdVehiculo: number;
        Marca: number;
        Submarca: number;
        Modelo: number;
        Placa: string;
        Estatus: string;
        IdSindicato: number;
        Sindicato: string;
        IdAsignacionSindicato: number;
        EditaContrato: boolean;
        EditaDocumentos: boolean;
        EditaOperador: boolean;
    constructor(concesionarioRegistro: { 
        IdConcesionario: number;
        NombreConcesionario: string;
        FechaRegistro: string;
        IdVehiculo: number;
        Marca: number;
        Submarca: number;
        Modelo: number;
        Placa: string;
        Estatus: string;
        IdSindicato: number;
        Sindicato: string;
        IdAsignacionSindicato: number;
        EditaContrato: boolean;
        EditaDocumentos: boolean;
        EditaOperador: boolean;}){
        this.IdConcesionario = concesionarioRegistro.IdConcesionario;
        this.NombreConcesionario = concesionarioRegistro.NombreConcesionario;
        this.FechaRegistro = concesionarioRegistro.FechaRegistro;
        this.IdVehiculo = concesionarioRegistro.IdVehiculo;
        this.Marca = concesionarioRegistro.Marca;
        this.Submarca = concesionarioRegistro.Submarca;
        this.Modelo = concesionarioRegistro.Modelo;
        this.Placa = concesionarioRegistro.Placa;
        this.Estatus = concesionarioRegistro.Estatus;
        this.IdSindicato = concesionarioRegistro.IdSindicato; 
        this.Sindicato = concesionarioRegistro.Sindicato;
        this.IdAsignacionSindicato = concesionarioRegistro.IdAsignacionSindicato;
        this.EditaContrato = concesionarioRegistro.EditaContrato;
        this.EditaDocumentos = concesionarioRegistro.EditaDocumentos;
        this.EditaOperador = concesionarioRegistro.EditaOperador;          
    }    
}






