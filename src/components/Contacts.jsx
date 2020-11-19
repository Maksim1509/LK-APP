/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import { asyncActions } from '../slices';

const renderfForm = (submitHandle) => (
  <Formik
    onSubmit={submitHandle}
    initialValues={{ name: '', phoneNumber: '' }}
  >
    <Form className="form-inline">
      <Field className="form-control mb-2 mr-sm-2" type="text" name="name" placeholder="Name" required />
      <Field className="form-control mb-2 mr-sm-2" type="tel" name="phoneNumber" placeholder="9xx-xxx-xx-xx" required />
      <button className="btn btn-primary mb-2" type="submit">Add New Contact</button>
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

const Contacts = (props) => {
  const { searchResult, setSearchResult } = props;
  const { userInfo: { id }, contactsInfo: { userContacts } } = useSelector((state) => state);
  const [contactIdEdit, setContactIdEdit] = useState(null);
  const { useContactsActions } = asyncActions;
  const { addContactRequest, removeContactRequest, editContactRequest } = useContactsActions();

  const addHandle = (values, { resetForm }) => {
    addContactRequest(id, values);
    resetForm();
  };
  const removeHandle = (contactId) => (e) => {
    e.preventDefault();
    removeContactRequest(contactId);
  };
  const editHandle = (contact, { resetForm }) => {
    editContactRequest({ ...contact, id: contactIdEdit });
    setContactIdEdit(null);
    resetForm();
  };

  const showEditForm = (icontactId) => (e) => {
    e.preventDefault();
    setContactIdEdit(icontactId);
  };
  const renderContactsList = (contact) => {
    const { id: contactId, name, phoneNumber } = contact;
    const editFuncs = { setContactIdEdit, editHandle };
    return (
      <div key={contactId} className="card">
        <div className="card-body">
          <h5 className="card-title">{name}</h5>
          <h6 className="card-subtitle mb-2 text-muted">{phoneNumber}</h6>
          <a href="/" className="card-link" onClick={showEditForm(contactId)}>Edit</a>
          <a href="/" className="card-link" onClick={removeHandle(contactId)}>Remove</a>
          {contactIdEdit === contactId && renderEditForm({ ...contact, ...editFuncs })}
        </div>
      </div>
    );
  };

  return (
    <div>
      <div className="contacts-form">
        {renderfForm(addHandle)}
      </div>
      {!!searchResult.length && (
        <div className="search-result">
          <div className="search-result-title">
            <span>Результаты поиска</span>
            <button type="button" className="btn btn-secondary" onClick={() => setSearchResult([])}>X</button>
          </div>
          {searchResult.map(renderContactsList)}
        </div>
      )}
      <div className="contacts">
        {userContacts.map(renderContactsList)}
      </div>
    </div>
  );
};

export default Contacts;
