import { Injectable } from '@angular/core';
import {
  Auth,
  authState,
  createUserWithEmailAndPassword,
  updateProfile,
} from '@angular/fire/auth';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { from, switchMap } from 'rxjs';
import { SignInCredentials, SignUpCredentials } from './auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  readonly isLoggedIn$ = authState(this.auth);

  constructor(private auth: Auth) {}

  signIn({ email, password }: SignInCredentials) {
    return from(signInWithEmailAndPassword(this.auth, email, password));
  }

  signUp({ email, password, displayName }: SignUpCredentials) {
    return from(
      createUserWithEmailAndPassword(this.auth, email, password)
    ).pipe(switchMap(({ user }) => updateProfile(user, { displayName })));
  }

  signOut() {
    return from(this.auth.signOut());
  }
}
