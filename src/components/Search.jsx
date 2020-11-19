/* eslint-disable react/prop-types */
import React from 'react';
import { useSelector } from 'react-redux';
import { Formik, Form, Field } from 'formik';

const Search = (props) => {
  const { setSearchResult } = props;
  const { userContacts } = useSelector(({ contactsInfo }) => contactsInfo);
  const searchHandle = ({ value }, { resetForm }) => {
    const res = userContacts.filter((contact) => contact.name.includes(value));
    setSearchResult(res);
    resetForm();
  };
  return (
    <div>
      <Formik onSubmit={searchHandle} initialValues={{ value: '' }}>
        <Form className="form-inline my-2 my-lg-0">
          <Field className="form-control mr-sm-2" type="search" name="value" placeholder="search" aria-label="Search" />
          <button className="btn btn-outline-primary my-2 my-sm-0" type="submit">Search</button>
        </Form>
      </Formik>
    </div>
  );
};

export default Search;
