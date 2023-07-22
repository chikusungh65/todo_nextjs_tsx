import React from 'react';

// Define the interface for the todo object
interface Todo {
  text: string;
  completed: boolean;
}

// Specify the type for the todo prop using the Todo interface
const TodoItem: React.FC<{ todo: Todo }> = ({ todo }) => {
  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-300">
      <div className="flex items-center">
        <input
          type="checkbox"
          className="form-checkbox h-6 w-6 text-blue-500 rounded-md"
          checked={todo.completed}
          onChange={() => {}}
        />
        <span className={`ml-3 ${todo.completed ? 'line-through text-gray-500' : 'text-black'}`}>
          {todo.text}
        </span>
      </div>
      <button className="text-red-500 hover:text-red-700">Delete</button>
    </div>
  );
};

export default TodoItem;
