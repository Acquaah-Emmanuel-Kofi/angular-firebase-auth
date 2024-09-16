import { inject, Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  UserCredential,
} from '@angular/fire/auth';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _fireAuth = inject(Auth);

  constructor() {}

  signUp(email: string, password: string): Observable<UserCredential> {
    const response = createUserWithEmailAndPassword(
      this._fireAuth,
      email,
      password
    )
      .then(async (response) => {
        await sendEmailVerification(response.user);

        return response;
      })
      .catch((error) => {
        throw new Error(error.message);
      });

    return from(response);
  }
}
