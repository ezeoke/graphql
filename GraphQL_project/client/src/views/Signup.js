import React, { useReducer } from "react";
import { ADD_AUTHOR } from "../helpers/mutations";
import { useMutation } from "@apollo/react-hooks";

const Signup = props => {
  const [addAuthor] = useMutation(ADD_AUTHOR);
  const [user, setUser] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    { name: "", username: "", email: "", password: "" }
  );

  const handleChange = e => {
    setUser({ [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (user.name && user.username && user.password && user.email) {
      const { data } = await addAuthor({
        variables: {
          ...user
        }
      });

      setUser({ name: "", username: "", email: "", password: "" });
      const location = { pathname: "/login" };
      if (data) {
        props.history.push(location);
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={user.name}
          placeholder="name"
          onChange={handleChange}
        />
        <input
          type="text"
          name="username"
          value={user.username}
          placeholder="username"
          onChange={handleChange}
        />
        <input
          type="text"
          name="email"
          value={user.email}
          placeholder="email"
          onChange={handleChange}
        />
        <input
          type="text"
          name="password"
          value={user.password}
          placeholder="password"
          onChange={handleChange}
        />
        <button>Sign up</button>
      </form>
    </div>
  );
};

export default Signup;
