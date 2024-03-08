import { AuthCredentialModel } from '../../app/model/auth.model';
import { HttpErrorResponseModel } from '../../app/model/http-error-response.model';

export interface AuthState {
  token: string;

  //google
  isSigningInWithGG: boolean;
  isSignInWithGGSuccess: boolean;
  signInWithGGErrorResponse: HttpErrorResponseModel;

  isSigningOutWithGG: boolean;
  isSignOutWithGGSuccess: boolean;
  signOutWithGGErrorResponse: HttpErrorResponseModel;

  //user
  authCredential: AuthCredentialModel;
  isSignUp: boolean;
  isSignUpSuccess: boolean;
  signUpErrorResponse: HttpErrorResponseModel;

  isGettingAuth: boolean;
  getAuthErrorResponse: HttpErrorResponseModel;
}
