import { provideAnimations } from '@angular/platform-browser/animations';
import { TuiRootModule } from '@taiga-ui/core';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { provideStore } from '@ngrx/store';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideRouter(routes),
    importProvidersFrom(provideFirebaseApp(() => initializeApp({
        projectId: 'itss-imago-0000',
        appId: '1:1098187958856:web:931b5d503852e1c9a1867d',
        storageBucket: 'itss-imago-0000.appspot.com',
        apiKey: 'AIzaSyAJ93BuFGs7gOJe9kudLYvAn4-Fp6Q936M',
        authDomain: 'itss-imago-0000.firebaseapp.com',
        messagingSenderId: '1098187958856',
        measurementId: 'G-7TVCQGP8RS',
    })), TuiRootModule),
    importProvidersFrom(provideAuth(() => getAuth())),
    importProvidersFrom(provideFirestore(() => getFirestore())),
    importProvidersFrom(provideDatabase(() => getDatabase())),
    importProvidersFrom(provideStorage(() => getStorage())),
    provideStore()
],
};
