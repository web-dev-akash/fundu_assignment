import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { useJwt } from "react-jwt";
import { useNavigate } from "react-router-dom";
export const Login = () => {
  const client_id = process.env.REACT_APP_CLIENT_ID;
  const [token, setToken] = useState("");
  const { decodedToken, isExpired } = useJwt(token);
  const navigate = useNavigate();
  console.log(decodedToken);
  return (
    <GoogleOAuthProvider clientId={client_id}>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {({ handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <Field type="email" name="email" placeholder="Email" />
            <Field type="password" name="password" placeholder="Password" />
            <GoogleLogin
              onSuccess={(credentialResponse) => {
                setToken(credentialResponse.credential);
                navigate("/home");
              }}
            />
          </Form>
        )}
      </Formik>
    </GoogleOAuthProvider>
  );
};
