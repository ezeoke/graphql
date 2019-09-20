import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/react-hooks";
import { ADD_POST } from "../../../helpers/mutations";
import { Formik } from "formik";
import * as Yup from "yup";

const AddPost = () => {
  const [addPost] = useMutation(ADD_POST);
  const [postState, setPostState] = useState({
    title: "",
    body: "",
    authorId: "",
    isPublished: false
  });

  const handleChange = e => {
    // const { name, value } = target;
    setPostState({ [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const handleSubmit = async e => {
      e.preventDefault();

      if (postState.title && postState.body) {
        try {
          await addPost({
            variables: {
              data: {
                title: postState.title,
                body: postState.body,
                authorId: "5d6d364f1e13fe2d8fdc10b5",
                isPublished: true
              }
            }
          });
        } catch (error) {
          console.error(error);
        }
      } else alert("you have to provide data");
    };
  }, []);

  const handleSaveDraft = () => {
    console.log("saving data as draft... :)");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={postState.title}
        name="title"
        onChange={handleChange}
      />
      <input
        type="text"
        value={postState.body}
        name="body"
        onChange={handleChange}
      />
      <button role="submit">Publish</button>
      <button onClick={handleSaveDraft}>Save Draft</button>
    </form>
  );
};

{
  /* <form
      onSubmit={e => {
        e.preventDefault();
        addPost({
          variables: {
            authorId: input.value,
            title: input.value,
            body: input.value
          }
        });
        input.value = "";
      }}
    >
      <input />
    </form> */
}

// const SchemaValidation = Yup.object().shape({
// 	authorId: Yup.string().required('author Id is required'),
// 	title: Yup.string().required('title is required'),
// body: Yup.string().trim()
// })

// const initialValues = {
// 	title: '',
// 	body: '',
// 	authorId: ''
// }

// const AddPost = ({}) => {
// 	const [addPost] = useMutation(ADD_POST)
// 	return <Formik
// 	initialValues= {initialValues}
// 	validationSchema = {SchemaValidation}
// 	onSubmit={(data, {setErrors, resetForm})
// 	=>{
// 		addPost({
// 			variables: {}
// 		})
// 	}
// 	>

// 	</Formik>
// }

export default AddPost;
