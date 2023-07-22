import React from 'react';

const CustomErrorPage = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
        <p className="text-lg mt-4">Oops! The page you are looking for does not exist.</p>
      </div>
    </div>
  );
};

export default CustomErrorPage;
