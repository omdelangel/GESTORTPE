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