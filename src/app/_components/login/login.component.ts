import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AlertService } from '../../_alert';
import {AuthenticationService, TokenStorageService, SharingService } from '../../_services';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  loading = false;
  submitted = false;
  returnUrl!: string;

  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';


  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private tokenStorage: TokenStorageService,
    private alertService: AlertService,
    private sharingService: SharingService
  ) {

    // redirect to home if already logged in
    if (this.tokenStorage.getUser()) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {

    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.clear();
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

     
    this.authenticationService.login(this.f.username.value, this.f.password.value)
      .pipe(first())
      .subscribe(data => {

        if (data.estatus) {

        this.sharingService.sharingValue = data.menu;
        this.router.navigate(['/sidenav'])         
        } else {
          this.clear();
          this.info(data.mensaje);
        }
      }
      )
  }

  success(message: string) {
    this.alertService.success(message, 'success');
  }
  
  error(message: string) {
    this.alertService.error(message, 'error');
  }
  
  info(message: string) {
    this.alertService.info(message, 'info');
  }
  
  warn(message: string) {
    this.alertService.warn(message, 'warn');
  }
  
  clear() {
    this.alertService.clear();
  }

}

