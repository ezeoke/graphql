import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { GET_ALL_POSTS } from "../../../helpers/queries";

const GetAllPosts = () => {
  const { loading, error, data } = useQuery(GET_ALL_POSTS);
  console.log("data", data);
  if (loading) return <p>Loading....</p>;
  console.log("error", error);
  if (error) return <p> Error:</p>;

  return (
    data &&
    data.getAllPosts.map(({ id, title, body }) => (
      <div key={id}>
        <p>title: {title}</p>
        <p>body: {body}</p>
      </div>
    ))
  );
};

export default GetAllPosts;
