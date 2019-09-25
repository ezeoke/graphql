import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "./views/Login";
import Signup from "./views/Signup";
import PrivateRoute from "./components/auth/PrivateRoute";
import DashBoard from "./views/DashBoard";
import Splash from "./views/Splash";
import EmailVerification from "./views/EmailVerification";

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Splash} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/verify-email" component={EmailVerification} />
        <PrivateRoute path="/dashboard" component={DashBoard} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
