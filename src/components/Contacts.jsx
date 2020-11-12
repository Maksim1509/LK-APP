import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import { asyncActions } from '../slices';
import Search from './Search';

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

const renderEditForm = (options) => (
  <Formik
    onSubmit={options.editHandle}
    initialValues={{ name: options.name, phoneNumber: options.phoneNumber }}
  >
    <Form>
      <Field type="text" name="name" />
      <Field type="tel" name="phoneNumber" />
      <button type="submit">Submit</button>
      <button type="button" onClick={() => options.setContactIdEdit(null)}>Close</button>
    </Form>
  </Formik>
);

const Contacts = () => {
  const { userInfo: { id }, contactsInfo: { userContacts } } = useSelector((state) => state);
  const [contactIdEdit, setContactIdEdit] = useState(null);
  const { useContactsActions } = asyncActions;
  const { addContactRequest, removeContactRequest, editContactRequest } = useContactsActions();

  const addHandle = (values, { resetForm }) => {
    addContactRequest(id, values);
    resetForm();
  };
  const removeHandle = (contactId) => () => {
    removeContactRequest(contactId);
  };
  const editHandle = (contact, { resetForm }) => {
    editContactRequest({ ...contact, id: contactIdEdit });
    setContactIdEdit(null);
    resetForm();
  };

  const renderContactsList = (contact) => {
    const { id: contactId, name, phoneNumber } = contact;
    const editFuncs = { setContactIdEdit, editHandle };
    return (
      <li key={contactId}>
        <hr />
        <b>{`Name: ${name}`}</b>
        <br />
        <b>{`Phone Number: ${phoneNumber}`}</b>
        <br />
        <button type="button" onClick={() => setContactIdEdit(contactId)}>Edit Contact</button>
        <button type="button" onClick={removeHandle(contactId)}>Remove contact</button>
        <br />
        {contactIdEdit === contactId && renderEditForm({ ...contact, ...editFuncs })}
      </li>
    );
  };

  return (
    <ul>
      {renderfForm(addHandle)}
      <Search />
      {userContacts.map(renderContactsList)}
    </ul>
  );
};

export default Contacts;
