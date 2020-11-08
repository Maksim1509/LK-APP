/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import routes from '../routes';

const userSlice = createSlice({
  name: 'userInfo',
  initialState: {
    userName: null,
    userContacts: [],
  },
  reducers: {
    userLogin: (state, { payload }) => {
      const { userName, userContacts } = payload;
      state.userName = userName;
      state.userContacts = userContacts;
    },
    userSignout: (state) => {
      state.userName = null;
      state.userContacts = [];
    },
  },
});

const { userLogin } = userSlice.actions;

const useLoginActions = () => {
  const dispatch = useDispatch();
  const loginRequest = async (userName, inputPassword) => {
    const { data: [{ password, userContacts }] } = await axios.get(`${routes.usersPath()}?userName=${userName}`);
    if (password === inputPassword) {
      console.log('LOGIN SUCCES');
      dispatch(userLogin({ userName, userContacts }));
      return true;
    }
    console.log('INVALID LOGIN OR PASSWORD');
    return false;
  };

  const singinRequest = async (userName, password) => {
    const { data } = await axios.get(`${routes.usersPath()}?userName=${userName}`);
    console.log(data);
    if (data.length > 0) {
      console.log('login is busy');
      return;
    }
    await axios.post(routes.usersPath(), { userName, password });
  };
  return {
    loginRequest,
    singinRequest,
  };
};

const actions = { ...userSlice.actions };

export { actions, useLoginActions };
export default userSlice.reducer;
