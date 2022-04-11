export class RepoSitActualConcesionario {
    idPersona: string;
    concesionario: string;
    marca: string;
    modelo: string;
    vin: string;
    placa: string;
    sindicato: string;
    porcAhorroConcesion: number;
    porcAhorroOperador: number;
    fechaInicio: string;
    fechaTermino: string;
    totalLitrosConsumir: number;
    totalLitrosMes: number;
    litrosConsumidos: number;
    litrosXConsumir: number;
    impBenefConversion: number;
    totalAhorro: number;
    totalUtilizadoAhorro: number;
    totalAhorroRestante: number;

    constructor(repoSitActualConcesionario: {   
        idPersona: string,
        concesionario: string,
        marca: string,
        modelo: string,
        vin: string,
        placa: string,
        sindicato: string,
        porcAhorroConcesion: number,
        porcAhorroOperador: number,
        fechaInicio: string,
        fechaTermino: string,
        totalLitrosConsumir: number,
        totalLitrosMes: number,
        litrosConsumidos: number,
        litrosXConsumir: number,
        impBenefConversion: number,
        totalAhorro: number,
        totalUtilizadoAhorro: number,
        totalAhorroRestante: number}){
        this.idPersona = repoSitActualConcesionario.idPersona;
        this.concesionario = repoSitActualConcesionario.concesionario;
        this.marca = repoSitActualConcesionario.marca;
        this.modelo = repoSitActualConcesionario.modelo;    
        this.vin = repoSitActualConcesionario.vin;  
        this.placa = repoSitActualConcesionario.placa;  
        this.sindicato = repoSitActualConcesionario.sindicato;  
        this.porcAhorroConcesion = repoSitActualConcesionario.porcAhorroConcesion;  
        this.porcAhorroOperador = repoSitActualConcesionario.porcAhorroOperador;  
        this.fechaInicio = repoSitActualConcesionario.fechaInicio;  
        this.fechaTermino = repoSitActualConcesionario.fechaTermino;  
        this.totalLitrosConsumir = repoSitActualConcesionario.totalLitrosConsumir;  
        this.totalLitrosMes = repoSitActualConcesionario.totalLitrosMes;  
        this.litrosConsumidos = repoSitActualConcesionario.litrosConsumidos;  
        this.litrosXConsumir = repoSitActualConcesionario.litrosXConsumir;  
        this.impBenefConversion = repoSitActualConcesionario.impBenefConversion;  
        this.totalAhorro = repoSitActualConcesionario.totalAhorro;  
        this.totalUtilizadoAhorro = repoSitActualConcesionario.totalUtilizadoAhorro;  
        this.totalAhorroRestante = repoSitActualConcesionario.totalAhorroRestante;  
    }    
}

export class RepoTipoAutoConvertido {
    NombreConcesionario        :string;
    PaternoConcesionario       :string;
    MaternoConcesionario       :string;
    NombreOperador             :string;
    PaternoOperador            :string;
    MaternoOperador            :string;
    Telefono                   :string;
    Celular                    :string;
    email                      :string;
    Calle                      :string;
    Exterior                   :string;
    Interior                   :string;
    Colonia                    :string;
    CP                         :string;
    Municipio                  :string;
    EntidadFederativa          :string;
    Sindicato                  :string;
    Marca                      :string;
    Submarca                   :string;
    Modelo                     :number;
    NumeroEconomico            :number;
    Placa                      :string;
    ConsumoTotal               :string;
    ConsumoMes                 :string;

    constructor(RepoTipoAutoConvertido: {   
        NombreConcesionario        :string;
        PaternoConcesionario       :string;
        MaternoConcesionario       :string;
        NombreOperador             :string;
        PaternoOperador            :string;
        MaternoOperador            :string;
        Telefono                   :string;
        Celular                    :string;
        email                      :string;
        Calle                      :string;
        Exterior                   :string;
        Interior                   :string;
        Colonia                    :string;
        CP                         :string;
        Municipio                  :string;
        EntidadFederativa          :string;
        Sindicato                  :string;
        Marca                      :string;
        Submarca                   :string;
        Modelo                     :number;
        NumeroEconomico            :number;
        Placa                      :string;
        ConsumoTotal               :string;
        ConsumoMes                 :string}){
            this.NombreConcesionario   = RepoTipoAutoConvertido.NombreConcesionario  ;
            this.PaternoConcesionario  = RepoTipoAutoConvertido.PaternoConcesionario ;
            this.MaternoConcesionario  = RepoTipoAutoConvertido.MaternoConcesionario ;
            this.NombreOperador        = RepoTipoAutoConvertido.NombreOperador       ;
            this.PaternoOperador       = RepoTipoAutoConvertido.PaternoOperador      ;
            this.MaternoOperador       = RepoTipoAutoConvertido.MaternoOperador      ;
            this.Telefono              = RepoTipoAutoConvertido.Telefono             ;
            this.Celular               = RepoTipoAutoConvertido.Celular              ;
            this.email                 = RepoTipoAutoConvertido.email                ;
            this.Calle                 = RepoTipoAutoConvertido.Calle                ;
            this.Exterior              = RepoTipoAutoConvertido.Exterior             ;
            this.Interior              = RepoTipoAutoConvertido.Interior             ;
            this.Colonia               = RepoTipoAutoConvertido.Colonia              ;
            this.CP                    = RepoTipoAutoConvertido.CP                   ;
            this.Municipio             = RepoTipoAutoConvertido.Municipio            ;
            this.EntidadFederativa     = RepoTipoAutoConvertido.EntidadFederativa    ;
            this.Sindicato             = RepoTipoAutoConvertido.Sindicato            ;
            this.Marca                 = RepoTipoAutoConvertido.Marca                ;
            this.Submarca              = RepoTipoAutoConvertido.Submarca             ;
            this.Modelo                = RepoTipoAutoConvertido.Modelo               ;
            this.NumeroEconomico       = RepoTipoAutoConvertido.NumeroEconomico      ;
            this.Placa                 = RepoTipoAutoConvertido.Placa                ;
            this.ConsumoTotal          = RepoTipoAutoConvertido.ConsumoTotal         ;
            this.ConsumoMes            = RepoTipoAutoConvertido.ConsumoMes           ;
    }    
}


export class RepoSinConcluir {
    NombreConcesionario        :string;
    PaternoConcesionario       :string;
    MaternoConcesionario       :string;
    Telefono                   :string;
    Celular                    :string;
    email                      :string;
    Calle                      :string;
    Exterior                   :string;
    Interior                   :string;
    Colonia                    :string;
    CP                         :string;
    Municipio                  :string;
    EntidadFederativa          :string;
    Sindicato                  :string;
    Marca                      :string;
    Submarca                   :string;
    Modelo                     :number;
    NumeroEconomico            :number;
    Placa                      :string;
    Estatus					   :string;
    Documento				   :string;
    NombreArchivo              :string;

    constructor(RepoSinConcluir: {   
        NombreConcesionario        :string;
        PaternoConcesionario       :string;
        MaternoConcesionario       :string;
        Telefono                   :string;
        Celular                    :string;
        email                      :string;
        Calle                      :string;
        Exterior                   :string;
        Interior                   :string;
        Colonia                    :string;
        CP                         :string;
        Municipio                  :string;
        EntidadFederativa          :string;
        Sindicato                  :string;
        Marca                      :string;
        Submarca                   :string;
        Modelo                     :number;
        NumeroEconomico            :number;
        Placa                      :string;
        Estatus					   :string;
        Documento				   :string;
        NombreArchivo              :string}){
            this.NombreConcesionario   = RepoSinConcluir.NombreConcesionario  ;
            this.PaternoConcesionario  = RepoSinConcluir.PaternoConcesionario ;
            this.MaternoConcesionario  = RepoSinConcluir.MaternoConcesionario ;
            this.Telefono              = RepoSinConcluir.Telefono             ;
            this.Celular               = RepoSinConcluir.Celular              ;
            this.email                 = RepoSinConcluir.email                ;
            this.Calle                 = RepoSinConcluir.Calle                ;
            this.Exterior              = RepoSinConcluir.Exterior             ;
            this.Interior              = RepoSinConcluir.Interior             ;
            this.Colonia               = RepoSinConcluir.Colonia              ;
            this.CP                    = RepoSinConcluir.CP                   ;
            this.Municipio             = RepoSinConcluir.Municipio            ;
            this.EntidadFederativa     = RepoSinConcluir.EntidadFederativa    ;
            this.Sindicato             = RepoSinConcluir.Sindicato            ;
            this.Marca                 = RepoSinConcluir.Marca                ;
            this.Submarca              = RepoSinConcluir.Submarca             ;
            this.Modelo                = RepoSinConcluir.Modelo               ;
            this.NumeroEconomico       = RepoSinConcluir.NumeroEconomico      ;
            this.Placa                 = RepoSinConcluir.Placa                ;
            this.Estatus               = RepoSinConcluir.Estatus              ;
            this.Documento             = RepoSinConcluir.Documento            ;
            this.NombreArchivo         = RepoSinConcluir.NombreArchivo        ;
    }    
}


export class RepoAhorroPeriodo {
    IdVehiculo                       :number;
    NombreConcesionario              :string;
    PaternoConcesionario             :string;
    MaternoConcesionario             :string;
    Telefono                         :string;
    Celular                          :string;
    email                            :string;
    Calle                            :string;
    Exterior                         :string;
    Interior                         :string;
    Colonia                          :string;
    CP                               :string;
    Municipio                        :string;
    EntidadFederativa                :string;
    Sindicato                        :string;
    Marca                            :string;
    Submarca                         :string;
    Modelo                           :number;
    NumeroEconomico                  :number;
    Placa                            :string;
    NombreOperador                   :string;
    PaternoOperador                  :string;
    MaternoOperador                  :string;
    FechaInicio                      :string;
    FechaCorte                       :string;
    LitrosConsumoMensual             :string;
    PorcentajeAhorro                 :string;
    LitrosConsumidosPeriodo          :string;
    LitrosConsumidosAcumuladoGeneral :string;

    constructor(RepoAhorroPeriodo: {   
        IdVehiculo                       :number;
        NombreConcesionario              :string;
        PaternoConcesionario             :string;
        MaternoConcesionario             :string;
        Telefono                         :string;
        Celular                          :string;
        email                            :string;
        Calle                            :string;
        Exterior                         :string;
        Interior                         :string;
        Colonia                          :string;
        CP                               :string;
        Municipio                        :string;
        EntidadFederativa                :string;
        Sindicato                        :string;
        Marca                            :string;
        Submarca                         :string;
        Modelo                           :number;
        NumeroEconomico                  :number;
        Placa                            :string;
        NombreOperador                   :string;
        PaternoOperador                  :string;
        MaternoOperador                  :string;
        FechaInicio                      :string;
        FechaCorte                       :string;
        LitrosConsumoMensual             :string;
        PorcentajeAhorro                 :string;
        LitrosConsumidosPeriodo          :string;
        LitrosConsumidosAcumuladoGeneral :string;}){
            this.IdVehiculo                       = RepoAhorroPeriodo.IdVehiculo                      ;
            this.NombreConcesionario              = RepoAhorroPeriodo.NombreConcesionario             ;
            this.PaternoConcesionario             = RepoAhorroPeriodo.PaternoConcesionario            ;
            this.MaternoConcesionario             = RepoAhorroPeriodo.MaternoConcesionario            ;
            this.Telefono                         = RepoAhorroPeriodo.Telefono                        ;
            this.Celular                          = RepoAhorroPeriodo.Celular                         ;
            this.email                            = RepoAhorroPeriodo.email                           ;
            this.Calle                            = RepoAhorroPeriodo.Calle                           ;
            this.Exterior                         = RepoAhorroPeriodo.Exterior                        ;
            this.Interior                         = RepoAhorroPeriodo.Interior                        ;
            this.Colonia                          = RepoAhorroPeriodo.Colonia                         ;
            this.CP                               = RepoAhorroPeriodo.CP                              ;
            this.Municipio                        = RepoAhorroPeriodo.Municipio                       ;
            this.EntidadFederativa                = RepoAhorroPeriodo.EntidadFederativa               ;
            this.Sindicato                        = RepoAhorroPeriodo.Sindicato                       ;
            this.Marca                            = RepoAhorroPeriodo.Marca                           ;
            this.Submarca                         = RepoAhorroPeriodo.Submarca                        ;
            this.Modelo                           = RepoAhorroPeriodo.Modelo                          ;
            this.NumeroEconomico                  = RepoAhorroPeriodo.NumeroEconomico                 ;
            this.Placa                            = RepoAhorroPeriodo.Placa                           ;
            this.NombreOperador                   = RepoAhorroPeriodo.NombreOperador                  ;
            this.PaternoOperador                  = RepoAhorroPeriodo.PaternoOperador                 ;
            this.MaternoOperador                  = RepoAhorroPeriodo.MaternoOperador                 ;
            this.FechaInicio                      = RepoAhorroPeriodo.FechaInicio                     ;
            this.FechaCorte                       = RepoAhorroPeriodo.FechaCorte                      ;
            this.LitrosConsumoMensual             = RepoAhorroPeriodo.LitrosConsumoMensual            ;
            this.PorcentajeAhorro                 = RepoAhorroPeriodo.PorcentajeAhorro                ;
            this.LitrosConsumidosPeriodo          = RepoAhorroPeriodo.LitrosConsumidosPeriodo         ;
            this.LitrosConsumidosAcumuladoGeneral = RepoAhorroPeriodo.LitrosConsumidosAcumuladoGeneral;        
    }    
}


export class RepoNoConsumen {
    NombreConcesionario              :string;
    PaternoConcesionario             :string;
    MaternoConcesionario             :string;
    Telefono                         :string;
    Celular                          :string;
    email                            :string;
    Calle                            :string;
    Exterior                         :string;
    Interior                         :string;
    Colonia                          :string;
    CP                               :string;
    Municipio                        :string;
    EntidadFederativa                :string;
    Sindicato                        :string;
    Marca                            :string;
    Submarca                         :string;
    Modelo                           :number;
    NumeroEconomico                  :number;
    Placa                            :string;
    NombreOperador                   :string;
    PaternoOperador                  :string;
    MaternoOperador                  :string;
    FechaInicio                      :string;
    FechaCorte                       :string;
    ImporteAhorroConcesionario       :string;
    ImporteAhorroPropietario         :string;
    LitrosConsumirMes                :string;
    LitrosConsumidosOperador         :string;
    LitrosConsumidosVehiculo         :string;
    LitrosConsumidosPendiente        :string;

    constructor(RepoNoConsumen: {   
        NombreConcesionario              :string;
        PaternoConcesionario             :string;
        MaternoConcesionario             :string;
        Telefono                         :string;
        Celular                          :string;
        email                            :string;
        Calle                            :string;
        Exterior                         :string;
        Interior                         :string;
        Colonia                          :string;
        CP                               :string;
        Municipio                        :string;
        EntidadFederativa                :string;
        Sindicato                        :string;
        Marca                            :string;
        Submarca                         :string;
        Modelo                           :number;
        NumeroEconomico                  :number;
        Placa                            :string;
        NombreOperador                   :string;
        PaternoOperador                  :string;
        MaternoOperador                  :string;
        FechaInicio                      :string;
        FechaCorte                       :string;
        ImporteAhorroConcesionario       :string;
        ImporteAhorroPropietario         :string;
        LitrosConsumirMes                :string;
        LitrosConsumidosOperador         :string;
        LitrosConsumidosVehiculo         :string;
        LitrosConsumidosPendiente        :string;}){
            this.NombreConcesionario              = RepoNoConsumen.NombreConcesionario         ;
            this.PaternoConcesionario             = RepoNoConsumen.PaternoConcesionario        ;
            this.MaternoConcesionario             = RepoNoConsumen.MaternoConcesionario        ;
            this.Telefono                         = RepoNoConsumen.Telefono                    ;
            this.Celular                          = RepoNoConsumen.Celular                     ;
            this.email                            = RepoNoConsumen.email                       ;
            this.Calle                            = RepoNoConsumen.Calle                       ;
            this.Exterior                         = RepoNoConsumen.Exterior                    ;
            this.Interior                         = RepoNoConsumen.Interior                    ;
            this.Colonia                          = RepoNoConsumen.Colonia                     ;
            this.CP                               = RepoNoConsumen.CP                          ;
            this.Municipio                        = RepoNoConsumen.Municipio                   ;
            this.EntidadFederativa                = RepoNoConsumen.EntidadFederativa           ;
            this.Sindicato                        = RepoNoConsumen.Sindicato                   ;
            this.Marca                            = RepoNoConsumen.Marca                       ;
            this.Submarca                         = RepoNoConsumen.Submarca                    ;
            this.Modelo                           = RepoNoConsumen.Modelo                      ;
            this.NumeroEconomico                  = RepoNoConsumen.NumeroEconomico             ;
            this.Placa                            = RepoNoConsumen.Placa                       ;
            this.NombreOperador                   = RepoNoConsumen.NombreOperador              ;
            this.PaternoOperador                  = RepoNoConsumen.PaternoOperador             ;
            this.MaternoOperador                  = RepoNoConsumen.MaternoOperador             ;
            this.FechaInicio                      = RepoNoConsumen.FechaInicio                 ;
            this.FechaCorte                       = RepoNoConsumen.FechaCorte                  ;
            this.ImporteAhorroConcesionario       = RepoNoConsumen.ImporteAhorroConcesionario  ;
            this.ImporteAhorroPropietario         = RepoNoConsumen.ImporteAhorroPropietario    ;
            this.LitrosConsumirMes                = RepoNoConsumen.LitrosConsumirMes           ;
            this.LitrosConsumidosOperador         = RepoNoConsumen.LitrosConsumidosOperador    ;
            this.LitrosConsumidosVehiculo         = RepoNoConsumen.LitrosConsumidosVehiculo    ;
            this.LitrosConsumidosPendiente        = RepoNoConsumen.LitrosConsumidosPendiente   ;               
    }    
}


export class RepoVtasRecaudadas {
    Estacion                         :string;
    Localidad                        :string;
    NombreEmpleado                   :string;
    PaternoEmpleado                  :string;
    MaternoEmpleado                  :string;
    FechaConsumo                     :string;
    PrecioGas                        :string;
    LitrosVendidos                   :string;
    AhorroConcesionario              :string;
    AhorroPropietario                :string;
    TotalRetencionAhorros            :string;
    AhorroOperadores                 :string;

    constructor(RepoVtasRecaudadas: {   
        Estacion                         :string;
        Localidad                        :string;
        NombreEmpleado                   :string;
        PaternoEmpleado                  :string;
        MaternoEmpleado                  :string;
        FechaConsumo                     :string;
        PrecioGas                        :string;
        LitrosVendidos                   :string;
        AhorroConcesionario              :string;
        AhorroPropietario                :string;
        TotalRetencionAhorros            :string;
        AhorroOperadores                 :string;}){
            this.Estacion                      = RepoVtasRecaudadas.Estacion             ;
            this.Localidad                     = RepoVtasRecaudadas.Localidad            ;
            this.NombreEmpleado                = RepoVtasRecaudadas.NombreEmpleado       ;
            this.PaternoEmpleado               = RepoVtasRecaudadas.PaternoEmpleado      ;
            this.MaternoEmpleado               = RepoVtasRecaudadas.MaternoEmpleado      ;
            this.FechaConsumo                  = RepoVtasRecaudadas.FechaConsumo         ;
            this.PrecioGas                     = RepoVtasRecaudadas.PrecioGas            ;
            this.LitrosVendidos                = RepoVtasRecaudadas.LitrosVendidos       ;
            this.AhorroConcesionario           = RepoVtasRecaudadas.AhorroConcesionario  ;
            this.AhorroPropietario             = RepoVtasRecaudadas.AhorroPropietario    ;
            this.TotalRetencionAhorros         = RepoVtasRecaudadas.TotalRetencionAhorros;
            this.AhorroOperadores              = RepoVtasRecaudadas.AhorroOperadores     ;                         
    }    
}

export class RepoConsumoEstaciones {
    Empresa                          :string;    
    Estacion                         :string;
    Periodo                          :string;
    TotalMovimientos                 :string;
    Litros                           :string;
    ImporteCobrado                   :string;

    constructor(RepoConsumoEstaciones: {   
        Empresa                          :string;    
        Estacion                         :string;
        Periodo                          :string;
        TotalMovimientos                 :string;
        Litros                           :string;
        ImporteCobrado                   :string;}){
            this.Empresa                 = RepoConsumoEstaciones.Empresa          ;
            this.Estacion                = RepoConsumoEstaciones.Estacion         ;
            this.Periodo                 = RepoConsumoEstaciones.Periodo          ;
            this.TotalMovimientos        = RepoConsumoEstaciones.TotalMovimientos ;
            this.Litros                  = RepoConsumoEstaciones.Litros           ;
            this.ImporteCobrado          = RepoConsumoEstaciones.ImporteCobrado   ;                                     
    }    
}

export class RepoContratosSinCita {
    IdConcesionario               :number;
    Concesionario                 :string;
    Marca                         :string;
    Submarca                      :string;
    Modelo                        :number;
    VIN                           :string;
    Placa                         :string;
    Sindicato                     :string;
    FechaContrato                 :string;
    DiasTranscurridos             :number;
    Aviso                         :string;

    constructor(RepoContratosSinCita: {
        IdConcesionario               :number;
        Concesionario                 :string;
        Marca                         :string;
        Submarca                      :string;
        Modelo                        :number;
        VIN                           :string;
        Placa                         :string;
        Sindicato                     :string;
        FechaContrato                 :string;
        DiasTranscurridos             :number;
        Aviso                         :string;}){
            this.IdConcesionario          = RepoContratosSinCita.IdConcesionario     ;
            this.Concesionario            = RepoContratosSinCita.Concesionario       ;
            this.Marca                    = RepoContratosSinCita.Marca               ;
            this.Submarca                 = RepoContratosSinCita.Submarca            ;
            this.Modelo                   = RepoContratosSinCita.Modelo              ;
            this.VIN                      = RepoContratosSinCita.VIN                 ;
            this.Placa                    = RepoContratosSinCita.Placa               ;
            this.Sindicato                = RepoContratosSinCita.Sindicato           ;
            this.FechaContrato            = RepoContratosSinCita.FechaContrato       ;
            this.DiasTranscurridos        = RepoContratosSinCita.DiasTranscurridos   ;
            this.Aviso                    = RepoContratosSinCita.Aviso               ;                                               
    }    
}


export class RepoAnalisisSitCita{
    Fecha                            :string;    
    Registros                        :number;
    Alerta                           :string;

    constructor(RepoAnalisisSitCita: {   
        Fecha                           :string;    
        Registros                       :number;
        Alerta                          :string;}){
            this.Fecha                   = RepoAnalisisSitCita.Fecha          ;
            this.Registros               = RepoAnalisisSitCita.Registros         ;
            this.Alerta                  = RepoAnalisisSitCita.Alerta          ;
    }    
}

export class RepoConsumoItAhorro {
    Concesionario                 :string;
    Marca                         :string;
    Modelo                        :number;
    Serie                         :string;
    Placa                         :string;
    Sindicato                     :string;
    PorcAhorroConcesion           :string;
    PorcAhorroPropietario         :string;
    FechaInicio                   :string;
    FechaCorte                    :string;
    ConsumoMes                    :string;
    ConsumoTotal                  :string;
    AhorroUtilizado               :string;
    constructor(RepoConsumoItAhorro: {   
        Concesionario                 :string;
        Marca                         :string;
        Modelo                        :number;
        Serie                         :string;
        Placa                         :string;
        Sindicato                     :string;
        PorcAhorroConcesion           :string;
        PorcAhorroPropietario         :string;
        FechaInicio                   :string;
        FechaCorte                    :string;
        ConsumoMes                    :string;
        ConsumoTotal                  :string;
        AhorroUtilizado               :string;
    }){
        this.Concesionario                 = RepoConsumoItAhorro.Concesionario            ;
        this.Marca                         = RepoConsumoItAhorro.Marca                    ;
        this.Modelo                        = RepoConsumoItAhorro.Modelo                   ;
        this.Serie                         = RepoConsumoItAhorro.Serie                    ;
        this.Placa                         = RepoConsumoItAhorro.Placa                    ;
        this.Sindicato                     = RepoConsumoItAhorro.Sindicato                ;
        this.PorcAhorroConcesion           = RepoConsumoItAhorro.PorcAhorroConcesion      ;
        this.PorcAhorroPropietario         = RepoConsumoItAhorro.PorcAhorroPropietario    ;
        this.FechaInicio                   = RepoConsumoItAhorro.FechaInicio              ;
        this.FechaCorte                    = RepoConsumoItAhorro.FechaCorte               ;
        this.ConsumoMes                    = RepoConsumoItAhorro.ConsumoMes               ;
        this.ConsumoTotal                  = RepoConsumoItAhorro.ConsumoTotal             ;
        this.AhorroUtilizado               = RepoConsumoItAhorro.AhorroUtilizado          ;                                
    }    
}

export class RepoBeneficioSalud {
    Concesionario                 :string;
    Marca                         :string;
    Modelo                        :number;
    Serie                         :string;
    Placa                         :string;
    Operador                      :string;
    constructor(RepoBeneficioSalud: {   
        Concesionario                 :string;
        Marca                         :string;
        Modelo                        :number;
        Serie                         :string;
        Placa                         :string;
        Operador                      :string;
    }){
        this.Concesionario                 = RepoBeneficioSalud.Concesionario            ;
        this.Marca                         = RepoBeneficioSalud.Marca                    ;
        this.Modelo                        = RepoBeneficioSalud.Modelo                   ;
        this.Serie                         = RepoBeneficioSalud.Serie                    ;
        this.Placa                         = RepoBeneficioSalud.Placa                    ;
        this.Operador                      = RepoBeneficioSalud.Operador                 ;
                                
    }    
}

export class RepoVigentes {

    IdContrato	 					:number;
    IdConcesionario	                :number;
    NumeroConcesion					:string;
    Concesionario					:string;
    email							:string;
    Telefono						:string;
    FechaInicio						:string;
    FechaTermino					:string;
    ConsumoMes	                    :number;
    Periodos						:number;
    FechaContrato					:string;
    Empresa							:string;
    TipoConvertidor					:string;
    Convertidor						:string;
    TipoVehiculo					:string;
    Vehiculo						:number;
    LitrosConsumidos				:number;
    LitroXConsumir                  :number;
    PorcentajeConsumo				:number;
    
    constructor(repoVigentes: {   
        IdContrato	 					:number;
        IdConcesionario	                :number;
        NumeroConcesion					:string;
        Concesionario					:string;
        email							:string;
        Telefono						:string;
        FechaInicio						:string;
        FechaTermino					:string;
        ConsumoMes	                    :number;
        Periodos						:number;
        FechaContrato					:string;
        Empresa							:string;
        TipoConvertidor					:string;
        Convertidor						:string;
        TipoVehiculo					:string;
        Vehiculo						:number;
        LitrosConsumidos				:number;
        LitroXConsumir                  :number;
        PorcentajeConsumo				:number;
    }){
        this.IdContrato	 							= repoVigentes.IdContrato	 	  ;
        this.IdConcesionario						= repoVigentes.IdConcesionario	  ;
        this.NumeroConcesion						= repoVigentes.NumeroConcesion	  ;
        this.Concesionario							= repoVigentes.Concesionario	  ;
        this.email									= repoVigentes.email			  ;
        this.Telefono								= repoVigentes.Telefono			  ;
        this.FechaInicio							= repoVigentes.FechaInicio		  ;
        this.FechaTermino							= repoVigentes.FechaTermino		  ;
        this.ConsumoMes	      				    	= repoVigentes.ConsumoMes	      ;
        this.Periodos								= repoVigentes.Periodos			  ;
        this.FechaContrato							= repoVigentes.FechaContrato	  ;
        this.Empresa								= repoVigentes.Empresa			  ;
        this.TipoConvertidor						= repoVigentes.TipoConvertidor	  ;
        this.Convertidor							= repoVigentes.Convertidor		  ;
        this.TipoVehiculo							= repoVigentes.TipoVehiculo		  ;
        this.Vehiculo								= repoVigentes.Vehiculo			  ;
        this.LitrosConsumidos						= repoVigentes.LitrosConsumidos	  ;
        this.LitroXConsumir   					    = repoVigentes.LitroXConsumir     ;
        this.PorcentajeConsumo					    = repoVigentes.PorcentajeConsumo  ;                               
    }    
}


export class RepoPilotoPorVencer {
    IdConcesionario                :number;
    NombreCompleto                 :string;
    Telefono                       :string;
    Email                          :string;
    NombreSM                       :string;
    NombreM                        :string;
    IdVehiculo                     :number;
    Placa                          :string;
    FechaInicio			    	   :string;
    FechaTermino			       :string;

    constructor(RepoPilotoPorVencer: {   
        IdConcesionario                :number;        
        NombreCompleto                 :string;
        Telefono                       :string;
        Email                          :string;
        NombreSM                       :string;
        NombreM                        :string;
        IdVehiculo                     :number;
        Placa                          :string;
        FechaInicio			    	   :string;
        FechaTermino			       :string;
    }){
        this.IdConcesionario             = RepoPilotoPorVencer.IdConcesionario   ;        
        this.NombreCompleto              = RepoPilotoPorVencer.NombreCompleto    ;
        this.Telefono                    = RepoPilotoPorVencer.Telefono          ;
        this.Email                       = RepoPilotoPorVencer.Email             ;
        this.NombreSM                    = RepoPilotoPorVencer.NombreSM          ;
        this.NombreM                     = RepoPilotoPorVencer.NombreM           ;
        this.IdVehiculo                  = RepoPilotoPorVencer.IdVehiculo        ;
        this.Placa                       = RepoPilotoPorVencer.Placa             ;
        this.FechaInicio		         = RepoPilotoPorVencer.FechaInicio		 ;
        this.FechaTermino		         = RepoPilotoPorVencer.FechaTermino		 ;        
    }    
}




