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
    <div className="container">
      <header className="header">
        <nav className="navbar navbar-light bg-light">
          <a className="navbar-brand" href="/">LK APP</a>
          <span className="navbar-text ml-auto">{userName}</span>
          <a className="nav-link text-secondary" href="/" onClick={exitHandle}>Sign Out</a>
        </nav>
      </header>
      <Contacts />
      <footer className="footer bg-light">All rights reseved 2020 Maksim Abdulkhalikov</footer>
    </div>
  );
};

export default PrivatePage;
