/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import useLoginActions from './slices/login';

const LogInFrom = () => {
  const [submitType, setSebmitType] = useState(null);
  const { loginRequest, singinRequest } = useLoginActions();

  const submitHandle = async ({ login, password }, { resetForm }) => {
    console.log(submitType);
    if (submitType === 'login') {
      await loginRequest(login, password);
      resetForm();
    } else {
      await singinRequest(login, password);
      resetForm();
    }
  };
  const form = (
    <div className="form-container">
      <Formik
        initialValues={{ login: '', password: '' }}
        onSubmit={submitHandle}
      >
        <Form>
          <div className="form-group">
            <label htmlFor="login">Login</label>
            <Field className="form-control" id="login" type="text" name="login" placeholder="Login" required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <Field className="form-control" id="password" type="password" name="password" placeholder="password" required />
          </div>
          <button type="submit" className="btn btn-primary mr-3" onClick={() => setSebmitType('login')}>Log In</button>
          <button type="submit" className="btn btn-danger" onClick={() => setSebmitType('signin')}>Sign In</button>
        </Form>
      </Formik>
    </div>
  );
  return form;
};

export default LogInFrom;
