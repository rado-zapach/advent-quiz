import {bootstrapApplication} from '@angular/platform-browser';
import {Amplify} from 'aws-amplify';
import {AppComponent} from './app/app.component';
import {appConfig} from './app/app.config';
import awsConfig from './aws-exports';

// TODO: properly catch auth error
const urlParams = new URLSearchParams(window.location.search);
const myParam = urlParams.get('error_description');
if (myParam) {
    const elemDiv = document.createElement('div');
    elemDiv.textContent = myParam;
    elemDiv.style.cssText = 'color: white;';
    document.body.appendChild(elemDiv);
}

const updatedAwsConfig = {
    ...awsConfig,
    oauth: {
        ...awsConfig.oauth,
        redirectSignIn: `${window.location.origin}/`,
        redirectSignOut: `${window.location.origin}/`,
    },
};
Amplify.configure(updatedAwsConfig);

bootstrapApplication(AppComponent, appConfig).catch(err => console.error(err));
