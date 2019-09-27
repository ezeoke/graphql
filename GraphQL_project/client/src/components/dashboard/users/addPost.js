import React, { useReducer } from "react";
import { useMutation } from "@apollo/react-hooks";
import { ADD_POST } from "../../../helpers/mutations";

const AddPost = () => {
  const [postState, setPostState] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      title: "",
      body: ""
    }
  );
  const [addPost] = useMutation(ADD_POST);

  const handleChange = e => {
    setPostState({ [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (postState.title && postState.body) {
      console.log(postState, postState.body);
      addPost({
        variables: {
          ...postState,
          authorId: "5d8648ca39a433185534efd0",
          isPublished: true
        }
      });
      setPostState({ title: "", body: "" });
    } else alert("you have to provide data");
  };

  // const handleSaveDraft = () => {
  //   console.log("saving data as draft... :)");
  // };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={postState.title}
          name="title"
          onChange={handleChange}
        />
        <br />
        <input
          type="text"
          value={postState.body}
          name="body"
          onChange={handleChange}
        />
        <br />
        <button>Publish</button>
        {/* <button onClick={handleSaveDraft}>Save Draft</button> */}
      </form>
    </div>
  );
};

export default AddPost;

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

// const SchemaValidation = Yup.object().shape({
// 	authorId: Yup.string().required('author Id is required'),
// 	title: Yup.string().required('title is required'),

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
// body: Yup.string().trim()

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
// })

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
