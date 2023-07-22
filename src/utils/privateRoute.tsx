import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store'; // Import the RootState from your Redux store

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const router = useRouter();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/signin'); // Redirect to the sign-in page if the user is not authenticated
    }
  }, [isAuthenticated, router]);

  if (isAuthenticated) {
    return <>{children}</>; // Render the children components if the user is authenticated
  }

  return null; // Return null if the user is not authenticated (to avoid rendering unauthenticated content)
};

export default PrivateRoute;
