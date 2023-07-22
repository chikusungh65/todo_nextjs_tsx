import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store'; 

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const router = useRouter();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/'); 
    }
  }, [isAuthenticated, router]);

  if (isAuthenticated) {
    return <>{children}</>; 
  }

  return null; 
};

export default PrivateRoute;
