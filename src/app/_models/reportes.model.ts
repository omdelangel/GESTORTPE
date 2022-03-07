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

