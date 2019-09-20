import React from "react";
import logo from "./logo.svg";
import GetAllPosts from "./components/dashboard/posts/getAllPosts";
import GetPost from "./components/dashboard/posts/getPost";
import AddPost from "./components/dashboard/users/addPost";

const App = () => {
  return (
    <div className="App">
      {/* <GetAllPosts /> */}
      {/* <GetPost /> */}
      <AddPost />
    </div>
  );
};

export default App;
