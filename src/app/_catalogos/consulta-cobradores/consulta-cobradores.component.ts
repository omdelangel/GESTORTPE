import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder} from '@angular/forms';
import { first } from 'rxjs/operators';
import { CatalogoCobradores } from 'src/app/_models';
import { CatalogosService } from '../../_services';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { AltaCobradoresComponent } from '../alta-cobradores';
import { EdicionCobradoresComponent } from '../../_catalogos/edicion-cobradores';
import { NotifierService } from 'angular-notifier';
import { ImgViewerComponent } from '../../_catalogos/img-viewer/img-viewer.component'; 



@Component({
  selector: 'app-consulta-cobradores',
  templateUrl: './consulta-cobradores.component.html',
  styleUrls: ['./consulta-cobradores.component.scss']
})
export class ConsultaCobradoresComponent implements OnInit {
  private readonly notifier: NotifierService;

  disabled = false;
  //Columnas en Tabla de consulta
  displayedColumns = [
                  'Nombre'                ,
                  'Paterno'               ,
                  'Materno'               ,
                  'RFC'                   ,
                  'CURP'                  ,
                  'INE'                   ,
                  'FechaNacimiento'       ,
                  'TPNombre'              ,
                  'GNombre'               ,
                  'Domicilio'             ,
                  'Colonia'               ,
                  'CP'                    ,
                  'EFNombre'              ,
                  'MNombre'               ,
                  'Telefono'              ,
                  'email'                 ,
                  'ENombre'               ,
                  'Estatus'               , 
                  'actions'               ,
                  'archivoIMG'            ,
                  'actionsVer'            ,
                      ];                      
  dataSource!: MatTableDataSource<CatalogoCobradores>;

  //@ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  reactiveForm                    !:FormGroup;
  catalogoCobradores              :CatalogoCobradores[] = [];
  uploadedFiles                   !: Array<File>;

  constructor(
    public dialog                  :MatDialog,
    private catalogosService       :CatalogosService,
    private formBuilder            :FormBuilder,
    notifierService                :NotifierService) { 
    this.notifier                  = notifierService;   
    }

  ngOnInit(): void {

    this.getCatalogoCobradores();

  //Validación de campos en pantalla
    this.reactiveForm = this.formBuilder.group({
      'IdEmpleado '      :[''],
    });    
  }

  get g() { return this.reactiveForm.controls; }

  onSubmit() {
    if (this.reactiveForm.valid) {
  //console.log(this.reactiveForm.value)
    } else {
      return
    }
  }
  
  //Abre modal para Cobradores
    openDialog(): void {
      const dialogRef = this.dialog.open(AltaCobradoresComponent, {
        disableClose: true,
//        width: '1500px',
  //      height: '900px'
      });
  
      dialogRef.afterClosed().subscribe(res => {
        this.getCatalogoCobradores();
      });
    }


  //Consulta los datos de Usuarios
    getCatalogoCobradores(){
      this.catalogosService.getCatalogoCobradores()
        .pipe(first())
        .subscribe(data => {   
          console.log("Consulta Cobradores ")
          console.log(data)
          this.catalogoCobradores     = data.SEmpleadosLista;   
          console.log("Consulta catalogoCobradores    ")
          console.log(this.catalogoCobradores)
          this.dataSource           = new MatTableDataSource(this.catalogoCobradores);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort      = this.sort;
        },
          error => {  
          });
    }

  //cambiar valor de Bloqueo
    cambiaBloqueo(e: any){
      e.Bloqueado = !e.Bloqueado;
      this.catalogosService.getCatUsuBloqueado(e)
        .pipe(first())
        .subscribe(data => {   
          this.getCatalogoCobradores();
        },
          error => {  
          });
    }


  //Edita el registro de Dictamen
    editar(e: any) {
      const dialogRef = this.dialog.open(EdicionCobradoresComponent, {
        disableClose: true,
        data: { 
          IdUsuario            :e.IdUsuario        ,           
          Nombre               :e.Nombre           ,           
          Contrasenia          :e.Contrasenia      ,           
          IdEmpleado           :e.IdEmpleado       ,           
          IdPerfil             :e.IdPerfil         ,           
          FechaRegistro        :e.FechaRegistro    ,           
          Estatus              :e.Estatus          ,           
          email                :e.email            ,           
          Bloqueado            :e.Bloqueado        ,           
          Intentos             :e.Intentos         ,           
          UltimaTransaccion    :e.UltimaTransaccion,           
          },
//        width: '1500px',
//        height: '900px'
      });
  
      dialogRef.afterClosed().subscribe(res => {
        this.getCatalogoCobradores();
      });
    }


  //Filtro
    applyFilter(filterValue: string) {
      filterValue = filterValue.trim(); // Remove whitespace
      filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
      this.dataSource.filter = filterValue;
    }

  //Valida la extensión del archivo PDF
  isFileAllowedPDF(fileName: string) {

    let isFileAllowed = false;
    const allowedFiles = ['.jpeg', '.png', '.jpg'];
    const regex = /(?:\.([^.]+))?$/;
    const extension = regex.exec(fileName);
    if (undefined !== extension && null !== extension) {
      for (const ext of allowedFiles) {
        if (ext === extension[0]) {
          isFileAllowed = true;
        }
      }
    }
    return isFileAllowed;
  }    


  //Adjunta los archivos 
  onFileSelected(e: any, row: any) {
    console.log("inFileSelected")
    console.log(e)
    console.log(e.target.files)
    console.log(row)
    this.uploadedFiles = e.target.files;

    if (this.isFileAllowedPDF(this.uploadedFiles[0].name)) {
        const formData = new FormData();
        formData.append('Imagen', this.uploadedFiles[0], this.uploadedFiles[0].name),
        formData.append('IdUsuario', row.IdUsuario),
        console.log("FormData")
        console.log(formData)
        console.log(formData.append)

      this.catalogosService.postGuardaImagenRegistro(formData)
        .pipe(first())
        .subscribe(
          data => {
            console.log("Graba Imagen Registro")
            console.log(data)
            if (data.estatus) {
              //this.success(data.mensaje);
              this.notifier.notify('success', data.mensaje, '');
              this.getCatalogoCobradores();
            } else if (!data.estatus) {
              //this.warn(data.mensaje);
              this.notifier.notify('warning', data.mensaje, '');
            }
          },
          error => {
            //this.error(error);
            this.notifier.notify('error', error, '');
            console.log("Error")
            console.log(error)
          });

    } else {
      this.notifier.notify('warning', 'El archivo no corresponde a las extensiones .jpeg, .png, .jpg', '');
      //this.warn("El archivo no corresponde a la extensión .pdf");
    }
  }

  //Abre la imagen del archivo 
  verIMG(row: any) {
    console.log("VerIMG")
    console.log(row)

    this.openDialogIMG(row.Foto);
    console.log("Con IMG")
 //   }
  }  


  //Abre modal visualizar el documento
  openDialogIMG(archivoIMG: string): void {

    const dialogRef = this.dialog.open(ImgViewerComponent, {
      width: '50%',
      height: '80%',
      disableClose: true,
      data: { archivoIMG: archivoIMG }
    });
    dialogRef.afterClosed().subscribe(res => {

    });
  }  
  
}


