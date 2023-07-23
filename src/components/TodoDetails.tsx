import type { NextPage } from 'next';
import { firestore } from '../firebase/firebaseApi';
import {
  collection,
  deleteDoc,
  doc,
  DocumentData,
  getDocs,
  limit,
  query,
  QueryDocumentSnapshot,
  updateDoc,
  where,
} from '@firebase/firestore';
import { useEffect, useState } from 'react';
import PrivateRoute from '@/utils/privateRoute';

const TodoDetails: NextPage = () => {
  const [todos, setTodos] = useState<QueryDocumentSnapshot<DocumentData>[]>([]);
  const [editTodo, setEditTodo] = useState<QueryDocumentSnapshot<DocumentData> | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editTitle, setEditTitle] = useState<string>('');
  const [editDescription, setEditDescription] = useState<string>('');

  useEffect(() => {
    getTodos();
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  const todosCollection = collection(firestore, 'todos');

  const getTodos = async () => {
    const todosQuery = query(todosCollection, where('done', '==', false), limit(10));
    const querySnapshot = await getDocs(todosQuery);
    const result: QueryDocumentSnapshot<DocumentData>[] = [];
    querySnapshot.forEach((snapshot) => {
      result.push(snapshot);
    });
    setTodos(result);
  };

  const updateTodo = async (documentId: string) => {
    const _todo = doc(firestore, `todos/${documentId}`);

    await updateDoc(_todo, {
      title: editTitle,
      description: editDescription,
      done: false,
    });

    setEditTitle('');
    setEditDescription('');
    setIsEditing(false);
    getTodos();
  };

  const deleteTodo = async (documentId: string) => {
    const _todo = doc(firestore, `todos/${documentId}`);

    await deleteDoc(_todo);

    getTodos();
  };

  return (
    <PrivateRoute>
       

            <div className="mt-8 space-y-6">
              {loading ? (
                <div className="rounded-lg p-6 bg-white shadow-md">
                  <h2>Loading</h2>
                </div>
              ) : todos.length === 0 ? (
                <div className="rounded-lg p-6 bg-white shadow-md">
                  <h2>No undone todos</h2>
                  <p>
                    Consider adding a todo.
                  </p>
                </div>
              ) : (
                <div className=''>
                  {todos.map((todo, index) => (
                    <div
                      key={index}
                      className="rounded-lg p-6 m-10 bg-white shadow-md relative"
                    >
                      {isEditing && editTodo?.id === todo.id ? (
                        <div className="space-y-4">
                          <input
                            type="text"
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                            className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          />
                          <textarea
                            value={editDescription}
                            onChange={(e) => setEditDescription(e.target.value)}
                            className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          />
                          <div className="space-x-2">
                            <button
                              type="button"
                              onClick={() => updateTodo(todo.id)}
                              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                              Save
                            </button>
                            <button
                              type="button"
                              onClick={() => setIsEditing(false)}
                              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-500 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        < >
                          <h2 className="text-xl font-bold mb-2">
                            {todo.data().title}
                          </h2>
                          <p className="text-gray-500 mb-4">
                            {todo.data().description}
                          </p>
                          <div className="space-x-2 absolute top-4 right-4">
                            <button
                              type="button"
                              onClick={() => {
                                setEditTodo(todo);
                                setEditTitle(todo.data().title);
                                setEditDescription(todo.data().description);
                                setIsEditing(true);
                              }}
                              className="inline-flex items-center px-3 py-1 border border-transparent rounded-md shadow-sm text-sm font-medium text-indigo-600 hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                              Edit
                            </button>
                            <button
                              type="button"
                              onClick={() => updateTodo(todo.id)}
                              className="inline-flex items-center px-3 py-1 border border-transparent rounded-md shadow-sm text-sm font-medium text-green-600 hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                            >
                              Mark as done
                            </button>
                            <button
                              type="button"
                              onClick={() => deleteTodo(todo.id)}
                              className="inline-flex items-center px-3 py-1 border border-transparent rounded-md shadow-sm text-sm font-medium text-red-600 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                            >
                              Delete
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
        
    </PrivateRoute>
  );
};

export default TodoDetails;
