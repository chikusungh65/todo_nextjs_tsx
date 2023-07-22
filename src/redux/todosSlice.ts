import { createSlice, PayloadAction } from '@reduxjs/toolkit';


interface Todo {
  id: number;
  text: string;
  completed: boolean;
}


const initialState: Todo[] = [
  { id: 1, text: 'Learn React', completed: false },
  { id: 2, text: 'Build a TODO app', completed: true },
];


const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<Todo>) => {
      state.push(action.payload);
    },
    updateTodo: (state, action: PayloadAction<Todo>) => {
      const { id, text, completed } = action.payload;
      const todoToUpdate = state.find((todo) => todo.id === id);
      if (todoToUpdate) {
        todoToUpdate.text = text;
        todoToUpdate.completed = completed;
      }
    },
    deleteTodo: (state, action: PayloadAction<number>) => {
      return state.filter((todo) => todo.id !== action.payload);
    },
  },
});


export const { addTodo, updateTodo, deleteTodo } = todosSlice.actions;


export default todosSlice.reducer;
