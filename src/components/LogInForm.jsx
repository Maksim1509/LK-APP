/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useContext, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { useHistory } from 'react-router-dom';
import { asyncActions } from '../slices';
import authContext from '../context';

const LogInFrom = () => {
  const [submitType, setSebmitType] = useState(null);
  const { useLoginActions } = asyncActions;
  const { loginRequest, singinRequest } = useLoginActions();
  const context = useContext(authContext);
  const history = useHistory();

  const submitHandle = async ({ userName, password }, { resetForm }) => {
    console.log(submitType);
    if (submitType === 'login') {
      const isAuth = await loginRequest(userName, password);
      if (isAuth) {
        context.user = userName;
        history.push('/private');
      }
      resetForm();
    } else {
      await singinRequest(userName, password);
      resetForm();
    }
  };
  const form = (
    <div className="form-container">
      <Formik
        initialValues={{ userName: '', password: '' }}
        onSubmit={submitHandle}
      >
        <Form>
          <div className="form-group">
            <label htmlFor="userName">Login</label>
            <Field className="form-control" id="login" type="text" name="userName" placeholder="Login" required />
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
