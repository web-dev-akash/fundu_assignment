import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers, getError, getLoading, getUsers } from "../Redux/action";
import { useJwt } from "react-jwt";
import { useNavigate } from "react-router-dom";
import { googleLogout } from "@react-oauth/google";

export const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const state = useSelector((state) => state);
  const { users, loading, error } = state;
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  const { decodedToken } = useJwt(token);
  useEffect(() => {
    getLoading();
    fetchUsers()
      .then((res) => {
        dispatch(getUsers(res));
      })
      .catch((error) => {
        console.log(error);
        getError();
      });
  }, []);
  const handleLogout = () => {
    googleLogout();
    if (user) {
      localStorage.removeItem("user");
    }
    localStorage.removeItem("token");
    navigate("/");
  };
  if (loading) {
    return (
      <div>
        <h1>Loading</h1>
      </div>
    );
  }
  if (error) {
    return (
      <div>
        <h1>Something Went Wrong</h1>
      </div>
    );
  }
  return (
    <div>
      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "20px",
          height: "50px",
          alignItems: "center",
          background: "#f1f1f1",
          marginBottom: "50px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: " 10px",
          }}
        >
          <h2>
            Hey, {decodedToken ? decodedToken.name : user ? user.name : null}
          </h2>
          {decodedToken && (
            <img
              width={"60px"}
              src={decodedToken.picture}
              alt="logo"
              style={{
                borderRadius: "50%",
              }}
            />
          )}
        </div>
        <div>
          <button
            style={{
              border: "none",
              padding: "10px 20px",
              background: "white",
              fontSize: "20px",
              borderRadius: "10px",
              cursor: "pointer",
            }}
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </nav>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "40px",
        }}
      >
        {users.data
          ? users.data.map(({ name, _id }) => (
              <div
                key={_id}
                style={{
                  boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                }}
              >
                <h1>{name}</h1>
              </div>
            ))
          : null}
      </div>
    </div>
  );
};
