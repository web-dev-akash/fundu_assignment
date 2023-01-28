import React, { useEffect, useState } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getError, getLoading } from "../Redux/action";
const client_id = process.env.REACT_APP_CLIENT_ID;

export const Login = () => {
  const navigate = useNavigate();
  const state = useSelector((state) => state);
  const { loading, error } = state;
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
    getLoading();
    try {
      const res = await fetch(`https://fundu-api-u8jr.onrender.com/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const res2 = await res.json();
      if (res2.data.length > 0) {
        localStorage.setItem("user", JSON.stringify(res2.data[0]));
        navigate("/home");
      } else {
        alert("Incorrect Email or Password");
      }
    } catch (error) {
      console.log(error);
      alert("Incorrect Email or Password");
      getError();
    }
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "95vh",
        justifyContent: "center",
        alignItems: "center",
        gap: "30px",
      }}
    >
      <GoogleOAuthProvider clientId={client_id}>
        <form
          onSubmit={handleLogin}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <input
            style={{
              padding: "10px",
              width: "300px",
            }}
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={handleChange}
          />
          <input
            style={{
              padding: "10px",
              width: "300px",
            }}
            type="password"
            name="password"
            onChange={handleChange}
            placeholder="Password"
            value={password}
          />
          <button
            type="submit"
            style={{
              padding: "10px",
              border: "none",
              cursor: "pointer",
              background: "#181818",
              color: "white",
              borderRadius: "5px",
              fontSize: "15px",
            }}
          >
            Submit
          </button>
        </form>
        <div
          style={{
            height: "1px",
            width: "320px",
            background: "#1c1c1c",
          }}
        ></div>
        <div>
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              localStorage.setItem("token", credentialResponse.credential);
              navigate("/home");
            }}
          />
        </div>
      </GoogleOAuthProvider>
    </div>
  );
};
