/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { useHistory } from 'react-router-dom';
import { asyncActions } from '../slices';

const spiner = (
  <div className="ml-auto spinner-border text-dark" role="status">
    <span className="sr-only">Loading...</span>
  </div>
);

const LogInFrom = () => {
  const [submitType, setSebmitType] = useState(null);
  const [loginError, setLoginError] = useState(null);
  const { useLoginActions } = asyncActions;
  const { loginRequest, singinRequest } = useLoginActions();
  const history = useHistory();

  const submitHandle = async ({ userName, password }, { resetForm }) => {
    if (submitType === 'login') {
      const isAuth = await loginRequest(userName, password);
      if (isAuth) {
        setLoginError(null);
        history.push('/private');
        resetForm();
      } else {
        setLoginError('Не правильно указан логин или пароль');
      }
    } else {
      const isAuth = await singinRequest(userName, password);
      if (isAuth) {
        setLoginError(null);
        history.push('/private');
        resetForm();
      } else {
        setLoginError('Пользователь с таким именем уже существует');
      }
    }
  };
  const form = (
    <div className="form-container">
      <Formik
        initialValues={{ userName: '', password: '' }}
        onSubmit={submitHandle}
        hand
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="form-group">
              <label htmlFor="userName">Login</label>
              <Field minLength="3" className="form-control" onFocus={() => setLoginError(null)} id="login" type="text" name="userName" placeholder="Login" required />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <Field minLength="3" onFocus={() => setLoginError(null)} className="form-control" id="password" type="password" name="password" placeholder="password" required />
              {!!loginError && <div className="position-absolute invalid-feedback">{loginError}</div>}
            </div>
            <div className="form-btns">
              <button disabled={isSubmitting || !!loginError} type="submit" className="btn btn-primary mr-3" onClick={() => setSebmitType('login')}>Log In</button>
              <button disabled={isSubmitting || !!loginError} type="submit" className="btn btn-danger" onClick={() => setSebmitType('signin')}>Sign Up</button>
              {isSubmitting && spiner}
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
  return form;
};

export default LogInFrom;
