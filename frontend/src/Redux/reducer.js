import {
  GET_ERROR,
  GET_LOADING,
  GET_TOKEN,
  GET_USER,
  GET_USERS,
} from "./actionTypes";

const initialState = {
  user: {},
  loading: false,
  error: false,
  users: [],
};

export const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_USERS: {
      return {
        ...state,
        users: payload,
        loading: false,
        error: false,
      };
    }
    case GET_LOADING: {
      return {
        ...state,
        loading: true,
      };
    }
    case GET_ERROR: {
      return {
        ...state,
        error: true,
      };
    }
    case GET_USER: {
      return {
        ...state,
        user: payload,
      };
    }
    default:
      return state;
  }
};
