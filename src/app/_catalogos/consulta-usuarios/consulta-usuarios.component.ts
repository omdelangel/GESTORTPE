import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder} from '@angular/forms';
import { first } from 'rxjs/operators';
import { CatalogoUsuarios } from 'src/app/_models';
import { CatalogosService } from '../../_services';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { AltaUsuariosComponent } from '../alta-usuarios';
import { EdicionUsuariosComponent } from '../../_catalogos/edicion-usuarios/edicion-usuarios.component';
import { NotifierService } from 'angular-notifier';
import { ImgViewerComponent } from '../../_catalogos/img-viewer/img-viewer.component'; 



@Component({
  selector: 'app-consulta-usuarios',
  templateUrl: './consulta-usuarios.component.html',
  styleUrls: ['./consulta-usuarios.component.scss']
})

export class ConsultaUsuariosComponent implements OnInit {
  private readonly notifier: NotifierService;

  disabled = false;
  //Columnas en Tabla de consulta
  displayedColumns = ['Nombre',
                      'Perfil',
                      'Estatus',
                      'email',
                      'Bloqueado',
                      'Intentos',
                      'actions',
                      'archivoIMG',
                      'actionsVer'
                      ];                      
  dataSource!: MatTableDataSource<CatalogoUsuarios>;

  //@ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  reactiveForm        !:FormGroup;
  catalogoUsuarios    :CatalogoUsuarios[] = [];
  uploadedFiles       !: Array<File>;

  constructor(
    public dialog:                MatDialog,
    private catalogosService:     CatalogosService,
    private formBuilder:          FormBuilder,
    notifierService:              NotifierService) { 

    this.notifier = notifierService;   
    }

  ngOnInit(): void {

    this.getConsultaUsuarios();

  //Validaci??n de campos en pantalla
    this.reactiveForm = this.formBuilder.group({
      'IdUsuario '      :[''],
      'Bloqueado'       :[''],
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
  
  //Abre modal para Usuarios
    openDialog(): void {
      const dialogRef = this.dialog.open(AltaUsuariosComponent, {
        disableClose: true,
//        width: '1500px',
  //      height: '900px'
      });
  
      dialogRef.afterClosed().subscribe(res => {
        this.getConsultaUsuarios();
      });
    }


  //Consulta los datos de Usuarios
    getConsultaUsuarios(){
      this.catalogosService.getCatalogoUsuarios()
        .pipe(first())
        .subscribe(data => {   
          this.catalogoUsuarios     = data.listaDat.usuarios;   
          this.dataSource           = new MatTableDataSource(this.catalogoUsuarios);
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
          this.getConsultaUsuarios();
        },
          error => {  
          });
    }


  //Edita el registro de Dictamen
    editar(e: any) {
      const dialogRef = this.dialog.open(EdicionUsuariosComponent, {
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
        this.getConsultaUsuarios();
      });
    }


  //Filtro
    applyFilter(filterValue: string) {
      filterValue = filterValue.trim(); // Remove whitespace
      filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
      this.dataSource.filter = filterValue;
    }

  //Valida la extensi??n del archivo PDF
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

    this.uploadedFiles = e.target.files;

    if (this.isFileAllowedPDF(this.uploadedFiles[0].name)) {
        const formData = new FormData();
        formData.append('Imagen', this.uploadedFiles[0], this.uploadedFiles[0].name),
        formData.append('IdUsuario', row.IdUsuario),

      this.catalogosService.postGuardaImagenRegistro(formData)
        .pipe(first())
        .subscribe(
          data => {
            if (data.estatus) {
              //this.success(data.mensaje);
              this.notifier.notify('success', data.mensaje, '');
              this.getConsultaUsuarios();
            } else if (!data.estatus) {
              //this.warn(data.mensaje);
              this.notifier.notify('warning', data.mensaje, '');
            }
          },
          error => {
            //this.error(error);
            this.notifier.notify('error', error, '');
          });

    } else {
      this.notifier.notify('warning', 'El archivo no corresponde a las extensiones .jpeg, .png, .jpg', '');
      //this.warn("El archivo no corresponde a la extensi??n .pdf");
    }
  }

  //Abre la imagen del archivo 
  verIMG(row: any) {


    this.openDialogIMG(row.Foto);

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


