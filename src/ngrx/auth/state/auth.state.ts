import { AuthCredentialModel } from '../../../app/model/auth.model';

export interface AuthState {
  token: string;

  //google
  authCredential: AuthCredentialModel;
  isSigningInWithGG: boolean;
  isSignInWithGGSuccess: boolean;
  signInWithGGErrorMessage: string;
}
