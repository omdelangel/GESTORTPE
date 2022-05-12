export class Pagos {

    IdContrato                      :number;
    IdConcesionario                 :number;
    NombreConcesionario             :string;
    IdVehiculo                      :number;
    Marca                           :string;
    Submarca                        :string;
    Modelo                          :string;
    VIN                             :string;
    Placa                           :string;
    LitrosPendientesTot             :number;
    MontoPendienteTot               :number;
    detallePagos: DetallePagos[] = [];
    
    constructor(pagos: {   
        IdContrato                      :number;
        IdConcesionario                 :number;
        NombreConcesionario             :string;
        IdVehiculo                      :number;
        Marca                           :string;
        Submarca                        :string;
        Modelo                          :string;
        VIN                             :string;
        Placa                           :string;
        LitrosPendientesTot             :number;
        MontoPendienteTot               :number;

    }){
        this.IdContrato                     = pagos.IdContrato;
        this.IdConcesionario                = pagos.IdConcesionario;
        this.NombreConcesionario            = pagos.NombreConcesionario;
        this.IdVehiculo                     = pagos.IdVehiculo;
        this.Marca                          = pagos.Marca;
        this.Submarca                       = pagos.Submarca;
        this.Modelo                         = pagos.Modelo;
        this.VIN                            = pagos.VIN;
        this.Placa                          = pagos.Placa;
        this.LitrosPendientesTot            = pagos.LitrosPendientesTot;
        this.MontoPendienteTot              = pagos.MontoPendienteTot;                              
    }    
}

export class DetallePagos {
    FechaCorte: string = "";
    LitrosPendientes: number = 0;
    MontoPendiente: number = 0;
}

export class PagoVentanilla {
    IdContrato: number;
    Importe: number;
    FormaPago: string;

    constructor(pagoVentanilla: {
        IdContrato: number;
        Importe: number;
        FormaPago: string;})
        {
            this.IdContrato = pagoVentanilla.IdContrato;
            this.Importe    = pagoVentanilla.Importe;
            this.FormaPago  = pagoVentanilla.FormaPago;
    }
} 
