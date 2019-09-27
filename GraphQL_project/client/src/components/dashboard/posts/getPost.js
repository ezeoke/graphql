import React, { useState, useEffect } from "react";
import { useLazyQuery } from "@apollo/react-hooks";
import { GET_POST } from "../../../helpers/queries";

const GetPost = () => {
  // const { loading, data } = useQuery(GET_POST, { variables: { id } });
  const [getPost, { loading, error, data }] = useLazyQuery(GET_POST);
  const [post, setPost] = useState(null);
  // if (loading) return <p>loading...</p>;

  const handleGetPost = async () => {
    await getPost({
      variables: { id: "5d8cbc379dc1c7152f2ff33a" }
    });
  };

  // if (data && data.getPost) {
  //   setPost(data.getPost);
  // }

  console.log("daat", data);

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
