import { combineReducers } from '@reduxjs/toolkit';
import todosReducer from './todosSlice';
import authReducer from './authSlice';  

const rootReducer = combineReducers({
  todos: todosReducer, 
  auth: authReducer, 
});

export default rootReducer;
