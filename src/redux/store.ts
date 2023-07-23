import { combineReducers, configureStore } from '@reduxjs/toolkit';
import todosReducer from './todosSlice';
import authReducer from './authSlice'; 

const rootReducer = combineReducers({
  todos: todosReducer,
  auth: authReducer, 
});

export type RootState = ReturnType<typeof rootReducer>;


const store = configureStore({
  reducer: rootReducer,
});

export default store;
