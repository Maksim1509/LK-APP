/* eslint-disable react/prop-types */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Contacts from './Contacts';
import { actions } from '../slices';

const PrivatePage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { userName } = useSelector(({ userInfo }) => userInfo);

  const exitHandle = () => {
    dispatch(actions.userSignout());
    history.push('/');
  };
  return (
    <div>
      <h1>private page</h1>
      <h2>{`user name: ${userName}`}</h2>
      <Contacts />
      <button type="button" onClick={exitHandle}>Exit</button>
    </div>
  );
};

export default PrivatePage;
