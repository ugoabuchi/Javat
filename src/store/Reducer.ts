import produce from "immer";
import { ActionsEnum, ActionsType, AppMainStore } from "../types";

export const initialState: AppMainStore = {
  isAdmin: false,
  loading: false,
  token: localStorage.getItem("token") || "",
  user: {
    businessPhones: [],
    displayName: "",
    givenName: "",
    id: "",
    jobTitle: "",
    mail: "",
    mobilePhone: "",
    officeLocation: "",
    preferredLanguage: "",
    surname: "",
    userPrincipalName: "",
    active: false,
    createdAt: "",
    email: "",
    firstName: "",
    lastName: "",
    objectId: "",
    picture: "",
    roles: [],
    siteGroups: [],
    tenantId: "",
    updatedAt: "",
  },
  stats: {
    totalContent: 0,
    totalNotification: 0,
    totalUsers: 0,
    totalGroups: 0,
  },
  eventsLog: [],
  siteGroups: [],
  siteGroup: {
    createdAt: "",
    createdDateTime: "",
    description: "",
    displayName: "",
    driveWebUrl: "",
    driverId: "",
    groupTypes: [],
    id: "",
    member: "",
    objectId: "",
    photo: "",
    siteId: "",
    siteWebUrl: "",
    tenantId: "",
    updatedAt: "",
    visibility: "",
    isOwner: false,
  },
  feedItems: [],
};

export function Reducer(state = initialState, action: ActionsType) {
  switch (action.type) {
    case ActionsEnum.LOADING:
      return produce(state, (draft) => {
        draft.loading = action.payload;
      });
    case ActionsEnum.AUTH_SUCCESS:
      return produce(state, (draft) => {
        draft.token = action.payload.token;
        draft.user = action.payload.user;
        draft.isAdmin =
          action.payload.user.roles.find((r) => r === "admin") !== undefined;
        draft.loading = false;
      });
    case ActionsEnum.LOGOUT:
      return produce(state, (draft) => {
        draft.token = "";
        draft.loading = false;
      });
    case ActionsEnum.FETCH_CURRENT_USER:
      return produce(state, (draft) => {
        draft.user = action.payload;
        draft.isAdmin =
          action.payload.roles.find((r) => r === "admin") !== undefined;
        draft.loading = false;
      });
    case ActionsEnum.FETCH_STATS:
      return produce(state, (draft) => {
        draft.stats = action.payload;
        draft.loading = false;
      });
    case ActionsEnum.FETCH_EVENT_LOGS:
      return produce(state, (draft) => {
        draft.eventsLog = action.payload;
        draft.loading = false;
      });
    case ActionsEnum.FETCH_SITEGROUPS:
      return produce(state, (draft) => {
        draft.siteGroups = action.payload;
        draft.loading = false;
      });
    case ActionsEnum.FETCH_SITEGROUP:
      return produce(state, (draft) => {
        draft.siteGroup = action.payload;
        // draft.loading = false;
      });
    case ActionsEnum.FETCH_FEED_ITEMS:
      return produce(state, (draft) => {
        draft.feedItems = action.payload;
        draft.loading = false;
      });
    default:
      return state;
  }
}
