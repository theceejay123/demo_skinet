import { Component, OnInit } from '@angular/core';
import { AsyncValidatorFn, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { of, timer } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { AccountService } from '../account.service';

@Component({
  selector: 'skinet-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  currentYear: number = 0;
  registerFormGroup: FormGroup;
  errors: string[];

  constructor(private fb: FormBuilder, private accountService: AccountService, private router: Router) {}

  ngOnInit(): void {
    this.currentYear = new Date().getFullYear();
    this.initializeRegisterForm();
  }

  initializeRegisterForm() {
    this.registerFormGroup = this.fb.group({
      displayName: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')], [this.validateEmail()]],
      password: [null, [Validators.required]],
    });
  }

  onSubmit() {
    this.accountService.register(this.registerFormGroup.value).subscribe(
      () => this.router.navigateByUrl('/shop'),
      (err) => (this.errors = err.errors)
    );
  }

  validateEmail(): AsyncValidatorFn {
    return (control) => {
      return timer(300).pipe(
        switchMap(() => {
          if (!control.value) {
            of(null);
          }
          return this.accountService.checkEmailExists(control.value).pipe(map((res) => (res ? { emailExists: true } : null)));
        })
      );
    };
  }
}
