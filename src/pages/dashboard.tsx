import React from 'react';
import PrivateRoute from '../utils/privateRoute';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import TodoItem from '@/components/TodoItem';
import TodoList from '@/components/TodoList';

const Dashboard: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <PrivateRoute>
      <div>
        <h1>Welcome</h1> 
        <TodoList/>
      </div>
    </PrivateRoute>
  );
};

export default Dashboard;
