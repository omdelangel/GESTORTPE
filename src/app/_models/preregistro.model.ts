export class PreRegistro {
    idConcesionario: number;
    nombre: string;
    paterno: string;
    materno: string;
    nombreCompleto: string;   
    fechaRegistro: string;
    idVehiculo: number;
    idMarca: number;
    marca: string;
    idSubmarca: number;
    submarca: string;
    modelo: string;
    placa:string;
    idPropietario: number;
    idCita: number;
    fechaCita: string;
    idDictamen: number;
    dictamen: string;
    estatusCita: string;
    dictaminar: boolean;
 
    constructor(preRegistro: {   
        idConcesionario: number;
        nombre: string;
        paterno: string;
        materno: string;
        nombreCompleto: string;
        fechaRegistro: string;
        idVehiculo: number;
        idMarca: number;
        marca: string;
        idSubmarca: number;
        submarca: string;
        modelo: string;
        placa:string;
        idPropietario: number;
        idCita: number;
        fechaCita: string;
        idDictamen: number;
        dictamen: string;
        estatusCita: string;
        dictaminar: boolean;}){
            this.idConcesionario = preRegistro.idConcesionario;
            this.nombre = preRegistro.nombre;
            this.paterno = preRegistro.paterno;
            this.materno = preRegistro.materno;
            this.nombreCompleto = preRegistro.nombreCompleto;
            this.fechaRegistro = preRegistro.fechaRegistro;
            this.idVehiculo = preRegistro.idVehiculo;
            this.idMarca = preRegistro.idMarca;
            this.marca = preRegistro.marca;
            this.idSubmarca = preRegistro.idSubmarca;
            this.submarca = preRegistro.submarca;
            this.modelo = preRegistro.modelo;
            this.placa = preRegistro.placa;
            this.idPropietario = preRegistro.idPropietario;
            this.idCita = preRegistro.idCita;
            this.fechaCita = preRegistro.fechaRegistro;
            this.idDictamen = preRegistro.idDictamen;
            this.dictamen = preRegistro.dictamen;
            this.estatusCita = preRegistro.estatusCita;
            this.dictaminar = preRegistro.dictaminar;        
    }    
}