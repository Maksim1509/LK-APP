import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Formik, Form, Field } from 'formik';

const renderSearchList = (contact) => <li key={contact.id}>{`${contact.name}: ${contact.phoneNumber}`}</li>;

const Search = () => {
  const [searchResult, setSearchResult] = useState([]);
  const { userContacts } = useSelector(({ userInfo }) => userInfo);
  const searchHandle = ({ value }, { resetForm }) => {
    const res = userContacts.filter((contact) => contact.name.includes(value));
    setSearchResult(res);
    resetForm();
  };
  const closeSearch = () => setSearchResult([]);
  return (
    <div>
      <Formik onSubmit={searchHandle} initialValues={{ value: '' }}>
        <Form>
          <Field type="text" name="value" placeholder="search" />
          <button type="submit">Search</button>
        </Form>
      </Formik>
      {searchResult.length > 0 && (
      <div>
        <button type="button" onClick={closeSearch}>Close</button>
        <ul>
          {searchResult.map(renderSearchList)}
        </ul>
      </div>
      )}
    </div>
  );
};

export default Search;
