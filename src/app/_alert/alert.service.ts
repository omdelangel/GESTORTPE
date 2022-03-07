import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';
 
import { Alert, AlertType } from '../_alert/alert.model';

@Injectable({ providedIn: 'root' })
export class AlertService {
    private subject = new Subject<Alert>();
    private keepAfterRouteChange = false;
 
    constructor(private router: Router) {
        // clear alert messages on route change unless 'keepAfterRouteChange' flag is true
        router.events.subscribe(event => {
            if (event instanceof NavigationStart) {
                if (this.keepAfterRouteChange) {
                    // only keep for a single route change
                    this.keepAfterRouteChange = false;
                } else {
                    // clear alert messages
                    this.clear();
                }
            }
        });
    }
 
    getAlert(): Observable<any> {
        return this.subject.asObservable();
    }
 
    success(message: string, icono: string, keepAfterRouteChange = false) {
        this.alert(AlertType.Success, message, icono, keepAfterRouteChange);
    }
 
    error(message: string, icono: string, keepAfterRouteChange = false) {
        this.alert(AlertType.Error, message, icono, keepAfterRouteChange);
    }
 
    info(message: string, icono: string, keepAfterRouteChange = false) {
        this.alert(AlertType.Info, message, icono, keepAfterRouteChange);
    }
 
    warn(message: string, icono: string, keepAfterRouteChange = false) {
        this.alert(AlertType.Warning, message, icono, keepAfterRouteChange);
    }
 
    alert(type: AlertType, message: string, icono: string, keepAfterRouteChange = false) {
        this.keepAfterRouteChange = keepAfterRouteChange;
        this.subject.next(<Alert>{ type: type, message: message, icono });
    }
 
    clear() {
        // clear alerts
        this.subject.next();
    }

}