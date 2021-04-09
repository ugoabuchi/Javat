export interface IUserModel {
  active: boolean;
  createdAt: string;
  updatedAt: string;
  firstName: string;
  email: string;
  lastName: string;
  picture: string;
  tenantId: string;
  roles: string[];
  siteGroups: string[];
  businessPhones: string[];
  objectId: string;
  displayName: string;
  givenName: string;
  jobTitle: string;
  mail: string;
  mobilePhone: string;
  officeLocation: string;
  preferredLanguage: string;
  surname: string;
  userPrincipalName: string;
  id: string;
}

export interface IStats {
  totalUsers: number;
  totalContent: number;
  totalNotification: number;
  totalGroups: number;
}

export interface IEventLogs {
  id: string;
  action: string;
  createdAt: string;
  title: string;
  updatedAt: string;
  user: string;
}

export interface ISiteGroup {
  createdAt: string;
  createdDateTime: string;
  description: string;
  displayName: string;
  driverId: string;
  driveWebUrl: string;
  groupTypes: string[];
  id: string;
  member: string;
  objectId: string;
  photo: string;
  siteId: string;
  siteWebUrl: string;
  tenantId: string;
  updatedAt: string;
  visibility: string;
  isOwner: boolean;
}

export interface IFeedItem {
  siteId: string;
  driveId: string;
  objectId: string;
  type: string;
  name: string;
  title: string;
  webUrl: string;
  siteWebUrl: string;
  photo: string;
  body: string;
  summary: string;
  mimeType: string;
  size: number;
  pageLayout: string;
  createdDateTime: string;
  siteGroup: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

// Store
export type AppMainStore = {
  loading: boolean;
  token: string;
  isAdmin: boolean;
  user: IUserModel;
  stats: IStats;
  eventsLog: IEventLogs[];
  siteGroups: ISiteGroup[];
  siteGroup: ISiteGroup;
  feedItems: IFeedItem[];
};

// State
export type AppStateType = {
  mainStore: AppMainStore;
};

// Actions
type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? { type: Key }
    : { type: Key; payload: M[Key] };
};

export enum ActionsEnum {
  LOADING = "LOADING",
  AUTH_SUCCESS = "AUTH_SUCCESS",
  LOGOUT = "LOGOUT",
  FETCH_CURRENT_USER = "FETCH_CURRENT_USER",
  FETCH_STATS = "FETCH_STATS",
  FETCH_EVENT_LOGS = "FETCH_EVENT_LOGS",
  FETCH_SITEGROUPS = "FETCH_SITEGROUPS",
  FETCH_SITEGROUP = "FETCH_SITEGROUP",
  FETCH_FEED_ITEMS = "FETCH_FEED_ITEMS",
}

type Payloads = {
  [ActionsEnum.LOADING]: boolean;
  [ActionsEnum.AUTH_SUCCESS]: { token: string; user: IUserModel };
  [ActionsEnum.LOGOUT]: undefined;
  [ActionsEnum.FETCH_CURRENT_USER]: IUserModel;
  [ActionsEnum.FETCH_STATS]: IStats;
  [ActionsEnum.FETCH_EVENT_LOGS]: IEventLogs[];
  [ActionsEnum.FETCH_SITEGROUPS]: ISiteGroup[];
  [ActionsEnum.FETCH_SITEGROUP]: ISiteGroup;
  [ActionsEnum.FETCH_FEED_ITEMS]: IFeedItem[];
};

export type ActionsType = ActionMap<Payloads>[keyof ActionMap<Payloads>];
