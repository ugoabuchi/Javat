import {
  ActionsEnum,
  ActionsType,
  IEventLogs,
  IFeedItem,
  ISiteGroup,
  IStats,
  IUserModel,
} from "../types";
import api from "../utils/APIProvider";

export function loadingAction(loading: boolean): ActionsType {
  return {
    payload: loading,
    type: ActionsEnum.LOADING,
  };
}

export function authSuccessAction(
  token: string,
  user: IUserModel
): ActionsType {
  return {
    payload: { token, user },
    type: ActionsEnum.AUTH_SUCCESS,
  };
}

export function userLogoutAction(): ActionsType {
  localStorage.removeItem("token");
  api.removeToken();
  // authService.logout();
  return {
    type: ActionsEnum.LOGOUT,
  };
}

export function fetchCurrentUserAction(user: IUserModel): ActionsType {
  return {
    type: ActionsEnum.FETCH_CURRENT_USER,
    payload: user,
  };
}

export function fetchStatsAction(stats: IStats): ActionsType {
  return {
    type: ActionsEnum.FETCH_STATS,
    payload: stats,
  };
}

export function fetchEventLogsAction(events: IEventLogs[]): ActionsType {
  return {
    type: ActionsEnum.FETCH_EVENT_LOGS,
    payload: events,
  };
}

export function fetchSiteGroupsAction(groups: ISiteGroup[]): ActionsType {
  return {
    type: ActionsEnum.FETCH_SITEGROUPS,
    payload: groups,
  };
}

export function fetchSiteGroupAction(group: ISiteGroup): ActionsType {
  return {
    type: ActionsEnum.FETCH_SITEGROUP,
    payload: group,
  };
}

export function fetchFeedItemsAction(feedItems: IFeedItem[]): ActionsType {
  return {
    type: ActionsEnum.FETCH_FEED_ITEMS,
    payload: feedItems,
  };
}
