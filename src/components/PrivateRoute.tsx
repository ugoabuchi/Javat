import React from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Redirect, Route, RouteProps } from "react-router-dom";
import { AppStateType } from "../types";

const PrivateRoute = ({ ...rest }: RouteProps) => {
  const token = useSelector(
    (state: AppStateType) => state.mainStore.token,
    shallowEqual
  );

  const isLogin = () => (token.length !== 0 ? true : false);

  if (isLogin()) {
    return <Route {...rest} />;
  } else {
    return <Redirect to="/login" />;
  }
};

export default PrivateRoute;
