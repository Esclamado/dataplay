# NgxFirebaseClient

The Firebase Client provides a configurable instance of the official Firebase SDK to Angular.

We built this because we prefer to use core SDKs for Firebase over more opinionated packages.

* All of the Firebase documentation is valid
* The API is much closer to the NodeJS admin API, making full stack development easier
* The skills you gain developing are relevant on any platform

## Installation

First install the firebase SDK and NgxFirebaseClient modules:

```shell script
npm i firebase @ngx-firebase/client
```

Then import the module in your root app module:

```typescript
// src/app/app.module.ts
...
import {NgxFirebaseClientModule} from '@ngx-firebase/client';
...
imports: [
  BrowserModule,
  NgxFirebaseClientModule.forRoot({
    apiKey: "#####",
    authDomain: "#####",
    databaseURL: "#####",
    projectId: "#####",
    storageBucket: "#####",
    messagingSenderId: "#####",
    appId: "#####",
    measurementId: "#####",
  })
],
...
```

Now you are ready to use the SDK in your components

```typescript
// src/app/app.component.ts
import {NgxFirebaseClientService} from '@ngx-firebase/client';
...
export class AppComponent {
  constructor(private firebase: NgxFirebaseClientService) {
    // do something with the SDK
  }
}
```





