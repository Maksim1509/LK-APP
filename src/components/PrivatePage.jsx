import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import context from '../context';
import { asyncActions } from '../slices';

const renderContactsList = ({ name, phoneNumber }, id) => (
  <li key={id}>
    <hr />
    <b>{`Name: ${name}`}</b>
    <br />
    <b>{`Phone Number: ${phoneNumber}`}</b>
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
  const history = useHistory();
  const authContext = useContext(context);
  const { id, userContacts } = useSelector(({ userInfo }) => userInfo);
  const { useContactsActions } = asyncActions;
  const { addContactRequest } = useContactsActions();
  const exitHandle = () => {
    authContext.user = null;
    history.push('/');
  };
  const addContactHandle = (values, { resetForm }) => {
    console.log(1111);
    addContactRequest(id, values);
    resetForm();
  };

  return (
    <div>
      <h1>private page</h1>
      <h2>{`user name: ${authContext.user}`}</h2>
      {renderfForm(addContactHandle)}
      <ul>
        {userContacts.map(renderContactsList)}
      </ul>
      <button type="button" onClick={exitHandle}>Exit</button>
    </div>
  );
};

export default PrivatePage;
