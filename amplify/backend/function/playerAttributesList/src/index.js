import {
    CognitoIdentityProviderClient,
    ListUsersCommand,
} from "@aws-sdk/client-cognito-identity-provider";

let cache = undefined;

export const handler = async event => {
    if (cache) {
        return cache;
    }

    const client = new CognitoIdentityProviderClient();
    const input = {
        AttributesToGet: ["email"],
        UserPoolId: process.env.AUTH_ADVENTQUIZ6A5522DC_USERPOOLID,
    };
    const command = new ListUsersCommand(input);
    const response = await client.send(command);
    const result = response.Users.map(u => ({
        username: u.Username,
        email: u.Attributes.find(a => a.Name === "email").Value,
    }));
    cache = result;
    return result;
};
