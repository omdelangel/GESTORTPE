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
  sidenavWidth = 4;
  ngStyle: string;


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
      if (key == "Nombre") {
        this.nombre = this.dataUser[key];
      }
    }  
  }


  onLogout(){
    this.authenticationService.logout();
  }

  ngAfterViewInit() {
    this.observer
    .observe(['(max-width: 1366px)'])
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

  increase() {
    this.sidenavWidth = 15;
  }
  decrease() {
    this.sidenavWidth = 4;

  }

}
