import { GET_ERROR, GET_LOADING, GET_TOKEN, GET_USER } from "./actionTypes";

const initialState = {
  user: [],
  loading: false,
  error: false,
  token: "",
};

export const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_USER: {
      return {
        user: payload,
        loading: false,
        error: false,
        token: null,
      };
    }
    case GET_LOADING: {
      return {
        user: {},
        loading: true,
        error: false,
        token: null,
      };
    }
    case GET_ERROR: {
      return {
        user: {},
        loading: false,
        error: true,
        token: null,
      };
    }
    case GET_TOKEN: {
      return {
        user: {},
        loading: false,
        error: false,
        token: payload,
      };
    }
    default:
      return state;
  }
};
