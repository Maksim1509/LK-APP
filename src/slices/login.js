// import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../routes';

const useLoginActions = () => {
  const loginRequest = async (userName, inputPassword) => {
    console.log(111);
    const { data } = await axios.get(`${routes.usersPath()}?userName=${userName}`);
    console.log(data);
    if (data[0].password === inputPassword) {
      alert('LOGIN SUCCES');
    } else {
      alert('INVALID LOGIN OR PASSWORD');
    }
  };

  const singinRequest = async (userName, password) => {
    const data = axios.post(`${routes.usersPath()}?userName=${userName}`);
    if (!data.length) {
      alert('login is busy');
      return;
    }
    await axios.post(routes.usersPath(), { userName, password });
  };
  return {
    loginRequest,
    singinRequest,
  };
};

export default useLoginActions;
