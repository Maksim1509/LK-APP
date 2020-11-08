import { combineReducers } from '@reduxjs/toolkit';
import userInfo, { actions as loginActions, useLoginActions } from './login';

export default combineReducers({
  userInfo,
});

const actions = {
  ...loginActions,
};

const asyncActions = {
  useLoginActions,
};

export {
  actions,
  asyncActions,
};
