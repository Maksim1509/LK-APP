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
      state.id = null;
      state.userContacts = [];
    },
    addContact: (state, { payload }) => {
      state.userContacts.push(payload);
    },
    removeContact: (state, { payload }) => {
      const { id } = payload;
      state.userContacts = state.userContacts.filter((contact) => contact.id !== id);
    },
  },
});

const { userLogin, addContact, removeContact } = userSlice.actions;

const useLoginActions = () => {
  const dispatch = useDispatch();
  const loginRequest = async (userName, inputPassword) => {
    const { data: [{ id, password }] } = await axios.get(`${routes.usersPath()}?userName=${userName}`);
    if (password === inputPassword) {
      console.log('LOGIN SUCCES');
      const { data: userContacts } = await axios.get(`${routes.usersPath()}/${id}/contacts`);
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

const useContactsActions = () => {
  const dispatch = useDispatch();
  const addContactRequest = async (id, contact) => {
    const { data } = await axios.post(`${routes.usersPath()}/${id}/contacts`, contact);
    dispatch(addContact(data));
  };
  const removeContactRequest = async (id) => {
    const data = await axios.delete(routes.contactsPath(id));
    console.log(data);
    dispatch(removeContact({ id }));
  };
  return {
    addContactRequest,
    removeContactRequest,
  };
};

const actions = { ...userSlice.actions };

export { actions, useLoginActions, useContactsActions };
export default userSlice.reducer;
