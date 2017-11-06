import {
  CognitoUserPool,
  CognitoUserAttribute,
  CognitoUser,
  AuthenticationDetails
} from "amazon-cognito-identity-js";

const CognitoHandler = Object.create(null);

CognitoHandler.userPool = null;
CognitoHandler.user = null;

CognitoHandler.setup = (userPoolId, clientId) => {
  CognitoHandler.userPool = new CognitoUserPool({
    UserPoolId: userPoolId,
    ClientId: clientId
  });
};

CognitoHandler.signUp = (username, password, attributeList) => {
  const userAttributeList = attributeList.map(
    attr => new CognitoUserAttribute(attr)
  );
  return new Promise((resolve, reject) => {
    CognitoHandler.userPool.signUp(
      username,
      password,
      userAttributeList,
      null,
      (err, result) => {
        if (err) {
          reject(err);
        }
        CognitoHandler.user = result.user;
        resolve(result);
      }
    );
  });
};

CognitoHandler.confirmRegistration = (username, verificationCode) => {
  const userData = {
    Username: username,
    Pool: CognitoHandler.userPool
  };
  const user = new CognitoUser(userData);
  return new Promise((resolve, reject) => {
    user.confirmRegistration(verificationCode, true, (err, result) => {
      if (err) {
        reject(err);
      }
      resolve(result);
    });
  });
};

CognitoHandler.signIn = (username, password) => {
  const authenticationData = {
    Username: username,
    Password: password
  };
  const authenticationDetails = new AuthenticationDetails(authenticationData);
  const userData = {
    Username: username,
    Pool: CognitoHandler.userPool
  };
  const user = new CognitoUser(userData);
  return new Promise((resolve, reject) => {
    user.authenticateUser(authenticationDetails, {
      onSuccess: result => {
        resolve(result);

        // //POTENTIAL: Region needs to be set if not already set previously elsewhere.
        // AWS.config.region = "<region>";

        // AWS.config.credentials = new AWS.CognitoIdentityCredentials({
        //   IdentityPoolId: "...", // your identity pool id here
        //   Logins: {
        //     // Change the key below according to the specific region your user pool is in.
        //     "cognito-idp.<region>.amazonaws.com/<YOUR_USER_POOL_ID>": result
        //       .getIdToken()
        //       .getJwtToken()
        //   }
        // });

        // // Instantiate aws sdk service objects now that the credentials have been updated.
        // // example: var s3 = new AWS.S3();
      },

      onFailure: function(err) {
        reject(err);
      }
    });
  });
};

export default CognitoHandler;
