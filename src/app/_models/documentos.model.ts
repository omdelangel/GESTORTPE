import { DocViewerComponent } from "../_components/doc-viewer";

export class DocumentosVehiculo {
    IdDocumento: number;
    Documento: string;
    IdVehiculo: number;
    NombreArchivo: string;
    Faltante: number;
    Calificacion: number;
    Observaciones: string;
    Calificar: boolean;

    constructor(documentosVehiculo: { IdDocumento: number;
        Documento: string;
        IdVehiculo: number;
        NombreArchivo: string;
        Faltante: number;
        Calificacion: number;
        Observaciones: string;
        Calificar: boolean;}){
        this.IdDocumento = documentosVehiculo.IdDocumento;
        this.Documento = documentosVehiculo.Documento;
        this.IdVehiculo = documentosVehiculo.IdVehiculo;
        this.NombreArchivo = documentosVehiculo.NombreArchivo;
        this.Faltante = documentosVehiculo.Faltante;
        this.Calificacion = documentosVehiculo.Calificacion;
        this.Observaciones = documentosVehiculo.Observaciones;
        this.Calificar = documentosVehiculo.Calificar;
    }    
}

export class VehiculoContrato {
    IdContrato: number;
    IdTipoConvertidor: number;
    Convertidor: string;
    ConsumoRequerido: number;
    ConsumoMensual: number;
    NumeroPeriodos: number;
    IdTipoVehiculo: string;
    TipoVehiculo: string;

    constructor(vehiculoContrato: { 
        IdContrato: number;
        IdTipoConvertidor: number;
        Convertidor: string;
        ConsumoRequerido: number;
        ConsumoMensual: number;
        NumeroPeriodos: number;
        IdTipoVehiculo: string;
        TipoVehiculo: string;}){
        this.IdContrato = vehiculoContrato.IdContrato;
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


