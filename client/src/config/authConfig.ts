const CLIENT_ID = import.meta.env.VITE_CLIENT_ID

import { Configuration, PublicClientApplication } from "@azure/msal-browser";
export const msalConfig: Configuration = {
    auth: {
        clientId: CLIENT_ID, // Your Client ID from Azure
    },
};

export const pca = new PublicClientApplication(msalConfig);
