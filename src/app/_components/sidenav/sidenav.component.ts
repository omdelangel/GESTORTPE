import { Component, ViewChild, Input, HostBinding, ElementRef, ViewEncapsulation, AfterViewInit} from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { delay } from 'rxjs/operators';
import { AuthenticationService, SharingService } from '../../_services';
import {NavService} from './nav-service';
import {NavItem} from './nav-item';
import {Router, ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {
  expanded!: boolean;
  @HostBinding('attr.aria-expanded') ariaExpanded = this.expanded;
  @ViewChild('appDrawer') appDrawer!: ElementRef;
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  title: string = "Inicio";
  myJson: any[] = [];

  
  isExpanded = true;
  showSubmenu: boolean = false;
  isShowing = false;
  showSubSubMenu: boolean = false;
  
  dataUser: [] = [];
  nombre: string = "";
  navItems1: NavItem[] = [];

  navItems: NavItem[] = [];


  constructor(public authenticationService: AuthenticationService, 
    private observer: BreakpointObserver,
    public navService: NavService,
    public router: Router,
    private route: ActivatedRoute,
    private sharingService: SharingService) {

      this.myJson = this.sharingService.sharingValue;
      this.navItems = this.myJson[0];
    
    }


  ngOnInit() {

    //this.myJson = this.sharingService.sharingValue;
    
    this.dataUser = JSON.parse(sessionStorage.getItem('usuario')!);

    for (var key in this.dataUser) {
      if (key == "nombre") {
        this.nombre = this.dataUser[key];
      }
    }  
  }


  onLogout(){
    this.authenticationService.logout();
  }

  ngAfterViewInit() {
    this.observer
    .observe(['(max-width: 800px)'])
    .pipe(delay(1))
    .subscribe((res) => {

    
      if (res.matches) {
        this.sidenav.mode = 'over';
        this.sidenav.close();
      } else {
        this.sidenav.mode = 'side';
        this.sidenav.open();
      }
    });
    
    this.navService.appDrawer = this.appDrawer;
  }

  mouseenter() {

    if (!this.isExpanded) {
      this.isShowing = true;
    }
  }

  mouseleave() {
    
    if (!this.isExpanded) {
      this.isShowing = false;
    }
  }

  handleClick(selectedItem: any) {

    this.title = selectedItem;
  }

}
