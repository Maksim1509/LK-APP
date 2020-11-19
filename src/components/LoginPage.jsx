import React from 'react';
import LogInFrom from './LogInForm';

const LoginPage = () => (
  <div className="container">
    <header>
      <nav className="navbar navbar-light bg-light">
        <a className="navbar-brand" href="/">YOUR CONTACTS</a>
      </nav>
    </header>
    <main>
      <LogInFrom />
    </main>
    <footer className="footer bg-light">
      All rights reseved 2020 Maksim Abdulkhalikov
    </footer>
  </div>
);

export default LoginPage;
