import { GET_ERROR, GET_LOADING, GET_USER } from "./actionTypes";

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

export const fetchUser = async () => {
  try {
    const res = await fetch(``);
    return await res.json();
  } catch (error) {
    console.log(error);
  }
};
