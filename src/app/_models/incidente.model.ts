export class Incidente {
    IdTipoIncidente                     :string;  
    IdIncidenteSiniestro                :number;  
    IdVehiculo                          :number;  
    IdConcesionario                     :number;  
    Concesionario                       :string;  
    TipoConvertidor                     :string;  
    TipoVehiculo                        :string;  
    Vehiculo                            :string;  
    FechaContrato                       :string;  
    Sindicato                           :string;  
    IdCita                              :number;  
    FechaCita                           :string;  
    EstatusCita                         :string;  
    GenerarCita                         :boolean; 
    DictaminarRevision                  :boolean; 
    DocumentarEvidencia                 :boolean; 
    DictaminarSeguro                    :boolean; 
    RegistrarFechaArreglo               :boolean; 
    FechaReporte                        :string;

    constructor(incidente: {
            IdTipoIncidente                     :string;  
            IdIncidenteSiniestro                :number;  
            IdVehiculo                          :number;  
            IdConcesionario                     :number;  
            Concesionario                       :string;  
            TipoConvertidor                     :string;  
            TipoVehiculo                        :string;  
            Vehiculo                            :string;  
            FechaContrato                       :string;  
            Sindicato                           :string;  
            IdCita                              :number;  
            FechaCita                           :string;  
            EstatusCita                         :string;  
            GenerarCita                         :boolean; 
            DictaminarRevision                  :boolean; 
            DocumentarEvidencia                 :boolean; 
            DictaminarSeguro                    :boolean; 
            RegistrarFechaArreglo               :boolean;
            FechaReporte                        :string;         
        }) {
            this.IdTipoIncidente                = incidente.IdTipoIncidente           ;
            this.IdIncidenteSiniestro           = incidente.IdIncidenteSiniestro      ;
            this.IdVehiculo                     = incidente.IdVehiculo                ;
            this.IdConcesionario                = incidente.IdConcesionario           ;
            this.Concesionario                  = incidente.Concesionario             ;
            this.TipoConvertidor                = incidente.TipoConvertidor           ;
            this.TipoVehiculo                   = incidente.TipoVehiculo              ;
            this.Vehiculo                       = incidente.Vehiculo                  ;
            this.FechaContrato                  = incidente.FechaContrato             ;
            this.Sindicato                      = incidente.Sindicato                 ;
            this.IdCita                         = incidente.IdCita                    ;
            this.FechaCita                      = incidente.FechaCita                 ;
            this.EstatusCita                    = incidente.EstatusCita               ;
            this.GenerarCita                    = incidente.GenerarCita               ;
            this.DictaminarRevision             = incidente.DictaminarRevision        ;
            this.DocumentarEvidencia            = incidente.DocumentarEvidencia       ;
            this.DictaminarSeguro               = incidente.DictaminarSeguro          ;
            this.RegistrarFechaArreglo          = incidente.RegistrarFechaArreglo     ;
            this.FechaReporte                   = incidente.FechaReporte              ;
            }

}

export class CitasIncidente {
    IdIncidenteSiniestro        :number;
    Fecha                       :string;
    IdTaller                    :number;
    IdCita                      :number;

    constructor(citasIncidente: { 
        IdIncidenteSiniestro        :number;
        Fecha                       :string;
        IdTaller                    :number;
        IdCita                      :number;
        }){
        this.IdIncidenteSiniestro         = citasIncidente.IdIncidenteSiniestro      ;
        this.Fecha                        = citasIncidente.Fecha                     ;
        this.IdTaller                     = citasIncidente.IdTaller                  ;
        this.IdCita                       = citasIncidente.IdCita                    ;
          }    
}
export class DocumentoEvidencia {
    IdEvidencia: number;
    IdSiniestro: number;
    ArchivoEvidencia: string;

    constructor(documentoEvidencia: {
        IdEvidencia: number;
        IdSiniestro: number;
        ArchivoEvidencia: string; }) {
            this.IdEvidencia = documentoEvidencia.IdEvidencia;
            this.IdSiniestro = documentoEvidencia.IdSiniestro;
            this.ArchivoEvidencia = documentoEvidencia.ArchivoEvidencia;

        }
} 

export class DictamenCitaIncidente {
    IdCita                :number;
    IdIncidenteSiniestro  :number;
    IdDictamen            :string;
    Observaciones         :string;
    ArchivoDictamen       :string;

    constructor(dictamenCitaIncidente: {
                IdCita                :number;
                IdIncidenteSiniestro  :number;
                IdDictamen            :string;
                Observaciones         :string;
                ArchivoDictamen       :string;            
    }) {
        this.IdCita                = dictamenCitaIncidente.IdCita                 ;
        this.IdIncidenteSiniestro  = dictamenCitaIncidente.IdIncidenteSiniestro   ;
        this.IdDictamen            = dictamenCitaIncidente.IdDictamen             ;
        this.Observaciones         = dictamenCitaIncidente.Observaciones          ;
        this.ArchivoDictamen       = dictamenCitaIncidente.ArchivoDictamen        ;
    }
}


export class DocumentoEvidenciaTaller {
    ArchivoDictamen: string;

    constructor(documentoEvidenciaTaller: {
        ArchivoDictamen: string; }) {
            this.ArchivoDictamen = documentoEvidenciaTaller.ArchivoDictamen;

        }
} 

export class DocumentoEvidenciaSeguro {
    IdSiniestro: number;
    IdVehiculo: number;
    TipoSiniestro: string;
    FechaSiniestro: string;
    ResolucionSeguro: string;
    FechaResolucion: string;
    FechaArreglo: string;
    FechaRegistro: string;
    ArchivoResolucionSeguro: string;
    Estatus: string;

    constructor(documentoEvidenciaSeguro: {
        IdSiniestro: number;
        IdVehiculo: number;
        TipoSiniestro: string;
        FechaSiniestro: string;
        ResolucionSeguro: string;
        FechaResolucion: string;
        FechaArreglo: string;
        FechaRegistro: string;
        ArchivoResolucionSeguro: string;
        Estatus: string; }) {
            this.IdSiniestro = documentoEvidenciaSeguro.IdSiniestro;
            this.IdVehiculo = documentoEvidenciaSeguro.IdVehiculo;
            this.TipoSiniestro = documentoEvidenciaSeguro.TipoSiniestro;
            this.FechaSiniestro = documentoEvidenciaSeguro.FechaSiniestro;
            this.ResolucionSeguro = documentoEvidenciaSeguro.ResolucionSeguro;
            this.FechaResolucion = documentoEvidenciaSeguro.FechaResolucion;
            this.FechaArreglo = documentoEvidenciaSeguro.FechaArreglo;
            this.FechaRegistro = documentoEvidenciaSeguro.FechaRegistro;
            this.ArchivoResolucionSeguro = documentoEvidenciaSeguro.ArchivoResolucionSeguro;
            this.Estatus = documentoEvidenciaSeguro.Estatus;
        }
} 



