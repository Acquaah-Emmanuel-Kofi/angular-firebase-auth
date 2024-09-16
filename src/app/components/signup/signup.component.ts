import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { BrandComponent } from '../../shared/components/brand/brand.component';
import { InputFieldComponent } from '../../shared/components/input-field/input-field.component';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../shared/services/auth/auth.service';
import { LoaderComponent } from '../../shared/components/loader/loader.component';
import { ToasterComponent } from '../../shared/components/toaster/toaster.component';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    RouterLink,
    BrandComponent,
    InputFieldComponent,
    FormsModule,
    ReactiveFormsModule,
    LoaderComponent,
    ToasterComponent
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent {
  isLoading: boolean = false;

  showToast: boolean = false;
  toastMessage: string = '';
  toastStatus: 'success' | 'error' | 'info' = 'info';

  form: FormGroup;

  private _authService = inject(AuthService);
  private _router = inject(Router);

  constructor() {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  onSubmit() {
    const { email, password } = this.form.value;

    if (this.formIsvalid()) {
      this.isLoading = true;

      this._authService.signUp(email, password).subscribe({
        next: () => {
          this.handleResponse();
        },
        error: (error) => {
          this.isLoading = false;
          this.triggerToast('error', error.message);
        },
      });
    } else {
      this.triggerToast('error', 'Form is not valid');
    }
  }

  formIsvalid() {
    return this.form.valid;
  }

  handleResponse() {
    this.isLoading = false;
    this.triggerToast('success', 'User signed up successfully');
    this.form.reset();
    this._router.navigate(['/dashboard']);
  }

  triggerToast(status: 'success' | 'error' | 'info', message: string) {
    this.toastStatus = status;
    this.toastMessage = message;
    this.showToast = true;

    setTimeout(() => {
      this.showToast = false;
    }, 3000);
  }
}
