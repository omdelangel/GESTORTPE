export class Propietario {
    IdPropietario: number; 
    IdVehiculo: number;
    Nombre: string;
    Paterno: string;
    Materno: string;
    RFC: string;
    CURP: string;
    FechaNacimiento: string;
    TipoPersona: string;
    Genero: string;
    EstadoCivil: string;
    Calle: string;
    Exterior: string;
    Interior: string;
    IdColonia: string;
    Telefono: string;
    Celular: string;
    email: string;
    IdIdentificacion: number;
    FolioIdentificacion: string;

    
    constructor(propietario: { 
        IdPropietario: number; 
        IdVehiculo: number;
        Nombre: string;
        Paterno: string;
        Materno: string;
        RFC: string;
        CURP: string;
        FechaNacimiento: string;
        TipoPersona: string;
        Genero: string;
        EstadoCivil: string;
        Calle: string;
        Exterior: string;
        Interior: string;
        IdColonia: string;
        Telefono: string;
        Celular: string;
        email: string;
        IdIdentificacion: number;
        FolioIdentificacion: string; }){

        this.IdPropietario = propietario.IdPropietario;
        this.IdVehiculo = propietario.IdVehiculo;
        this.Nombre = propietario.Nombre;
        this.Paterno = propietario.Paterno;
        this.Materno = propietario.Materno;
        this.RFC = propietario.RFC;
        this.CURP = propietario.CURP;
        this.FechaNacimiento = propietario.FechaNacimiento;
        this.TipoPersona = propietario.TipoPersona;
        this.Genero = propietario.Genero;
        this.EstadoCivil = propietario.EstadoCivil;
        this.Calle = propietario.Calle;
        this.Exterior = propietario.Exterior;
        this.Interior = propietario.Interior;
        this.IdColonia = propietario.IdColonia;
        this.Telefono = propietario.Telefono;
        this.Celular = propietario.Celular;
        this.email = propietario.email;
        this.IdIdentificacion = propietario.IdIdentificacion;
        this.FolioIdentificacion = propietario.FolioIdentificacion;

    } 
    
    }
    
    