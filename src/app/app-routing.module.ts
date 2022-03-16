import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './_components/login';
import { SidenavComponent } from './_components/sidenav/sidenav.component';
import { AuthGuard } from './_guards/auth.guard';
import { QRComponent } from './_components/qr/qr.component';
import { EstacionesComponent } from './_components/estaciones';
import { SindicatosComponent } from './_components/sindicatos';
import { InicioComponent } from './_components/inicio';
import { ReimpresionQRComponent } from './_components/reimpresion-qr';
import { RepoSitActualConceComponent } from './_components/repo-sit-actual-conce';
import { ConsultaPreregistroComponent } from './_components/consulta-preregistro';
import { ConsultaRegistroComponent } from './_components/consulta-registro';
import { RevisiondocumentosComponent } from './_components/revisiondocumentos';
import { CatDictamenesComponent } from './_catalogos/cat-dictamenes';
import { ConsultaUsuariosComponent } from './_catalogos/consulta-usuarios'
import { RepoTaxiVanConvComponent } from './_components/repo-taxi-van-conv/repo-taxi-van-conv.component';
import { RepoSinConcluirComponent } from './_components/repo-sin-concluir/repo-sin-concluir.component';
import { FormalizacionComponent } from './_components/formalizacion/formalizacion.component';
import { InicioBienvenidosComponent } from './_components/inicio-bienvenidos/inicio-bienvenidos.component';






const routes: Routes = [
  { path: '', redirectTo: 'login', data: {title: 'Login'}, pathMatch: 'full' },
  { path: 'login', component: LoginComponent},
  { path: 'sidenav', component: SidenavComponent, canActivate: [AuthGuard],
     children: [{ path: '', redirectTo: 'inicio', pathMatch: 'full'},
               { path: 'inicio', component: InicioComponent},
               { path: 'qr', component: QRComponent},
               { path: 'estaciones', component: EstacionesComponent},
               { path: 'sindicatos', component: SindicatosComponent},
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
               { path: 'bienvenidos', component: InicioBienvenidosComponent},
                            
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
