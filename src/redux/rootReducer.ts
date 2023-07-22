// rootReducer.ts
import { combineReducers } from '@reduxjs/toolkit';
import todosReducer from './todosSlice'; // Import your todosSlice or other reducers here

const rootReducer = combineReducers({
  todos: todosReducer, // Add your todosSlice or other reducers here
  // Add other slices or reducers here
});

export default rootReducer;
