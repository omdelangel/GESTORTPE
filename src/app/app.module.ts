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
import { InicioComponent } from './_components/inicio/inicio.component';
import { MenuListItemComponent } from './_components/menu-list-item/menu-list-item.component';
import { SharingService } from './_services';
import { ReimpresionQRComponent } from './_components/reimpresion-qr/reimpresion-qr.component';
import { PdfViewerComponent } from './_components/pdf-viewer/pdf-viewer.component';
import { ConfirmationDialogComponent } from './_components/confirmation-dialog/confirmation-dialog.component';
import { RepoSitActualConceComponent } from './_reportes/repo-sit-actual-conce/repo-sit-actual-conce.component';
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
import { RepoTaxiVanConvComponent } from './_reportes/repo-taxi-van-conv/repo-taxi-van-conv.component'; 
import { FormalizacionComponent } from './_components/formalizacion/formalizacion.component';
import { PieChartComponent } from './_dashboard/pie-chart/pie-chart.component'; 
import { DashboardCardsComponent } from './_dashboard/dashboard-cards/dashboard-cards.component';
import { TendenciaChartComponent } from './_dashboard/tendencia-chart/tendencia-chart.component';
import { InstalacionesTipoVehiculoChartComponent } from './_dashboard/instalaciones-tipo-vehiculo-chart/instalaciones-tipo-vehiculo-chart.component';
import { EstadoProcesoComponent } from './_dashboard/estado-proceso/estado-proceso.component';
import { RepoSinConcluirComponent } from './_reportes/repo-sin-concluir/repo-sin-concluir.component'; 
import { DialogoConfirmaInstalacionComponent } from './_components/dialogo-confirma-instalacion/dialogo-confirma-instalacion.component';
import { PrecioGasComponent } from './_catalogos/precio-gas/precio-gas.component';
import { PrecioGasolinaComponent } from './_catalogos/precio-gasolina/precio-gasolina.component'; 
import { InicioBienvenidosComponent } from './_components/inicio-bienvenidos/inicio-bienvenidos.component';
import { AltaPreciosGasComponent } from './_catalogos/alta-precios-gas/alta-precios-gas.component';
import { RepoAhorroPeriodoComponent } from './_reportes/repo-ahorro-periodo/repo-ahorro-periodo.component';
import { RepoNoConsumenComponent } from './_reportes/repo-no-consumen/repo-no-consumen.component';
import { RepoVtasRecaudadasComponent } from './_reportes/repo-vtas-recaudadas/repo-vtas-recaudadas.component';
import { RepoConsumoEstacionesComponent } from './_reportes/repo-consumo-estaciones/repo-consumo-estaciones.component';
import { RepoContratosSinCitaComponent } from './_reportes/repo-contratos-sin-cita/repo-contratos-sin-cita.component';
import { RepoConsumoItAhorroComponent } from './_reportes/repo-consumo-it-ahorro/repo-consumo-it-ahorro.component';
import { RepoConsumoItIncompletoComponent } from './_reportes/repo-consumo-it-incompleto/repo-consumo-it-incompleto.component';
import { RepoAnalisisSitCitaComponent } from './_reportes/repo-analisis-sit-cita/repo-analisis-sit-cita.component';
import { RepoBeneficioSaludComponent } from './_reportes/repo-beneficio-salud/repo-beneficio-salud.component';
import { OperadoresComponent } from './_components/operadores/operadores.component';
import { DialogoOperadorEditaComponent } from './_components/dialogo-operador-edita/dialogo-operador-edita.component';
import { OperadoresAltaComponent } from './_components/operadores-alta/operadores-alta.component';
import { ConsultaSindicatosComponent } from './_catalogos/consulta-sindicatos/consulta-sindicatos.component';
import { AltaSindicatosComponent } from './_catalogos/alta-sindicatos/alta-sindicatos.component';
import { EdicionSindicatosComponent } from './_catalogos/edicion-sindicatos/edicion-sindicatos.component';
import { ConsultaEstacionesComponent } from './_catalogos/consulta-estaciones/consulta-estaciones.component';
import { ConsultaTalleresComponent } from './_catalogos/consulta-talleres/consulta-talleres.component';
import { AltaEstacionesComponent } from './_catalogos/alta-estaciones/alta-estaciones.component';
import { AltaTalleresComponent } from './_catalogos/alta-talleres/alta-talleres.component';
import { EdicionEstacionesComponent } from './_catalogos/edicion-estaciones/edicion-estaciones.component';
import { EdicionTalleresComponent } from './_catalogos/edicion-talleres/edicion-talleres.component';
import { VigentesComponent } from './_components/vigentes/vigentes.component';
import { ConsumoMetaComponent } from './_dashboard/consumo-meta/consumo-meta.component';
import { ContratosNoconsumoComponent } from './_dashboard/contratos-noconsumo/contratos-noconsumo.component';
import { ConsultaMarcasComponent } from './_catalogos/consulta-marcas/consulta-marcas.component';
import { RepoPilotoPorVencerComponent } from './_piloto/repo-piloto-por-vencer/repo-piloto-por-vencer.component';
import { AltaMarcaSubmarcaComponent } from './_catalogos/alta-marca-submarca/alta-marca-submarca.component';
import { EdicionMarcaSubmarcaComponent } from './_catalogos/edicion-marca-submarca/edicion-marca-submarca.component';
import { ImgViewerComponent } from './_catalogos/img-viewer/img-viewer.component';
import { PilotoComponent } from './_piloto/piloto/piloto.component';
import { DialogoConfirmacionPilotoComponent } from './_piloto/dialogo-confirmacion-piloto/dialogo-confirmacion-piloto.component';
import { DialogoContratoPilotoComponent } from './_piloto/dialogo-contrato-piloto/dialogo-contrato-piloto.component';
import { DialogoDocumentosRegistroPilotoComponent } from './_piloto/dialogo-documentos-registro-piloto/dialogo-documentos-registro-piloto.component';
import { DialogoTalleresPilotoComponent } from './_piloto/dialogo-talleres-piloto/dialogo-talleres-piloto.component';
import { AltacitaPilotoComponent } from './_piloto/altacita-piloto/altacita-piloto.component';
import { DialogoConfirmaDesinstalacionPilotoComponent } from './_piloto/dialogo-confirma-desinstalacion-piloto/dialogo-confirma-desinstalacion-piloto.component';
import { EdicionCitaPilotoComponent } from './_piloto/edicion-cita-piloto/edicion-cita-piloto.component';
import { AltaEmpresaPilotoComponent } from './_piloto/alta-empresa-piloto/alta-empresa-piloto.component';
import { ConsultaEmpresaPilotoComponent } from './_piloto/consulta-empresa-piloto/consulta-empresa-piloto.component';
import { AltaPreciosGasolinaComponent } from './_catalogos/alta-precios-gasolina/alta-precios-gasolina.component';
import { AltaCobradoresComponent } from './_catalogos/alta-cobradores/alta-cobradores.component';
import { ConsultaCobradoresComponent } from './_catalogos/consulta-cobradores/consulta-cobradores.component';
import { EdicionCobradoresComponent } from './_catalogos/edicion-cobradores/edicion-cobradores.component';
import { IncidentesComponent } from './_incidentes/incidentes/incidentes.component';
import { PagosComponent } from './_components/pagos/pagos.component';
import { DialogoPagosComponent } from './_components/dialogo-pagos/dialogo-pagos.component';
import { NgxCurrencyModule } from "ngx-currency";
import { DocumentosIncidentesComponent } from './_incidentes/documentos-incidentes/documentos-incidentes.component';


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
    RepoTaxiVanConvComponent,
    FormalizacionComponent,
    TendenciaChartComponent,
    InstalacionesTipoVehiculoChartComponent,
    EstadoProcesoComponent,
    RepoSinConcluirComponent,
    DialogoConfirmaInstalacionComponent,
    InicioBienvenidosComponent,
    RepoAhorroPeriodoComponent,
    PrecioGasComponent,
    PrecioGasolinaComponent,
    InicioBienvenidosComponent,
    RepoNoConsumenComponent,
    AltaPreciosGasComponent,
    RepoVtasRecaudadasComponent,
    RepoConsumoEstacionesComponent,
    RepoContratosSinCitaComponent,
    RepoConsumoItAhorroComponent,
    RepoConsumoItIncompletoComponent,
    RepoAnalisisSitCitaComponent,
    RepoBeneficioSaludComponent,
    OperadoresComponent,
    DialogoOperadorEditaComponent,
    OperadoresAltaComponent,
    ConsultaSindicatosComponent,
    AltaSindicatosComponent,
    EdicionSindicatosComponent,
    ConsultaEstacionesComponent,
    ConsultaTalleresComponent,
    AltaEstacionesComponent,
    AltaTalleresComponent,
    EdicionEstacionesComponent,
    EdicionTalleresComponent,
    VigentesComponent,
    ConsumoMetaComponent,
    ContratosNoconsumoComponent,
    ConsultaMarcasComponent,
    RepoPilotoPorVencerComponent,
    AltaMarcaSubmarcaComponent,
    EdicionMarcaSubmarcaComponent,
    ImgViewerComponent,
    PilotoComponent,
    DialogoConfirmacionPilotoComponent,
    DialogoContratoPilotoComponent,
    DialogoDocumentosRegistroPilotoComponent,
    DialogoTalleresPilotoComponent,
    AltacitaPilotoComponent,
    DialogoConfirmaDesinstalacionPilotoComponent,
    EdicionCitaPilotoComponent,
    AltaEmpresaPilotoComponent,
    ConsultaEmpresaPilotoComponent,
    AltaPreciosGasolinaComponent,
    AltaCobradoresComponent,
    ConsultaCobradoresComponent,
    EdicionCobradoresComponent,
    IncidentesComponent,
    PagosComponent,
    DialogoPagosComponent,
    DocumentosIncidentesComponent
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
    NgxCurrencyModule,
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


