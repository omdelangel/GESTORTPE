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
