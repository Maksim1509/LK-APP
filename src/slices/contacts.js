/* eslint-disable no-param-reassign */
import { createAction, createSlice } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import routes from '../routes';

const userLogin = createAction('userInfo/userLogin');

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    userContacts: [],
  },
  reducers: {
    addContact: (state, { payload }) => {
      state.userContacts.push(payload);
    },
    removeContact: (state, { payload }) => {
      const { id } = payload;
      state.userContacts = state.userContacts.filter((contact) => contact.id !== id);
    },
    editContact: (state, { payload }) => {
      const { id: contactId, name, phoneNumber } = payload;
      const editingContact = state.userContacts.find((contact) => contact.id === contactId);
      editingContact.name = name;
      editingContact.phoneNumber = phoneNumber;
    },
  },
  extraReducers: {
    [userLogin]: (state, { payload }) => {
      const { userContacts } = payload;
      state.userContacts = userContacts;
    },
  },
});

const { addContact, removeContact, editContact } = contactsSlice.actions;

const useContactsActions = () => {
  const dispatch = useDispatch();
  const addContactRequest = async (id, contact) => {
    const { data } = await axios.post(`${routes.usersPath()}/${id}/contacts`, contact);
    dispatch(addContact(data));
  };
  const removeContactRequest = async (id) => {
    await axios.delete(routes.contactsPath(id));
    dispatch(removeContact({ id }));
  };
  const editContactRequest = async (contact) => {
    await axios.patch(routes.contactsPath(contact.id), contact);
    dispatch(editContact(contact));
  };
  return {
    addContactRequest,
    removeContactRequest,
    editContactRequest,
  };
};

const actions = { ...contactsSlice.actions };

export { actions, useContactsActions };
export default contactsSlice.reducer;
