import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import AddPost from "../components/dashboard/users/addPost";
import GetAllPosts from "../components/dashboard/posts/getAllPosts";
import GetPost from "../components/dashboard/posts/getPost";
import DashBoardHome from "../components/dashboard/DashBoardHome";

const DashBoard = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/dashboard" component={DashBoardHome} />
      <Route path="/dashboard/add-post" component={AddPost} />
      <Route path="/dashboard/get-all-posts" component={GetAllPosts} />
      <Route path="/dashboard/get-post" component={GetPost} />
    </Switch>
  </BrowserRouter>
);

export default DashBoard;
