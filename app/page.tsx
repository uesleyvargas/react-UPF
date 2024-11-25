"use client";

import React from 'react';
import LoginLogoComponent from './components/LoginLogoComponent';
import LoginFormComponent from './components/LoginFormComponent';

const PageComponent = () => {
  return (
    <div className="bg-gray-100 h-screen flex items-center justify-center">
      <div>
        <LoginLogoComponent />
        <LoginFormComponent />
      </div>
    </div>
  );
};

export default PageComponent;