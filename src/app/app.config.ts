import { provideAnimations } from '@angular/platform-browser/animations';
import { TuiRootModule } from '@taiga-ui/core';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { provideState, provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';

import { storageReducer } from '../ngrx/storage/reducer/storage.reducer';
import { StorageEffects } from '../ngrx/storage/effects/storage.effects';
import { authReducer } from '../ngrx/auth/auth.reducer';
import { AuthEffects } from '../ngrx/auth/auth.effects';
import { postReducer } from '../ngrx/post/post.reducer';
import { PostEffect } from '../ngrx/post/post.effect';
import { reportReducer } from '../ngrx/report/report.reducer';
import { ReportEffect } from '../ngrx/report/report.effect';
import { dev_environment } from '../environments/environment.development';
import { HttpClientAuth } from './util/http-client-auth';
import { categoryReducer } from '../ngrx/category/category.reducer';
import { CategoryEffect } from '../ngrx/category/category.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideRouter(routes),
    importProvidersFrom(
      provideFirebaseApp(() => initializeApp(dev_environment.firebase)),
      TuiRootModule,
    ),
    importProvidersFrom(provideAuth(() => getAuth())),
    importProvidersFrom(provideFirestore(() => getFirestore())),
    importProvidersFrom(provideDatabase(() => getDatabase())),
    importProvidersFrom(provideStorage(() => getStorage())),
    provideStore({
     
    }),
    provideState({ name: 'auth', reducer: authReducer }),
    provideState({ name: 'post', reducer: postReducer }),
    provideState({ name: 'report', reducer: reportReducer }),
    provideState({ name: 'storage', reducer: storageReducer }),
    provideState({ name: 'category', reducer: categoryReducer }),
    provideEffects([AuthEffects, PostEffect, ReportEffect, CategoryEffect,StorageEffects]),
    provideHttpClient(),
    HttpClientAuth,
  ],
};
