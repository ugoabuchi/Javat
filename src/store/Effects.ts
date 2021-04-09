import { History } from "history";
import { ThunkAction } from "redux-thunk";
import AuthService from "../services/AuthService";
import GraphService from "../services/GraphService";
import { ActionsType, AppStateType } from "../types";
import api from "../utils/APIProvider";
import {
  authSuccessAction,
  fetchCurrentUserAction,
  fetchEventLogsAction,
  fetchFeedItemsAction,
  fetchSiteGroupAction,
  fetchSiteGroupsAction,
  fetchStatsAction,
  loadingAction,
} from "./Actions";

type Effect = ThunkAction<any, AppStateType, any, ActionsType>;

const authService = new AuthService();
const graphService = new GraphService();

export function MSALUserLogin(history: History, path: string): Effect {
  return async function(dispatch) {
    try {
      dispatch(loadingAction(true));
      const user = await authService.login();
      if (user) {
        const msalToken = (await authService.getToken()) || "";
        if (msalToken) {
          dispatch(UserLogin(msalToken, history, path))
        }
      }
      dispatch(loadingAction(false));
    } catch (err) {
      console.error(err);
      dispatch(loadingAction(false));
    }
  };
}

export function UserLogin(msalToken: string, history: History, path: string): Effect {
  console.info("perform api user login", msalToken)
  return async function(dispatch) {
    try {
        dispatch(loadingAction(true));
        api
          .tokenLogin({
            msalToken,
          })
          .then((res) => {
            console.info("login success", path, res.data)

            api.saveToken(res.data.token);
            history.push(path);
            dispatch(authSuccessAction(res.data.token, res.data));
          })
          .catch((err) => new Error(err));
      
    } catch (err) {
      console.error(err);
      dispatch(loadingAction(false));
    }
  };
}

// export function UserLogout(): Effect {
//   return async function (dispatch) {
//     try {
//       localStorage.removeItem("token");
//       api.removeToken();
//       // authService.logout();
//       dispatch(userLogoutAction());

//       // window.location.replace("/login");
//     } catch (err) {
//       console.error(err);
//       dispatch(loadingAction(false));
//     }
//   };
// }

export function FetchCurrentUser(): Effect {
  return async function(dispatch) {
    try {
      dispatch(loadingAction(true));
      const res = await api.get({ resource: "users", id: "me" });
      console.log(res)
      dispatch(fetchCurrentUserAction(res.data));
    } catch (err) {
      console.error(err);
      dispatch(loadingAction(false));
    }
  };
}

export function FetchStats(): Effect {
  return async function(dispatch) {
    try {
      dispatch(loadingAction(true));
      api
          .find({
            resource: "/tenants/stats",
          })
          .then((res) => {
            dispatch(fetchStatsAction(res.data));
          })
          .catch((err) => new Error(err));
    } catch (err) {
      console.error(err);
      dispatch(loadingAction(false));
    }
  };
}

export function FetchEventLogs(): Effect {
  return async function(dispatch) {
    try {
      dispatch(loadingAction(true));
      api
          .find({
            resource: "eventLogs",
            query: { page: 0 },
          })
          .then((res) => {
            dispatch(fetchEventLogsAction(res.data.results));
          })
          .catch((err) => new Error(err));
    } catch (err) {
      console.error(err);
      dispatch(loadingAction(false));
    }
  };
}

export function FetchSiteGroups(): Effect {
  return async function(dispatch) {
    try {
      dispatch(loadingAction(true));
      api
          .find({
            resource: "siteGroups",
            query: { page: 0 },
          })
          .then((res) => {
            dispatch(fetchSiteGroupsAction(res.data.results));
          })
          .catch((err) => new Error(err));
    } catch (err) {
      console.error(err);
      dispatch(loadingAction(false));
    }
  };
}

export function CreateGroup(data: { name: string; desc: string }): Effect {
  return async function(dispatch) {
    try {
      dispatch(loadingAction(true));
      api
        .create({
          resource: `siteGroups`,
          data: {
            name: data.name,
            desc: data.desc,
          },
        })
        .then((res) => {
          dispatch(FetchSiteGroups());
        })
        .catch((err) => new Error(err));
    } catch (err) {
      console.error(err);
      dispatch(loadingAction(false));
    }
  };
}

export function FetchSiteGroup(groupId: string): Effect {
  return async function(dispatch) {
    try {
      dispatch(loadingAction(true));
      api
        .get({
          resource: "siteGroups",
          id: groupId,
        })
        .then((res) => {
          dispatch(fetchSiteGroupAction(res.data));
        })
        .catch((err) => new Error(err));
    } catch (err) {
      console.error(err);
      dispatch(loadingAction(false));
    }
  };
}

export function FetchFeedItems(groupId: string): Effect {
  return async function(dispatch) {
    try {
      dispatch(loadingAction(true));
      api
          .findSub({
            resource: "siteGroups",
            subresource: "content",
            id: groupId,
          })
          .then((res) => {
            dispatch(fetchFeedItemsAction(res.data.results));
          })
          .catch((err) => {
            dispatch(loadingAction(false));
            window.history.back();
            new Error(err);
          });
    } catch (err) {
      console.error(err);
      dispatch(loadingAction(false));
    }
  };
}

export function CreateGroupContent(
  groupId: string,
  data: {
    title: string;
    body: string;
  },
  history: History,
  path: string
): Effect {
  return async function(dispatch) {
    try {
      dispatch(loadingAction(true));
      api
          .createSub({
            resource: `siteGroups`,
            subresource: `feedItems`,
            id: groupId,
            data: data,
          })
          .then((res) => {
            dispatch(loadingAction(false));
            history.push(path);
          })
          .catch((err) => new Error(err));
    } catch (err) {
      console.error(err);
      dispatch(loadingAction(false));
    }
  };
}

export function TogglePublishedContent(
  groupId: string,
  action: string,
  objectId: string,
  type: string
): Effect {
  return async function(dispatch) {
    try {
      dispatch(loadingAction(true));
       api
          .create({
            resource: `siteGroups/${groupId}/${action}/${type}`,
            data: {
              objectId: objectId,
            },
          })
          .then((res) => {
            dispatch(FetchFeedItems(groupId));
          })
          .catch((err) => {
            dispatch(loadingAction(false));
            new Error(err);
          });
    } catch (err) {
      console.error(err);
      dispatch(loadingAction(false));
    }
  };
}

export async function GetPhotos(photoUrl: string) {
  const token = (await authService.getToken()) || "";
  if (token !== "") {
    try {
      let image = await api.photo(photoUrl, token);
      let raw = Buffer.from(image.data).toString("base64");
      return "data:" + image.headers["content-type"] + ";base64," + raw;
    } catch (err) {
      console.log(err);
      new Error(err);
    }
  }
}
