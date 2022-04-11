import { Component, ViewChild, Input, HostBinding, ElementRef, ViewEncapsulation, AfterViewInit, OnDestroy} from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { delay } from 'rxjs/operators';
import { AuthenticationService, SharingService } from '../../_services';
import {NavService} from './nav-service';
import {NavItem} from './nav-item';
import {Router, ActivatedRoute} from '@angular/router'
import {animate, state, style, transition, trigger} from '@angular/animations';
import { Subscription } from 'rxjs';
import { MediaChange, MediaObserver } from "@angular/flex-layout";

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  animations: [
    trigger('indicatorRotate', [
      state('collapsed', style({transform: 'rotate(0deg)'})),
      state('expanded', style({transform: 'rotate(180deg)'})),
      transition('expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4,0.0,0.2,1)')
      ),
    ])
  ]
})
export class SidenavComponent implements OnDestroy{

  opened: boolean = true;
  mediaWatcher: Subscription;

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
  navItems: NavItem[] = [];
  sidenavWidth = 4;
  ngStyle: string;


  constructor(public authenticationService: AuthenticationService, 
    public navService: NavService,
    private sharingService: SharingService,
    private media: MediaObserver
    ) {

      this.myJson = this.sharingService.sharingValue;
      this.navItems = this.myJson[0];

      this.mediaWatcher = this.media.media$.subscribe((mediaChange: MediaChange) => {
        this.handleMediaChange(mediaChange);
    })
    
    }


  ngOnInit() {

    //this.myJson = this.sharingService.sharingValue;
    
    this.dataUser = JSON.parse(sessionStorage.getItem('usuario')!);

    for (var key in this.dataUser) {
      if (key == "Nombre") {
        this.nombre = this.dataUser[key];
      }
    }  

  }

  private handleMediaChange(mediaChange: MediaChange) {
    if (this.media.isActive('lt-md')) {
        this.opened = false;
    } else {
        this.opened = true;
    }
}


  onLogout(){
    this.authenticationService.logout();
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


  increase() {
    this.sidenavWidth = 15;
    this.isShowing = true;
    console.log('increase sidenav width');
  }
  decrease() {
    this.sidenavWidth = 4;
    this.isShowing = false;
    console.log('decrease sidenav width');
  }

  ngOnDestroy() {
    this.mediaWatcher.unsubscribe();
}



}
