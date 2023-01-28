import React, { useEffect, useState } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
const client_id = process.env.REACT_APP_CLIENT_ID;

export const Login = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    e.preventDefault();
    const value = e.target.value;
    const name = e.target.name;
    setData({ ...data, [name]: value });
  };
  const { email, password } = data;
  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await fetch(`https://fundu-api-u8jr.onrender.com/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const res2 = await res.json();
    console.log(res2);
  };
  return (
    <GoogleOAuthProvider clientId={client_id}>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          onChange={handleChange}
          placeholder="Password"
          value={password}
        />
        <button type="submit">Submit</button>
      </form>
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          localStorage.setItem("token", credentialResponse.credential);
          navigate("/home");
        }}
      />
    </GoogleOAuthProvider>
  );
};
