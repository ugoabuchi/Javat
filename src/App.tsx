import React, { Suspense, useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Route, Switch, useLocation } from "react-router-dom";
import { ScaleLoader } from "react-spinners";
import Layout from "./components/Layout";
import PrivateRoute from "./components/PrivateRoute";
import { FetchCurrentUser } from "./store/Effects";
import { AppStateType } from "./types";

const Login = React.lazy(() => import("./pages/Login"));
const Dashboard = React.lazy(() => import("./pages/Dashboard"));
const Groups = React.lazy(() => import("./pages/Groups"));
const GroupContentForm = React.lazy(() => import("./pages/GroupContentForm"));
const GroupEditForm = React.lazy(() => import("./pages/GroupEditForm"));
const GroupImportContentForm = React.lazy(() => import("./pages/GroupImportContentForm"));
const GroupDetail = React.lazy(() => import("./pages/GroupDetail"));
const Activities = React.lazy(() => import("./pages/Activities"));
const Settings = React.lazy(() => import("./pages/Settings"));
const GroupRequests = React.lazy(() => import("./pages/GroupRequests"));
const ManageUsers = React.lazy(() => import("./pages/ManageUsers"));

function App() {
  const token = useSelector(
    (state: AppStateType) => state.mainStore.token,
    shallowEqual
  );
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    if (token !== "") dispatch(FetchCurrentUser());
  }, [dispatch, token]);

  const routes = (
    <Switch>
      <PrivateRoute exact path="/" component={Dashboard}></PrivateRoute>
      <PrivateRoute exact path="/siteGroups" component={Groups}></PrivateRoute>
      <PrivateRoute
        exact
        path="/siteGroups/:id"
        component={GroupDetail}
      ></PrivateRoute>
      <PrivateRoute
        exact
        path="/siteGroups/:id/createContent"
        component={GroupContentForm}
      ></PrivateRoute>
      <PrivateRoute
        exact
        path="/siteGroups/:id/editGroup"
        component={GroupEditForm}
      ></PrivateRoute>
      <PrivateRoute
        exact
        path="/siteGroups/:id/importContent"
        component={GroupImportContentForm}
      ></PrivateRoute>
      <PrivateRoute
        exact
        path="/activities"
        component={Activities}
      ></PrivateRoute>
      <PrivateRoute exact path="/settings" component={Settings}></PrivateRoute>
      <PrivateRoute
        exact
        path="/manageUsers"
        component={ManageUsers}
      ></PrivateRoute>
      <PrivateRoute
        exact
        path="/groupRequests"
        component={GroupRequests}
      ></PrivateRoute>
      <Route path="/login" exact component={Login}></Route>
    </Switch>
  );

  return (
    <Suspense
      fallback={
        <div
          style={{
            height: "100vh",
            width: "100%",
            margin: "0 auto",
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
          }}
        >
          <ScaleLoader
            loading={true}
            color={"#02A7FF"}
            height={25}
            margin={3}
          />
        </div>
      }
    >
      {location.pathname !== "/login" ? <Layout>{routes}</Layout> : <Login />}
    </Suspense>
  );
}

export default App;
