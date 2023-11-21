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

const isLocalhost = Boolean(
    window.location.hostname === 'localhost' ||
        // [::1] is the IPv6 localhost address.
        window.location.hostname === '[::1]' ||
        // 127.0.0.1/8 is considered localhost for IPv4.
        window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/)
);

// Assuming you have two redirect URIs, and the first is for localhost and second is for production
const [localRedirectSignIn, devRedirectSignIn, prodRedirectSignIn] =
    awsConfig.oauth.redirectSignIn.split(',');

const [localRedirectSignOut, devRedirectSignOut, prodRedirectSignOut] =
    awsConfig.oauth.redirectSignOut.split(',');

const updatedAwsConfig = {
    ...awsConfig,
    oauth: {
        ...awsConfig.oauth,
        redirectSignIn: isLocalhost ? localRedirectSignIn : devRedirectSignIn,
        redirectSignOut: isLocalhost ? localRedirectSignOut : devRedirectSignOut,
    },
};
Amplify.configure(updatedAwsConfig);

bootstrapApplication(AppComponent, appConfig).catch(err => console.error(err));
