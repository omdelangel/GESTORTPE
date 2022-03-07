export class Taller {
    IdTaller: number;
    Nombre: string;
    RFC: string;
    Domicilio: string;
    IdColonia: string;
    Colonia: number;
    CP: string;
    Municipio: string;
    EntidadFederativa: string;
    Telefono: string;
    Contacto: string;
    HorarioIni: string;
    HorarioFin: string;
    Concurrencia: number;
    DuracionCita: string;
    Estatus: string;

    constructor(taller: { 
        IdTaller: number;
        Nombre: string;
        RFC: string;
        Domicilio: string;
        IdColonia: string;
        Colonia: number;
        CP: string;
        Municipio: string;
        EntidadFederativa: string;
        Telefono: string;
        Contacto: string;
        HorarioIni: string;
        HorarioFin: string;
        Concurrencia: number;
        DuracionCita: string;
        Estatus: string;}){
        this.IdTaller = taller.IdTaller;
        this.Nombre = taller.Nombre;
        this.RFC = taller.RFC;
        this.Domicilio = taller.Domicilio;
        this.IdColonia = taller.IdColonia;
        this.Colonia = taller.Colonia;
        this.CP = taller.CP;
        this.Municipio = taller.Municipio;
        this.EntidadFederativa = taller.EntidadFederativa;
        this.Telefono = taller.Telefono;
        this.Contacto = taller.Contacto;
        this.HorarioIni = taller.HorarioIni;
        this.HorarioFin = taller.HorarioFin;
        this.Concurrencia = taller.Concurrencia;
        this.DuracionCita = taller.DuracionCita;
        this.Estatus = taller.Estatus;
    }    
}