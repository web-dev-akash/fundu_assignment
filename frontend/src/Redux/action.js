import { GET_ERROR, GET_LOADING, GET_TOKEN, GET_USER } from "./actionTypes";

export const getUser = (payload) => ({
  type: GET_USER,
  payload,
});

export const getLoading = () => ({
  type: GET_LOADING,
});
export const getError = () => ({
  type: GET_ERROR,
});
export const getToken = (payload) => ({
  type: GET_TOKEN,
  payload,
});

export const fetchUser = async () => {
  try {
    const res = await fetch(`https://fundu-api-u8jr.onrender.com`);
    return await res.json();
  } catch (error) {
    console.log(error);
  }
};
