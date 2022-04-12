import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './_components/login';
import { SidenavComponent } from './_components/sidenav/sidenav.component';
import { AuthGuard } from './_guards/auth.guard';
import { QRComponent } from './_components/qr/qr.component';
import { InicioComponent } from './_components/inicio';
import { ReimpresionQRComponent } from './_components/reimpresion-qr';
import { RepoSitActualConceComponent } from './_reportes/repo-sit-actual-conce';
import { ConsultaPreregistroComponent } from './_components/consulta-preregistro';
import { ConsultaRegistroComponent } from './_components/consulta-registro';
import { RevisiondocumentosComponent } from './_components/revisiondocumentos';
import { CatDictamenesComponent } from './_catalogos/cat-dictamenes';
import { ConsultaUsuariosComponent } from './_catalogos/consulta-usuarios'
import { RepoTaxiVanConvComponent } from './_reportes/repo-taxi-van-conv/repo-taxi-van-conv.component';
import { RepoSinConcluirComponent } from './_reportes/repo-sin-concluir/repo-sin-concluir.component';
import { FormalizacionComponent } from './_components/formalizacion/formalizacion.component';
import { PrecioGasComponent } from './_catalogos/precio-gas';
import { PrecioGasolinaComponent } from './_catalogos/precio-gasolina';
//import { InicioBienvenidosComponent } from './_components/inicio-bienvenidos/inicio-bienvenidos.component';
import { RepoAhorroPeriodoComponent } from './_reportes/repo-ahorro-periodo/repo-ahorro-periodo.component';
import { RepoNoConsumenComponent } from './_reportes/repo-no-consumen/repo-no-consumen.component';
import { RepoVtasRecaudadasComponent } from './_reportes/repo-vtas-recaudadas/repo-vtas-recaudadas.component';
import { RepoConsumoEstacionesComponent } from './_reportes/repo-consumo-estaciones/repo-consumo-estaciones.component';
import { RepoContratosSinCitaComponent } from './_reportes/repo-contratos-sin-cita/repo-contratos-sin-cita.component';
import { RepoAnalisisSitCitaComponent } from './_reportes/repo-analisis-sit-cita/repo-analisis-sit-cita.component';
import { RepoConsumoItAhorroComponent } from './_reportes/repo-consumo-it-ahorro/repo-consumo-it-ahorro.component';
import { RepoConsumoItIncompletoComponent } from './_reportes/repo-consumo-it-incompleto/repo-consumo-it-incompleto.component';
import { RepoBeneficioSaludComponent } from './_reportes/repo-beneficio-salud/repo-beneficio-salud.component';
import { OperadoresComponent } from './_components/operadores/operadores.component';
import { ConsultaSindicatosComponent } from './_catalogos/consulta-sindicatos/consulta-sindicatos.component';
import { ConsultaEstacionesComponent } from './_catalogos/consulta-estaciones/consulta-estaciones.component';
import { ConsultaTalleresComponent } from './_catalogos/consulta-talleres/consulta-talleres.component';
import { VigentesComponent } from './_components/vigentes/vigentes.component'
import { ConsultaMarcasComponent } from './_catalogos/consulta-marcas/consulta-marcas.component';
import { RepoPilotoPorVencerComponent } from './_piloto/repo-piloto-por-vencer/repo-piloto-por-vencer.component';
import { PilotoComponent } from './_piloto/piloto';
import { ConsultaEmpresaPilotoComponent } from './_piloto/consulta-empresa-piloto';


const routes: Routes = [
  { path: '', redirectTo: 'login', data: {title: 'Login'}, pathMatch: 'full' },
  { path: 'login', component: LoginComponent},
  { path: 'sidenav', component: SidenavComponent, canActivate: [AuthGuard],
     children: [{ path: '', redirectTo: 'inicio', pathMatch: 'full'},
               { path: 'inicio', component: InicioComponent},
               { path: 'qr', component: QRComponent},
               { path: 'reimpresionQR', component: ReimpresionQRComponent },
               { path: 'repoSitActConce', component: RepoSitActualConceComponent },
               { path: 'preRegistro', component: ConsultaPreregistroComponent},
               { path: 'registro', component: ConsultaRegistroComponent},
               { path: 'revisaDocumentos', component: RevisiondocumentosComponent},
               { path: 'dictamenes', component: CatDictamenesComponent},
               { path: 'usuarios', component: ConsultaUsuariosComponent},
               { path: 'repoAutosConvertidos', component: RepoTaxiVanConvComponent },
               { path: 'repoSinConcluir', component: RepoSinConcluirComponent },
               { path: 'formalizacion', component: FormalizacionComponent},
               { path: 'precioGas', component: PrecioGasComponent},
               { path: 'precioGasolina', component: PrecioGasolinaComponent},
              // { path: 'bienvenidos', component: InicioBienvenidosComponent},
               { path: 'repoAhorroPeriodo', component: RepoAhorroPeriodoComponent},
               { path: 'repoNoConsumen', component: RepoNoConsumenComponent},
               { path: 'repoVtasRecaudadas', component: RepoVtasRecaudadasComponent},
               { path: 'repoConsumoEstaciones', component: RepoConsumoEstacionesComponent}, 
               { path: 'CtosSinCita', component: RepoContratosSinCitaComponent},
               { path: 'AnalisisCita', component: RepoAnalisisSitCitaComponent},
               { path: 'ConsumoItAhorro', component: RepoConsumoItAhorroComponent},
               { path: 'ConsumoItIncompleto', component: RepoConsumoItIncompletoComponent},
               { path: 'BeneficioSalud', component: RepoBeneficioSaludComponent},
               { path: 'repoConsumoEstaciones', component: RepoConsumoEstacionesComponent},   
               { path: 'operadores', component: OperadoresComponent},
               { path: 'sindicatos', component: ConsultaSindicatosComponent},        
               { path: 'estaciones', component: ConsultaEstacionesComponent},        
               { path: 'talleres', component: ConsultaTalleresComponent},  
               { path: 'vigentes', component: VigentesComponent },    
               { path: 'marcas', component: ConsultaMarcasComponent },
               { path: 'repoPilotoPorVencer', component: RepoPilotoPorVencerComponent },
               { path: 'vigentes', component: VigentesComponent },  
               { path: 'piloto', component: PilotoComponent},    
               { path: 'EmpresaPiloto', component: ConsultaEmpresaPilotoComponent},    
               ]},  
 
 
   // otherwise redirect to home
  // { path: '**', redirectTo: 'login' }
   { path: '**', redirectTo: 'login', pathMatch: 'full' }
 ];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash: true,
  })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
