import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { take, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { minimumAge } from 'src/app/helper/validation/minimumAge';
@Component({
  selector: 'app-home-page-unregisterd',
  templateUrl: './home-page-unregisterd.component.html',
  styleUrls: ['./home-page-unregisterd.component.css'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true },
    },
  ],
})
export class HomePageUnregisterdComponent implements OnInit {
  model: {
    username: string;
    password: string;
    passwordConfirm: string;
    dateOfBirth: Date;
  } = {
    username: '',
    password: '',
    passwordConfirm: '',
    dateOfBirth: null,
  };
  pageNumber = 0;
  constructor(
    private accountService: AccountService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}
  basicInfo: FormGroup;
  secondFormGroup: FormGroup;
  formRegister: FormGroup;
  isLinear = true;
  ngRegisterForm;
  maxDate: Date;

  ngOnInit() {
    this.basicInfo = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      dateOfBirth: ['', [Validators.required, minimumAge(18)]],
    });
    this.formRegister = this.formBuilder.group({
      basicInfo: this.basicInfo,
    });


    this.secondFormGroup = this.formBuilder.group({
      secondCtrl: ['', [Validators.required]],
    });
    const date = new Date();
    date.setFullYear(date.getFullYear() - 18);
    this.maxDate = date;

  }
  onSubmit() {
    console.log("s");

    return false;
  }
  registerUser() {
    console.log(this.model);
    this.accountService.register(this.model);
    this.accountService.currentUser$.pipe(take(1)).subscribe(
      (user) => {
        this.router.navigateByUrl('/complete-register');
      }
      // },
      // (error) => {
      //   console.log(error, 'eee');
      // }
    );
  }
}
