import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, take  } from 'rxjs/operators';
import { User } from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  $user: Observable<User>;
  constructor(private afAuth: AngularFireAuth) { 
    this.$user = this.afAuth.authState;
  }

  login(email: string, password: string): Promise<firebase.auth.UserCredential> {

    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  logout(): Promise<void> {
    return this.afAuth.signOut();
  }

  getAuthState(): Observable<firebase.User> {
    return this.afAuth.authState
      .pipe(map(value => value));
  }
}
