import {
    CognitoIdentityProviderClient,
    paginateListUsers,
} from "@aws-sdk/client-cognito-identity-provider";

async function getUsersWithSpecificAttributes() {
    const client = new CognitoIdentityProviderClient();
    const paginator = paginateListUsers(
      { client }, 
      { 
        UserPoolId: process.env.AUTH_ADVENTQUIZ6A5522DC_USERPOOLID,
        AttributesToGet: ["email"]
      }
    );
  
    const users = [];
    
    try {
      for await (const page of paginator) {
        if (page.Users) {
          users.push(...page.Users);
        }
      }
      return users;
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }

let cache = undefined;
// cache bust1
export const handler = async event => {
    if (cache) {
        return cache;
    }

    const users = await getUsersWithSpecificAttributes();
    console.log(users.length);
    const result = users.map(u => ({
        username: u.Username,
        email: u.Attributes.find(a => a.Name === "email").Value,
    }));
    cache = result;
    return result;
};
