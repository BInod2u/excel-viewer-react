export const msalConfig = {
  auth: {
    clientId: "REPLACE_WITH_YOUR_CLIENT_ID",
    authority: "https://login.microsoftonline.com/common",
    redirectUri: window.location.origin
  },
  cache: {
    cacheLocation: "localStorage",
    storeAuthStateInCookie: false
  }
};

export const graphScopes = ["User.Read", "Files.Read"];
