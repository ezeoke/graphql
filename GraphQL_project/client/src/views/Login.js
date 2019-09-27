import React, { useReducer } from "react";
import { useMutation } from "@apollo/react-hooks";
import { LOGIN_USER } from "../helpers/mutations";
import { Link } from "react-router-dom";
import getUser from "../helpers/getUser";

const Login = props => {
  const [login] = useMutation(LOGIN_USER);
  const [log, setLog] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      email: "",
      password: ""
    }
  );

  const handleChange = e => {
    setLog({ [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (log.email && log.password) {
      const { data } = await login({ variables: { ...log } });

      localStorage.setItem("auth_token", data.login.token);
      // console.log(data.login.token, "token");
      const user = getUser(data.login.token);

      const location = {
        pathname: "/dashboard",
        user
      };

      setLog({ email: "", password: "" });

      props.history.push(location);

      // console.log("DATA", code);
    } else {
      alert("please input your details");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" name="email" onChange={handleChange} />
        <input type="text" name="password" onChange={handleChange} />
        <button>submit</button>
      </form>

      <Link to="/signup">
        <button>Sign up</button>
      </Link>
    </div>
  );
};

export default Login;
