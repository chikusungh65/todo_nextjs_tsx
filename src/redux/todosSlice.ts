import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Todo {
  id: string;
  title: string;
  description: string;
  done: boolean;
}

interface TodoState {
  todos: Todo[];
  loading: boolean;
}

const initialState: TodoState = {
  todos: [],
  loading: true,
};

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    setTodo: (state, action: PayloadAction<Todo[]>) => {
      state.todos = action.payload;
      state.loading = false;
    },
    addTodos: (state, action: PayloadAction<Todo>) => {
      state.todos.push(action.payload);
    },
    updateTodos: (state, action: PayloadAction<Todo>) => {
      const { id, title, description, done } = action.payload;
      const todoIndex = state.todos.findIndex((todo) => todo.id === id);
      if (todoIndex !== -1) {
        state.todos[todoIndex] = { ...state.todos[todoIndex], title, description, done };
      }
    },
    deleteTodos: (state, action: PayloadAction<string>) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
  },
});

export const { setTodo, addTodos, updateTodos, deleteTodos } = todoSlice.actions;

export default todoSlice.reducer;
