import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams  } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }


  obtenDashboard(IdDashboard : number): Observable <any>{

    let params = new HttpParams();
    params = params.append('IdConsulta', IdDashboard);
    
    return this.http.get<any>( `${environment.SERVER_URL}/dashboard` , {params : params} )
    
    //return this.http.get<any>( `http://localhost:4042/dashboard` , {params : params} )
      .pipe(map((res: Response) => {
        return res || {}
      }),
      catchError(this.handleError)
    )
  }

    // Error
  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  }
}
