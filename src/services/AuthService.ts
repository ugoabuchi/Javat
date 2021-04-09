import * as Msal from "msal";
import { userLogoutAction } from "../store/Actions";
import { store } from "../store/ConfigStore";

export default class AuthService {
  private graphScopes: string[] = [];
  private msal: Msal.UserAgentApplication;

  constructor() {
    let redirectUri = "https://react-javat365.ahsanghalib.vercel.app";
    if (
      window.location.hostname === "127.0.0.1" ||
      window.location.hostname === "localhost"
    ) {
      redirectUri = "http://localhost:3000";
    }

    this.graphScopes = [
      "user.read",
      "Group.Read.All",
      "Directory.Read.All",
      "Group.ReadWrite.All",
      "Directory.ReadWrite.All",
      "Sites.ReadWrite.All",
    ];

    this.msal = new Msal.UserAgentApplication({
      auth: {
        clientId: "ffb2585f-11ff-4334-bc65-3cd82bd16855",
        redirectUri: redirectUri,
      },
    });
  }

  async login() {
    return this.msal
      .loginPopup({
        scopes: this.graphScopes,
      })
      .then((data) => {
        const user: Msal.Account = this.msal.getAccount();
        if (user) {
          return user;
        } else {
          return null;
        }
      })
      .catch((err) => console.error(err));
  }

  logout() {
    this.msal.logout();
  }

  async getToken() {
    return this.msal
      .acquireTokenSilent({ scopes: this.graphScopes })
      .then((data) => {
        console.info("silent-token-acquire...");
        return data.accessToken;
      })
      .catch((error) => {
        console.info("ERROR-silent-token-acquire...");
        console.error(error);
        return this.msal.acquireTokenPopup({ scopes: this.graphScopes }).then(
          (data) => {
            console.info("popup-token-acquire...");
            return data.accessToken;
          },
          (err) => {
            console.info("error fetching token");
            store.dispatch(userLogoutAction());
            // this.logout()
            throw new Error(err);
          }
        );
      });
  }
}
