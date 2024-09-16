import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { BrandComponent } from '../../shared/components/brand/brand.component';
import { InputFieldComponent } from '../../shared/components/input-field/input-field.component';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../shared/services/auth/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    RouterLink,
    BrandComponent,
    InputFieldComponent,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent {
  alertMessage = signal<string>('');

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
      this._authService.signUp(email, password).subscribe({
        next: () => {
          this.handleResponse();
        },
        error: (error) => {
          this.showAlert(error.message);
        },
      });
    } else {
      this.showAlert('Form is not valid');
    }
  }

  formIsvalid() {
    return this.form.valid;
  }

  handleResponse() {
    this.showAlert('User signed up successfully');
    this.form.reset();
    this._router.navigate(['/dashboard']);
  }

  showAlert(message: string) {
    this.alertMessage.set(message);

    setTimeout(() => {
      this.alertMessage.set('');
    }, 3000);
  }
}
