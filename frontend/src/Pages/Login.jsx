import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { useJwt } from "react-jwt";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getToken } from "../Redux/action";

export const Login = () => {
  const client_id = process.env.REACT_APP_CLIENT_ID;
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
                dispatch(getToken(credentialResponse.credential));
                navigate("/home");
              }}
            />
          </Form>
        )}
      </Formik>
    </GoogleOAuthProvider>
  );
};
