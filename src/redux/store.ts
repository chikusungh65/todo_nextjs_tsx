import { combineReducers, configureStore } from '@reduxjs/toolkit';
import todosReducer from './todosSlice';
import authReducer from './authSlice'; // Import your authSlice

const rootReducer = combineReducers({
  todos: todosReducer,
  auth: authReducer, // Add your authSlice reducer here
  // Add other slices or reducers here
});

export type RootState = ReturnType<typeof rootReducer>;

const store = configureStore({
  reducer: rootReducer,
});

export default store;
