import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule}    from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidenavComponent } from './_components/sidenav/sidenav.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NavService } from './_components/sidenav/nav-service';
import { MaterialModule } from './material.module';
import { LoginComponent } from './_components/login/login.component';
import { AlertModule } from './_alert/';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './_helpers/authconfig.inteceptor';
import { QrCodeModule } from 'ng-qrcode';
import { QRComponent } from './_components/qr/qr.component';
import { EstacionesComponent } from './_components/estaciones/estaciones.component';
import { SindicatosComponent } from './_components/sindicatos/sindicatos.component';
import { InicioComponent } from './_components/inicio/inicio.component';
import { MenuListItemComponent } from './_components/menu-list-item/menu-list-item.component';
import { SharingService } from './_services';
import { ReimpresionQRComponent } from './_components/reimpresion-qr/reimpresion-qr.component';
import { PdfViewerComponent } from './_components/pdf-viewer/pdf-viewer.component';
import { ConfirmationDialogComponent } from './_components/confirmation-dialog/confirmation-dialog.component';
import { RepoSitActualConceComponent } from './_components/repo-sit-actual-conce/repo-sit-actual-conce.component';
import { ConsultaPreregistroComponent } from './_components/consulta-preregistro/consulta-preregistro.component';
import { PreregistroDialogComponent } from './_components/preregistro-dialog/preregistro-dialog.component';
import { AltaconcesionarioComponent } from './_components/altaconcesionario/altaconcesionario.component';
import { AltavehiculoComponent } from './_components/altavehiculo/altavehiculo.component';
import { AltapropietarioComponent } from './_components/altapropietario/altapropietario.component';
import { AltacitaComponent } from './_components/altacita/altacita.component';

import { NgxMaskModule, IConfig } from 'ngx-mask';
import { PreregistroEdicionDialogComponent } from './_components/preregistro-edicion-dialog/preregistro-edicion-dialog.component';
import { EdicionconcesionarioComponent } from './_components/edicionconcesionario/edicionconcesionario.component';
import { EdicionpropietarioComponent } from './_components/edicionpropietario/edicionpropietario.component';
import { EdicionvehiculoComponent } from './_components/edicionvehiculo/edicionvehiculo.component';
import { DocumentosComponent } from './_components/documentos/documentos.component';
import { DocViewerComponent } from './_components/doc-viewer/doc-viewer.component';
import { TalleresComponent } from './_components/talleres/talleres.component';

import { FullCalendarModule } from '@fullcalendar/angular'; 
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { HoracitaDialogComponent } from './_components/horacita-dialog/horacita-dialog.component';
import { EdicionDocumentosComponent } from './_components/edicion-documentos/edicion-documentos.component';
import { EdicionCitaComponent } from './_components/edicion-cita/edicion-cita.component';
import { DialogoConfirmacionComponent } from './_components/dialogo-confirmacion/dialogo-confirmacion.component';
import { DialogoTalleresComponent } from './_components/dialogo-talleres/dialogo-talleres.component';
import { DialogoDictamencitaComponent } from './_components/dialogo-dictamencita/dialogo-dictamencita.component';
import { DictamenComponent } from './_components/dictamen/dictamen.component';
import { NotifierModule, NotifierOptions } from 'angular-notifier';
import { ConsultaRegistroComponent } from './_components/consulta-registro/consulta-registro.component';
import { DialogoContratoComponent } from './_components/dialogo-contrato/dialogo-contrato.component';
import { DialogoDocumentosRegistroComponent } from './_components/dialogo-documentos-registro';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { RevisiondocumentosComponent } from './_components/revisiondocumentos/revisiondocumentos.component';
import { CatDictamenesComponent  } from './_catalogos/cat-dictamenes';
import { CurrencyPipe } from '@angular/common';
import { ConsultaUsuariosComponent } from './_catalogos/consulta-usuarios/consulta-usuarios.component'; 
import { DialogoOperadorAltaComponent } from './_components/dialogo-operador-alta/dialogo-operador-alta.component';
import { AltaUsuariosComponent } from './_catalogos/alta-usuarios/alta-usuarios.component';
import { EdicionUsuariosComponent } from './_catalogos/edicion-usuarios/edicion-usuarios.component'; 

import { FormalizacionComponent } from './_components/formalizacion/formalizacion.component';

import { PieChartComponent } from './_dashboard/pie-chart/pie-chart.component'; 
import { DashboardCardsComponent } from './_dashboard/dashboard-cards/dashboard-cards.component';
import { TendenciaChartComponent } from './_dashboard/tendencia-chart/tendencia-chart.component';
import { InstalacionesTipoVehiculoChartComponent } from './_dashboard/instalaciones-tipo-vehiculo-chart/instalaciones-tipo-vehiculo-chart.component';
import { EstadoProcesoComponent } from './_dashboard/estado-proceso/estado-proceso.component';
import { DialogoConfirmaInstalacionComponent } from './_components/dialogo-confirma-instalacion/dialogo-confirma-instalacion.component'; 


/**
 * Custom angular notifier options
 */
 const customNotifierOptions: NotifierOptions = {
  position: {
		horizontal: {
			position: 'right',
			distance: 12
		},
		vertical: {
			position: 'bottom',
			distance: 12,
			gap: 10
		}
	},
  theme: 'material',
  behaviour: {
    autoHide: 5000,
    onClick: 'hide',
    onMouseover: 'pauseAutoHide',
    showDismissButton: true,
    stacking: 4
  },
  animations: {
    enabled: true,
    show: {
      preset: 'slide',
      speed: 300,
      easing: 'ease'
    },
    hide: {
      preset: 'fade',
      speed: 300,
      easing: 'ease',
      offset: 50
    },
    shift: {
      speed: 300,
      easing: 'ease'
    },
    overlap: 150
  }
};


 
FullCalendarModule.registerPlugins([ 
  interactionPlugin,
  dayGridPlugin
]);


@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    LoginComponent,
    QRComponent,
    EstacionesComponent,
    SindicatosComponent,
    InicioComponent,
    MenuListItemComponent,
    ReimpresionQRComponent,
    PdfViewerComponent,
    ConfirmationDialogComponent,
    RepoSitActualConceComponent,
    ConsultaPreregistroComponent,
    PreregistroDialogComponent,
    AltaconcesionarioComponent,
    AltavehiculoComponent,
    AltapropietarioComponent,
    AltacitaComponent,
    PreregistroEdicionDialogComponent,
    EdicionconcesionarioComponent,
    EdicionpropietarioComponent,
    EdicionvehiculoComponent,
    DocumentosComponent,
    DocViewerComponent,
    TalleresComponent,
    HoracitaDialogComponent,
    EdicionDocumentosComponent,
    EdicionCitaComponent,
    DialogoConfirmacionComponent,
    DialogoTalleresComponent,
    DialogoDictamencitaComponent,
    DictamenComponent,
    ConsultaRegistroComponent,
    DialogoContratoComponent,
    DialogoDocumentosRegistroComponent,
    RevisiondocumentosComponent,
    CatDictamenesComponent,
    ConsultaUsuariosComponent,
    DialogoOperadorAltaComponent,
    AltaUsuariosComponent,
    EdicionUsuariosComponent,
    DashboardCardsComponent,
    PieChartComponent,
    FormalizacionComponent,
    TendenciaChartComponent,
    InstalacionesTipoVehiculoChartComponent,
    EstadoProcesoComponent,
    DialogoConfirmaInstalacionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    AlertModule,
    ReactiveFormsModule,
    HttpClientModule,
    QrCodeModule,
    FlexLayoutModule,
    FullCalendarModule,
    PdfViewerModule,
    NgxExtendedPdfViewerModule,
    NotifierModule.withConfig(customNotifierOptions),
    NgxMaskModule.forRoot()
  ],
  schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    NavService, SharingService, CurrencyPipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
