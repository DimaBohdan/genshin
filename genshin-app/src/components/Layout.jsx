import React from 'react';
import HeaderMenu from './HeaderMenu';

const Layout = ({ children }) => {
  return (
    <div>
      <HeaderMenu />
      <main className="main-content">{children}</main>
    </div>
  );
};

export default Layout;
