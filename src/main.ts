import {bootstrapApplication} from '@angular/platform-browser';
import {Amplify} from 'aws-amplify';
import {AppComponent} from './app/app.component';
import {appConfig} from './app/app.config';
import aws_exports from './aws-exports';

Amplify.configure(aws_exports);

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
