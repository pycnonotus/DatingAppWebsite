import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { take, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { minimumAge } from 'src/app/helper/validation/minimumAge';
import { matchValues } from 'src/app/helper/validation/matchValues';
import { Observer, Subscription } from 'rxjs';
import { notIncluded } from 'src/app/helper/validation/notIncluded';
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
export class HomePageUnregisterdComponent implements OnInit, OnDestroy {
  pageNumber = 0;
  private usedNames: string[] = [];
  constructor(
    private accountService: AccountService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }
  ngOnDestroy(): void {
    this.accountSubscription?.unsubscribe();
  }
  basicInfo: FormGroup;
  interestForm: FormGroup;
  formRegister: FormGroup;
  loginInfoForm: FormGroup;
  isLinear = true;
  ngRegisterForm;
  maxDate: Date;
  accountSubscription: Subscription;

  ngOnInit() {
    this.loginInfoForm = this.formBuilder.group({
      username: ['', [Validators.required, notIncluded(this.usedNames)]],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,}'
          ),
        ],
      ],
      passwordConfirm: ['', [Validators.required, matchValues('password')]],
    });
    this.interestForm = this.formBuilder.group({
      interestIn: ['', [Validators.required]],
      aboutMe: ['', ''],
    });

    this.basicInfo = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      gender: ['', [Validators.required]],
      dateOfBirth: ['', [Validators.required, minimumAge(18)]],
    });

    this.formRegister = this.formBuilder.group({
      basicInfo: [this.basicInfo, Validators.required],
      interestForm: this.interestForm,
      LoginInfoForm: this.loginInfoForm,
    });

    const date = new Date();
    date.setFullYear(date.getFullYear() - 18);
    this.maxDate = date;

    this.accountSubscription = this.accountService.currentUser$.subscribe(
      (user) => {

      },
      (error) => {
        if (error) {
          if (error.error) {
            if (error.error === "This user already exists") {
              this.usedNames.push(this.loginInfoForm.get("username").value);
              this.loginInfoForm.get('username').setErrors({ included: true });
            }
          }
        }
        console.log(error);
      });
  }

  onSubmit() {
    console.log(this.formRegister);
    let aa = this.accountService.register({
      firstName: this.basicInfo.get('firstName').value,
      lastName: this.basicInfo.get('lastName').value,
      gender: this.basicInfo.get('gender').value,
      LookingFor: this.interestForm.get('interestIn').value,
      aboutMe: this.interestForm.get('aboutMe').value,
      username: this.loginInfoForm.get('username').value,
      password: this.loginInfoForm.get('password').value,
      dateOfBirth: this.basicInfo.get('dateOfBirth').value,
    });
    return false;
  }

  onBasicFormSubmit() {
    this.basicInfo.get('gender').markAsTouched();
  }


}
