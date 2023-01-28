import React from "react";
import { useSelector } from "react-redux";

export const Home = () => {
  const state = useSelector((state) => state);
  const { user, loading, error, token } = state;
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
  return <div>{user.map((item) => {})}</div>;
};
