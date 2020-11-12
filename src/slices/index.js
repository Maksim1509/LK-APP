import { combineReducers } from '@reduxjs/toolkit';
import userInfo, { actions as loginActions, useLoginActions } from './login';
import contactsInfo, { actions as contactsActions, useContactsActions } from './contacts';

export default combineReducers({
  userInfo,
  contactsInfo,
});

const actions = {
  ...loginActions,
  ...contactsActions,
};

const asyncActions = {
  useLoginActions,
  useContactsActions,
};

export {
  actions,
  asyncActions,
};
