import { combineReducers } from '@reduxjs/toolkit';
import userInfo, { actions as loginActions, useLoginActions, useContactsActions } from './login';

export default combineReducers({
  userInfo,
});

const actions = {
  ...loginActions,
};

const asyncActions = {
  useLoginActions,
  useContactsActions,
};

export {
  actions,
  asyncActions,
};
