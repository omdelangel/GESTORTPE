export class Citas {
    IdVehiculo: number;
    IdConcesionario: number;
    Fecha: any;
    IdTaller: number;

    constructor(citas: { 
        IdVehiculo: number;
        IdConcesionario: number;
        Fecha: any;
        IdTaller: number;}){
        this.IdVehiculo = citas.IdVehiculo;
        this.IdConcesionario = citas.IdConcesionario;
        this.Fecha = citas.Fecha;
        this.IdTaller = citas.IdTaller;
    }    
}

export class DisponibilidadCitas {
    Fecha: string;
    Disponibles: number;
    Color: string;

    constructor(disponibilidadCitas: {
        Fecha: string;
        Disponibles: number;
        Color: string;
    }) {
        this.Fecha = disponibilidadCitas.Fecha;
        this.Disponibles = disponibilidadCitas.Disponibles;
        this.Color = disponibilidadCitas.Color;
    }
}

export class DatosCita {
     Taller: string;
     Domicilio: string;
     IdColonia: string;
     Colonia: string;
     CP: string;
     Municipio: string;
     EntidadFederativa: string;
     Telefono: string;
     Contacto: string;
     Fecha: string;
     Hora: string;
     Estatus: string;

     constructor(datosCita: {
        Taller: string;
        Domicilio: string;
        IdColonia: string;
        Colonia: string;
        CP: string;
        Municipio: string;
        EntidadFederativa: string;
        Telefono: string;
        Contacto: string;
        Fecha: string;
        Hora: string;
        Estatus: string;
     }) {
            this.Taller = datosCita.Taller;
            this.Domicilio = datosCita.Domicilio;
            this.IdColonia = datosCita.IdColonia;
            this.Colonia = datosCita.Colonia;
            this.CP = datosCita.CP;
            this.Municipio = datosCita.Municipio;
            this.EntidadFederativa = datosCita.EntidadFederativa;
            this.Telefono = datosCita.Telefono;
            this.Contacto = datosCita.Contacto;
            this.Fecha = datosCita.Fecha;
            this.Hora = datosCita.Hora;
            this.Estatus = datosCita.Estatus;
     }

}


export class DictamenCita {
    IdVehiculo: number;
    IdConcesionario: number;
    IdCita: number;
    IdDictamen: number;
    Observaciones: string;

    constructor(dictamenCita: {
        IdVehiculo: number;
        IdConcesionario: number;
        IdCita: number;
        IdDictamen: number;
        Observaciones: string;

    }) {
        this.IdVehiculo = dictamenCita.IdVehiculo;
        this.IdConcesionario = dictamenCita.IdConcesionario;
        this.IdCita = dictamenCita.IdCita;
        this.IdDictamen = dictamenCita.IdDictamen;
        this.Observaciones = dictamenCita.Observaciones;
    }
}
