import { inject, Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  UserCredential,
} from '@angular/fire/auth';
import { doc, Firestore, setDoc } from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';
import { IUser } from '../../interfaces/user.interface';
import {
  ACCESS_TOKEN_KEY,
  saveToLocalStorage,
} from '../../helpers/constants.helper';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _fireAuth = inject(Auth);
  private _firestore = inject(Firestore);

  constructor() {}

  signUp(email: string, password: string): Observable<UserCredential> {
    const response = createUserWithEmailAndPassword(
      this._fireAuth,
      email,
      password
    )
      .then(async (response) => {
        await sendEmailVerification(response.user);

        await this.saveUserDetails(response.user as IUser);

        return response;
      })
      .catch((error) => {
        throw new Error(error.message);
      });

    return from(response);
  }

  login(email: string, password: string): Observable<UserCredential> {
    const response = signInWithEmailAndPassword(this._fireAuth, email, password)
      .then(async (response) => {
        const token = await response.user.getIdToken();

        saveToLocalStorage(ACCESS_TOKEN_KEY, token);
        
        return response;
      })
      .catch((error) => {
        throw new Error(error.message);
      });

    return from(response);
  }

  async saveUserDetails(user: IUser) {
    const userRef = doc(this._firestore, `users/${user.uid}`);
    await setDoc(userRef, {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
    });
  }
}
