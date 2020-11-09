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
    userContacts: [],
  },
  reducers: {
    userLogin: (state, { payload }) => {
      const { id, userName, userContacts } = payload;
      state.userName = userName;
      state.id = id;
      state.userContacts = userContacts;
    },
    userSignout: (state) => {
      state.userName = null;
      state.userContacts = [];
    },
    addContact: (state, { payload }) => {
      state.userContacts.push(payload);
    },
  },
});

const { userLogin, addContact } = userSlice.actions;

const useLoginActions = () => {
  const dispatch = useDispatch();
  const loginRequest = async (userName, inputPassword) => {
    const { data: [{ id, password }] } = await axios.get(`${routes.usersPath()}?userName=${userName}`);
    if (password === inputPassword) {
      console.log('LOGIN SUCCES');
      const { data: userContacts } = await axios.get(`${routes.usersPath()}/${id}/contacts`);
      console.log(userContacts);
      dispatch(userLogin({ id, userName, userContacts }));
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

const useContactsActions = () => {
  const dispatch = useDispatch();
  const addContactRequest = async (id, contact) => {
    const { data } = await axios.post(`${routes.usersPath()}/${id}/contacts`, contact);
    dispatch(addContact(data));
  };
  return {
    addContactRequest,
  };
};

const actions = { ...userSlice.actions };

export { actions, useLoginActions, useContactsActions };
export default userSlice.reducer;
