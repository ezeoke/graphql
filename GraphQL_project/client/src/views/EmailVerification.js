import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";
import { VERIFY_EMAIL } from "../helpers/queries";

const EmailVerification = ({ location, history }) => {
  const [verifyEmail] = useMutation(VERIFY_EMAIL);

  useEffect(() => {
    const { search } = location;
    const token = search.split("=")[1];

    verifyEmail({
      variables: { emailToken: token }
    }).then(() => {
      history.push("/login");
    });
  });

  return (
    <div>
      <h3>Verify your email</h3>

      <p>
        you will automatically be redirected to the login page... please wait{" "}
        <span role="img" aria-label="image">
          ⏳
        </span>
      </p>
    </div>
  );
};

export default withRouter(EmailVerification);
