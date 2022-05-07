import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  Auth,
  authState,
  createUserWithEmailAndPassword,
  updateProfile,
} from '@angular/fire/auth';
import { User } from '@firebase/auth';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { forkJoin, from, map, Observable, pluck, switchMap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SignInCredentials, SignUpCredentials } from './auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  readonly isLoggedIn$ = authState(this.auth);

  constructor(private auth: Auth, private http: HttpClient) {}

  getCurrentUser() {
    return this.auth.currentUser!;
  }

  getStreamToken() {
    const baseUrl = environment.firebase.apiUrl;
    const url = `${baseUrl}/createStreamToken`;

    const firebaseUser = this.getCurrentUser();

    const user = {
      uid: firebaseUser.uid,
      email: firebaseUser.email,
      displayName: firebaseUser.displayName,
    };

    return this.http
      .post<{ token: string }>(url, { user })
      .pipe(pluck('token'));
  }

  signIn({ email, password }: SignInCredentials) {
    return from(signInWithEmailAndPassword(this.auth, email, password));
  }

  signUp({ email, password, displayName }: SignUpCredentials) {
    return from(
      createUserWithEmailAndPassword(this.auth, email, password)
    ).pipe(
      switchMap(({ user }) =>
        forkJoin([
          updateProfile(user, { displayName }),
          this.createStreamUser(user, displayName),
        ])
      )
    );
  }

  signOut() {
    const user = this.getCurrentUser();

    return from(this.auth.signOut()).pipe(
      map(() => `${environment.firebase.apiUrl}/revokeStreamToken`),
      switchMap((url) => this.http.post(url, { user }))
    );
  }

  private createStreamUser(
    firebaseUser: User,
    displayName: string
  ): Observable<void> {
    const baseUrl = environment.firebase.apiUrl;
    const url = `${baseUrl}/createStreamUser`;

    const user = {
      uid: firebaseUser.uid,
      email: firebaseUser.email,
      displayName,
    };

    return this.http.post<void>(url, { user });
  }
}
