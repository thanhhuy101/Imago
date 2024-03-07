import { Injectable } from '@angular/core';
import { Auth, GoogleAuthProvider, signInWithPopup } from '@angular/fire/auth';
import { HttpClientAuth } from '../../util/http-client-auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private auth: Auth,
    private http: HttpClientAuth,
  ) {}

  async signInWithGoogle(): Promise<string> {
    const auth = this.auth;
    const provider = new GoogleAuthProvider();

    try {
      const credential = await signInWithPopup(auth, provider);
      if (credential.user) {
        return await credential.user.getIdToken();
      }
      throw new Error('User not found');
    } catch (error) {
      throw error;
    }
  }

  async signOut(): Promise<void> {
    try {
      await this.auth.signOut();
    } catch (error) {
      throw error;
    }
  }

  signUp() {
    return this.http.post('auth', '');
  }

  getById(id: string) {
    return this.http.get(`auth?id=${id}`);
  }
}
