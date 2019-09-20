import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// Import Helpers
import PrivateRoute from "./auth/PrivateRoute";

import AddPost from "../components/dashboard/posts/AddPost";

const App = () => (
  <Router>
    <Fragment>
      <Switch>
        <Route exact path="/" component={AddPost} />
      </Switch>
    </Fragment>
  </Router>
);

export default App;
