import axios from 'axios';
// import jwtDecode from 'jwt-decode';
import * as types from './actionTypes';
import setAuthorizationToken from '../utils/authentication';

// export function updateDocumentSuccess(document)

// export function searchDocumentsSuccess(documents)

export function passSuccessMessage(successMessage) {
  return { type: types.SUCCESS_MESSAGE, successMessage };
}
export function passFailureMessage(errorMessage) {
  return { type: types.ERROR_MESSAGE, errorMessage };
}
export function searchUsersSuccess(users) {
  return { type: types.SEARCH_USERS_SUCCESS, users };
}
export function getUserSuccess(users) {
  return { type: types.GET_ALL_USERS_SUCCESS, users };
}
export function getOneUserSuccess(user) {
  return { type: types.GET_ONE_USERS_SUCCESS, user };
}

export function createUserSuccess(user) {
  return { type: types.CREATE_USER_SUCCESS, user };
}
export function setCurrentUser(user) {
  return { type: types.SET_LOGGEDIN_USER, user };
}
export function signoutUser(user) {
  return { type: types.SIGNOUT_USER, user };
}

export function search(queryString) {
  return dispatch => axios.get(`/api/search/users/?search=${queryString}`)
  .then((response) => {
    // console.log(response.data);
    dispatch(passSuccessMessage(response.data.message));
    dispatch(searchUsersSuccess(response.data.users));
  })
  .catch((error) => {
    // console.log(error.response);
    dispatch(passFailureMessage(error.response.data.message));
  });
}

export function getAllUsers(users) {
  console.log('get all users');
  return dispatch => axios.get('/api/users', users)
  .then((response) => {
    console.log('there everywhere');
    console.log('users response', response.data);
    dispatch(getUserSuccess(response.data));
  })
  .catch((error) => {
    console.log('here');
    dispatch(passFailureMessage(error.response.data.message));
    // throw error;
  });
}


export function createUser(user) {
  return dispatch => axios.post('api/users', user)
    .then((response) => {
      const token = response.data.token;
      localStorage.setItem('shelftoken', token);
      dispatch(passSuccessMessage(response.data.message));
      setAuthorizationToken(token);
      axios.defaults.headers.common.Authorization = token;
      dispatch(setCurrentUser(response.data.userData));
    })
    .catch((error) => {
      throw dispatch(passFailureMessage(error.response.data.message));
    });
}

export function login(user) {
  return dispatch => axios.post('api/users/login', user)
    .then((response) => {
      console.log(response, 'response');
      const token = response.data.token;
      const stringyToken = `${token}`;
      // localStorage.setItem('shelftoken', token);
      localStorage.setItem('shelftoken', stringyToken);
      const storedToken = localStorage.shelftoken;
      console.log('stored token', storedToken);
      dispatch(passSuccessMessage(response.data.message));
      setAuthorizationToken(token);
      axios.defaults.headers.common.Authorization = token;
      dispatch(setCurrentUser(response.data.userData));
    })
    .catch((error) => {
      throw dispatch(passFailureMessage(error.response.data.message));
    });
}

export function logout() {
  return (dispatch) => {
    localStorage.removeItem('shelftoken');
    setAuthorizationToken(false);
    dispatch(signoutUser({}));
  };
}

/**
 * delete user from database using DELETE api route /api/user/:id
 *
 * @export
 * @param {any} id - The ID of the user to be deleted
 * @returns {object} users
 */
export function deleteUser(id) {
  return dispatch => axios.delete(`/api/users/${id}`)
  .then((response) => {
    dispatch(passSuccessMessage(response.data.message));
    dispatch(getAllUsers());
  })
  .catch((error) => {
    dispatch(passFailureMessage(error.response.data.message));
  });
}

export function getOneUser(id) {
  return dispatch => axios.get(`/api/users/${id}`)
  .then((response) => {
    dispatch(getOneUserSuccess(response.data));
  })
  .catch((error) => {
    dispatch(passFailureMessage(error.response.data.message));
    throw error;
  });
}
