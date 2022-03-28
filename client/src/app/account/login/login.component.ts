import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '../account.service';

@Component({
  selector: 'skinet-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  currentYear: number = 0;
  loginFormGroup: FormGroup;
  returnUrl: string;

  constructor(private accountService: AccountService, private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.returnUrl = this.activatedRoute.snapshot.queryParams.returnUrl || '/shop';
    this.currentYear = new Date().getFullYear();
    this.initializeLoginFormGroup();
  }

  initializeLoginFormGroup() {
    this.loginFormGroup = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')]),
      password: new FormControl('', [Validators.required]),
    });
  }

  onSubmit() {
    this.accountService.login(this.loginFormGroup.value).subscribe(
      () => this.router.navigateByUrl(this.returnUrl),
      (err) => console.error(err)
    );
  }

  isFormTouchedAndValid(control: string): boolean {
    var formControl = this.loginFormGroup.get(control);
    return formControl !== undefined && (formControl.pending || !formControl.touched || formControl.valid);
  }
}
