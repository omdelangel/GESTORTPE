import { DocViewerComponent } from "../_components/doc-viewer";

export class DocumentosVehiculo {
    IdDocumento: number;
    Documento: string;
    IdVehiculo: number;
    NombreArchivo: string;
    Faltante: number;
    Calificacion: number;
    Observaciones: string;

    constructor(documentosVehiculo: { IdDocumento: number;
        Documento: string;
        IdVehiculo: number;
        NombreArchivo: string;
        Faltante: number;
        Calificacion: number;
        Observaciones: string;}){
        this.IdDocumento = documentosVehiculo.IdDocumento;
        this.Documento = documentosVehiculo.Documento;
        this.IdVehiculo = documentosVehiculo.IdVehiculo;
        this.NombreArchivo = documentosVehiculo.NombreArchivo;
        this.Faltante = documentosVehiculo.Faltante;
        this.Calificacion = documentosVehiculo.Calificacion;
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

export class DocumentoVerificacion {
    IdVehiculo: number;
    IdConcesionario: number;
    IdDocumento: number;
    Correcto: number;
    Observaciones: string;

    constructor(documentoVerificacion: {
        IdVehiculo: number;
        IdConcesionario: number;
        IdDocumento: number;
        Correcto: number;
        Observaciones: string; }) {
            this.IdVehiculo = documentoVerificacion.IdVehiculo;
            this.IdConcesionario = documentoVerificacion.IdConcesionario;
            this.IdDocumento = documentoVerificacion.IdDocumento;
            this.Correcto = documentoVerificacion.Correcto;
            this.Observaciones = documentoVerificacion.Observaciones;
        }
} 


