import { Button, Divider } from "antd";
import React from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Loader from "../components/Loader";
import { MSALUserLogin } from "../store/Effects";
import { AppStateType } from "../types";

const Login: React.FC = () => {
  const loading = useSelector(
    (state: AppStateType) => state.mainStore.loading,
    shallowEqual
  );
  const dispatch = useDispatch();
  const history = useHistory();

  return (
    <>
      {loading ? <Loader /> : null}
      <div className="login-page">
        <div className="container">
          <img src={require("../assets/images/logo.png")} alt="Logo" />
          <div className="content">
            <div className="body">
              <div className="heading">Welcome back!</div>
              <div className="subheading">
                Please sign in to your account below.
              </div>
            </div>
            <Divider type="horizontal" />
            <Button
              type="primary"
              htmlType="button"
              onClick={() => dispatch(MSALUserLogin(history, "/"))}
            >
              Login with your Microsoft account
            </Button>
          </div>
          <div className="copyline">
            Copyright © JAVAT 365 - {new Date().getFullYear()}
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
