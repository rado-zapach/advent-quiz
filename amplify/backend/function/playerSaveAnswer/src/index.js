/* Amplify Params - DO NOT EDIT
	API_ADVENTQUIZ_GRAPHQLAPIENDPOINTOUTPUT
	API_ADVENTQUIZ_GRAPHQLAPIIDOUTPUT
	AUTH_ADVENTQUIZ6A5522DC_USERPOOLID
	ENV
	REGION
Amplify Params - DO NOT EDIT */

import {
    AdminGetUserCommand,
    CognitoIdentityProviderClient,
} from "@aws-sdk/client-cognito-identity-provider";

export const handler = async event => {
    console.log(`EVENT: ${JSON.stringify(event)}`);

    const username = event.identity.username;
    const client = new CognitoIdentityProviderClient();
    const input = {
        UserPoolId: process.env.AUTH_ADVENTQUIZ6A5522DC_USERPOOLID,
        Username: username,
    };
    const command = new AdminGetUserCommand(input);
    const response = await client.send(command);
    const email = response.UserAttributes.find(a => a.Name === "email").Value;

    return email;
};
