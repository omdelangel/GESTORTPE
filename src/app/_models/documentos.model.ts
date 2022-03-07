import { DocViewerComponent } from "../_components/doc-viewer";

export class DocumentosVehiculo {
    IdDocumento: number;
    Documento: string;
    IdVehiculo: number;
    NombreArchivo: string;
    Faltante: number;
    Revisado: number;
    Correcto: number;
    Observaciones: string;

    constructor(documentosVehiculo: { IdDocumento: number;
        Documento: string;
        IdVehiculo: number;
        NombreArchivo: string;
        Faltante: number;
        Revisado: number;
        Correcto: number;
        Observaciones: string;}){
        this.IdDocumento = documentosVehiculo.IdDocumento;
        this.Documento = documentosVehiculo.Documento;
        this.IdVehiculo = documentosVehiculo.IdVehiculo;
        this.NombreArchivo = documentosVehiculo.NombreArchivo;
        this.Faltante = documentosVehiculo.Faltante;
        this.Revisado = documentosVehiculo.Revisado;
        this.Correcto = documentosVehiculo.Correcto;
        this.Observaciones = documentosVehiculo.Observaciones;
    }    
}

export class VehiculoContrato {
    IdTipoConvertidor: number;
    Convertidor: string;
    ConsumoRequerido: number;
    ConsumoMensual: number;
    NumeroPeriodos: number;
    IdTipoVehiculo: string;
    TipoVehiculo: string;

    constructor(vehiculoContrato: { 
        IdTipoConvertidor: number;
        Convertidor: string;
        ConsumoRequerido: number;
        ConsumoMensual: number;
        NumeroPeriodos: number;
        IdTipoVehiculo: string;
        TipoVehiculo: string;}){
        this.IdTipoConvertidor = vehiculoContrato.IdTipoConvertidor;
        this.Convertidor = vehiculoContrato.Convertidor;
        this.ConsumoRequerido = vehiculoContrato.ConsumoRequerido;
        this.ConsumoMensual = vehiculoContrato.ConsumoMensual;
        this.NumeroPeriodos = vehiculoContrato.NumeroPeriodos;
        this.IdTipoVehiculo = vehiculoContrato.IdTipoVehiculo;
        this.TipoVehiculo = vehiculoContrato.TipoVehiculo;
    }    
}


