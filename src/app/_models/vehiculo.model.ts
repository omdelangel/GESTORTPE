export class Vehiculo {
    IdVehiculo: number;
    IdConcesionario: number;
    VIN: string;
    IdSubmarca: number;
    Modelo: number;
    Placa: string;
    Color: string;


    constructor(vehiculo: { 
        IdVehiculo: number;
        IdConcesionario: number;
        VIN: string;
        IdSubmarca: number;
        Modelo: number;
        Placa: string;
        Color: string;}){
        this.IdVehiculo = vehiculo.IdVehiculo;
        this.IdConcesionario = vehiculo.IdConcesionario;
        this.VIN = vehiculo.VIN;
        this.IdSubmarca = vehiculo.IdSubmarca;
        this.Modelo = vehiculo.Modelo;
        this.Placa = vehiculo.Placa;
        this.Color = vehiculo.Color;
    }    
}


