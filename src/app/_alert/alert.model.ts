export class Alert {
    type!: AlertType;
    message!: string;
    icono!: string;
}
 
export enum AlertType {
    Success,
    Error,
    Info,
    Warning
}