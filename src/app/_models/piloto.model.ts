export class ConcesionarioPiloto {
    IdConcesionario: number;
    IdContrato: number;
    NombreConcesionario: string;
    TerminoPiloto: string;
    IdVehiculo: number;
    Marca: string;
    Submarca: string;
    Modelo: string;
    Placa: string;
    TipoVehiculo: string;
    TipoConvertidor: string;
    FechaCitaDesinstalacion: string;
    EstatusCitaDesinstalacion: string;
    IdCitaDesinstalacion: number;
    AceptoConvertidor: number;
    GenerarContratos: boolean;
    DigitalizarContratos: boolean;
    GenerarCita: boolean;
    ConfirmarCita: boolean;

    constructor(concesionarioPiloto: {
        IdConcesionario: number;
        IdContrato: number;
        NombreConcesionario: string;
        TerminoPiloto: string;
        IdVehiculo: number;
        Marca: string;
        Submarca: string;
        Modelo: string;
        Placa: string;
        TipoVehiculo: string;
        TipoConvertidor: string;
        FechaCitaDesinstalacion: string;
        EstatusCitaDesinstalacion: string;
        IdCitaDesinstalacion: number;
        AceptoConvertidor: number;
        GenerarContratos: boolean;
        DigitalizarContratos: boolean;
        GenerarCita: boolean;
        ConfirmarCita: boolean;
    }) {
        this.IdConcesionario = concesionarioPiloto.IdConcesionario;
        this.IdContrato = concesionarioPiloto.IdContrato;
        this.NombreConcesionario = concesionarioPiloto.NombreConcesionario;
        this.TerminoPiloto = concesionarioPiloto.TerminoPiloto;
        this.IdVehiculo = concesionarioPiloto.IdVehiculo;
        this.Marca = concesionarioPiloto.Marca;
        this.Submarca = concesionarioPiloto.Submarca;
        this.Modelo = concesionarioPiloto.Modelo;
        this.TipoVehiculo = concesionarioPiloto.TipoVehiculo;
        this.TipoConvertidor = concesionarioPiloto.TipoConvertidor;
        this.FechaCitaDesinstalacion = concesionarioPiloto.FechaCitaDesinstalacion;
        this.EstatusCitaDesinstalacion = concesionarioPiloto.EstatusCitaDesinstalacion;
        this.IdCitaDesinstalacion = concesionarioPiloto.IdCitaDesinstalacion;
        this.AceptoConvertidor = concesionarioPiloto.AceptoConvertidor;
        this.GenerarContratos = concesionarioPiloto.GenerarContratos;
        this.DigitalizarContratos = concesionarioPiloto.DigitalizarContratos;
        this.GenerarCita = concesionarioPiloto.GenerarCita;
        this.ConfirmarCita = concesionarioPiloto.ConfirmarCita;
    }

}

export class ContratoPiloto {
    IdContrato: number;
    IdTipoConvertidor: number;
    Convertidor: string;
    ConsumoRequerido: number;
    ConsumoMensual: number;
    NumeroPeriodos: number;
    IdTipoVehiculo: string;
    TipoVehiculo: string;
    Sindicato: string;

    constructor(contratoPiloto: { 
        IdContrato: number;
        IdTipoConvertidor: number;
        Convertidor: string;
        ConsumoRequerido: number;
        ConsumoMensual: number;
        NumeroPeriodos: number;
        IdTipoVehiculo: string;
        TipoVehiculo: string;
        Sindicato: string;}){
        this.IdContrato = contratoPiloto.IdContrato;
        this.IdTipoConvertidor = contratoPiloto.IdTipoConvertidor;
        this.Convertidor = contratoPiloto.Convertidor;
        this.ConsumoRequerido = contratoPiloto.ConsumoRequerido;
        this.ConsumoMensual = contratoPiloto.ConsumoMensual;
        this.NumeroPeriodos = contratoPiloto.NumeroPeriodos;
        this.IdTipoVehiculo = contratoPiloto.IdTipoVehiculo;
        this.TipoVehiculo = contratoPiloto.TipoVehiculo;
        this.Sindicato = contratoPiloto.Sindicato;
    }    
}
