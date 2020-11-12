/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import routes from '../routes';

const userSlice = createSlice({
  name: 'userInfo',
  initialState: {
    userName: null,
    id: null,
  },
  reducers: {
    userLogin: (state, { payload }) => {
      const { id, userName } = payload;
      state.userName = userName;
      state.id = id;
    },
    userSignout: (state) => {
      state.userName = null;
      state.id = null;
      state.userContacts = [];
    },
  },
});

const { userLogin } = userSlice.actions;

const useLoginActions = () => {
  const dispatch = useDispatch();
  const loginRequest = async (userName, inputPassword) => {
    const { data: [{ id, password }] } = await axios.get(`${routes.usersPath()}?userName=${userName}`);
    if (password === inputPassword) {
      const { data: userContacts } = await axios.get(`${routes.usersPath()}/${id}/contacts`);
      dispatch(userLogin({ id, userName, userContacts }));
      return true;
    }
    return false;
  };

  const singinRequest = async (userName, password) => {
    const { data } = await axios.get(`${routes.usersPath()}?userName=${userName}`);
    console.log(data);
    if (data.length > 0) {
      return false;
    }
    const { data: { id } } = await axios.post(routes.usersPath(), { userName, password });
    const { data: userContacts } = await axios.get(`${routes.usersPath()}/${id}/contacts`);
    dispatch(userLogin({ id, userName, userContacts }));
    return true;
  };
  return {
    loginRequest,
    singinRequest,
  };
};

const actions = { ...userSlice.actions };

export { actions, useLoginActions };
export default userSlice.reducer;
