import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '@/types/UserType';

interface AuthState {
  isAuthenticated: boolean;
  user: User | null; // Assuming you have a 'User' type for the authenticated user
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Reducer functions for handling authentication state
  },
});

export const { /* action creators */ } = authSlice.actions;

export default authSlice.reducer;
