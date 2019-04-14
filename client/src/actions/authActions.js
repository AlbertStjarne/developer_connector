import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import { GET_ERRORS } from './types';

// Register user
export const registerUser = (userData, history) => dispatch => {
  axios
    .post('/api/users/register', userData)
    .then(res => history.push('/login'))
    .catch(err => 
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Login - get user token
export const loginUser = (userData) => dispatch => {
  axios.post('/api/users/login', userData)
    .then(res => {
      // Save to localstorage
      const { token } = res.data;
      // Set token to localstorage
      localStorage.setItem('jwtToken', token);
      // Set token to auth header
      setAuthToken(token);
    })
    .catch(err => 
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      }));
};