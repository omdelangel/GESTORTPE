export class EstadoProceso {
    Flujo: string;
    Estado: string;
    Estatus: string;
    Tramites: number;

    constructor(estadoProceso: { Flujo: string; Estado: string, Estatus : string, Tramites: number}){
        this.Flujo = estadoProceso.Flujo;
        this.Estado = estadoProceso.Estado;
        this.Estatus = estadoProceso.Estatus;
        this.Tramites = estadoProceso.Tramites;
    }    
}
