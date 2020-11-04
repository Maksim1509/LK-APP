/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { Formik, Form, Field } from 'formik';

const LogInFrom = () => {
  const form = (
    <div className="form-container">
      <Formik
        initialValues={{ login: '', password: '' }}
      >
        <Form>
          <div className="form-group">
            <label htmlFor="login">login</label>
            <Field className="form-control" id="login" type="text" name="login" placeholder="login" required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <Field className="form-control" id="password" type="password" name="password" placeholder="password" required />
          </div>
          <button type="submit" className="btn btn-primary">Log In</button>
        </Form>
      </Formik>
    </div>
  );
  return form;
};

export default LogInFrom;
