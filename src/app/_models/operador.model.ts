export class Operador {
    IdOperador: number;
    IdVehiculo: number;
    IdConcesionario: number;
    Placa: string;
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
    Licencia: string;
    Estatus: string;


    constructor(operador: {
        IdOperador: number;
        IdVehiculo: number;
        Placa: string;
        IdConcesionario: number;
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
        Licencia: string;
        Estatus: string;
    }) {

        this.IdOperador = operador.IdOperador;
        this.IdVehiculo = operador.IdVehiculo;
        this.IdConcesionario = operador.IdConcesionario;
        this.Placa = operador.Placa;
        this.Nombre = operador.Nombre;
        this.Paterno = operador.Paterno;
        this.Materno = operador.Materno;
        this.RFC = operador.RFC;
        this.CURP = operador.CURP;
        this.FechaNacimiento = operador.FechaNacimiento;
        this.TipoPersona = operador.TipoPersona;
        this.Genero = operador.Genero;
        this.EstadoCivil = operador.EstadoCivil;
        this.Calle = operador.Calle;
        this.Exterior = operador.Exterior;
        this.Interior = operador.Interior;
        this.IdColonia = operador.IdColonia;
        this.Telefono = operador.Telefono;
        this.Celular = operador.Celular;
        this.email = operador.email;
        this.IdIdentificacion = operador.IdIdentificacion;
        this.FolioIdentificacion = operador.FolioIdentificacion;
        this.Licencia = operador.Licencia;
        this.Estatus = operador.Estatus;

    }

}