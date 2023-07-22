import React from 'react';
import TodoItem from './TodoItem';

// Define the interface for the todo object
interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

// Sample TODO data
const todos: Todo[] = [
  { id: 1, text: 'Learn React', completed: false },
  { id: 2, text: 'Build a TODO app', completed: true },
  { id: 3, text: 'Deploy the app', completed: false },
];

const TodoList: React.FC = () => {
  return (
    <div className="p-4">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  );
};

export default TodoList;
