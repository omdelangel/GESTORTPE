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
            }

}