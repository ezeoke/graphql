import React, { useState, useEffect } from "react";
import { useQuery, useLazyQuery } from "@apollo/react-hooks";
import { GET_POST } from "../../../helpers/queries";

const GetPost = () => {
  // const { loading, data } = useQuery(GET_POST, { variables: { id } });
  const [getPost, { loading, error, data }] = useLazyQuery(GET_POST);
  const [post, setPost] = useState(null);
  // if (loading) return <p>loading...</p>;

  const handleGetPost = async () => {
    await getPost({
      variables: { id: "5d74865ab4bb230f7c6d4f4d" }
    });
  };

  // if (data && data.getPost) {
  //   setPost(data.getPost);
  // }

  useEffect(() => {
    data && setPost(data.getPost);
  }, [data]);

  return (
    <div>
      {/* {console.log("post", post)} */}
      {post && <p>{post.title}</p>}
      <button onClick={handleGetPost}>click me</button>
    </div>
  );
};

export default GetPost;
