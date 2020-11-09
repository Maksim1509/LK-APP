/* eslint-disable react/prop-types */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import { actions, asyncActions } from '../slices';

const renderContactsList = (removeHandle) => ({ id, name, phoneNumber }) => (
  <li key={id}>
    <hr />
    <b>{`Name: ${name}`}</b>
    <br />
    <b>{`Phone Number: ${phoneNumber}`}</b>
    <button type="button" onClick={removeHandle(id)}>Remove contact</button>
    <hr />
  </li>
);

const renderfForm = (submitHandle) => (
  <Formik
    onSubmit={submitHandle}
    initialValues={{ name: '', phoneNumber: '' }}
  >
    <Form>
      <Field type="text" name="name" />
      <Field type="tel" name="phoneNumber" />
      <button type="submit">Add New Contact</button>
    </Form>
  </Formik>
);

const PrivatePage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id, user, userContacts } = useSelector(({ userInfo }) => userInfo);
  const { useContactsActions } = asyncActions;
  const { addContactRequest, removeContactRequest } = useContactsActions();

  const exitHandle = () => {
    dispatch(actions.userSignout());
    history.push('/');
  };
  const addHandle = (values, { resetForm }) => {
    addContactRequest(id, values);
    resetForm();
  };
  const removeHandle = (contactId) => () => {
    removeContactRequest(contactId);
  };

  return (
    <div>
      <h1>private page</h1>
      <h2>{`user name: ${user}`}</h2>
      {renderfForm(addHandle)}
      <ul>
        {userContacts.map(renderContactsList(removeHandle))}
      </ul>
      <button type="button" onClick={exitHandle}>Exit</button>
    </div>
  );
};

export default PrivatePage;
