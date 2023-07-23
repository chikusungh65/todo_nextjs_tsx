import React from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image'

const CustomErrorPage: React.FC = () => {
  const router = useRouter();

  const handleGoToHome = () => {
    router.push('/');
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white">404 - Page Not Found</h1>
        <p className="text-lg mt-4 text-white">
          Oops! The page you are looking for does not exist.
        </p>
        <Image
          src="/error404.png"
          alt="girl sitting with a Laptop"
          className="mt-8 mx-auto w-64"
          width={200}
          height={200}
                    />
        <button
          className="mt-8 px-6 py-3 text-white bg-blue-500 rounded-md hover:bg-blue-600"
          onClick={handleGoToHome}
        >
          Go back to Home
        </button>
      </div>
    </div>
  );
};

export default CustomErrorPage;
