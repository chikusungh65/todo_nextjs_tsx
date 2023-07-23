import { doc } from '@firebase/firestore';
import { setDoc } from 'firebase/firestore';
import type { NextPage } from 'next';
import Head from "next/head";
import { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from 'next/router';
import { firestore } from '../firebase/firebaseApi';
import TodoDetails from '@/components/TodoDetails';
import { addTodos } from "@/redux/todosSlice";
import { RootState } from "@/redux/store";
import { logout } from "@/redux/authSlice";
import { auth } from "../firebase/firebaseApi";

const Dashboard: NextPage = () => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const dispatch = useDispatch();
  const router = useRouter();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (!title || !description) {
      return setError("All fields are required");
    }

    try {
      const newTodo = {
        id: Date.now().toString(),
        title,
        description,
        done: false,
      };

      dispatch(addTodos(newTodo));
      await addTodo(); 
    } catch (error) {
      setError("An error occurred while adding todo");
    }
  };

  const addTodo = async () => {
    const timestamp: string = Date.now().toString();

    const _todo = doc(firestore, `todos/${timestamp}`);

    const todoData = {
      title,
      description,
      done: false
    };

    try {
      await setDoc(_todo, todoData);

      setMessage("Todo added successfully");

      setTitle("");
      setDescription("");
    } catch (error) {

      setError("An error occurred while adding todo");
    }
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      
      dispatch(logout());

      router.push('/');
    } catch (error) {
      console.error("Failed to logout:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto mb-10 py-10">
      <Head>
        <title>Add todo</title>
        <meta name="description" content="Next.js firebase todos app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="max-w-md mx-auto mb-10 py-10">
        <h1 className="text-3xl font-bold text-center">Add todo</h1>
        <form onSubmit={handleSubmit} className="mt-6 bg-white p-6 rounded-md shadow-md">
          {error ? (
            <div className="mb-4 text-red-500">
              <p>{error}</p>
            </div>
          ) : null}
          {message ? (
            <div className="mb-4 text-green-500">
              <p>
                {message}
              </p>
            </div>
          ) : null}
          <div className="mb-4">
            <label className="block text-sm font-medium">Title</label>
            <input
              type="text"
              placeholder="Todo title"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Description</label>
            <textarea
              placeholder="Todo description"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div className="mb-4">
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            >
              Submit
            </button>
          </div>
          <div className="mt-4">
        {isAuthenticated ? (
          <button
            className="w-50 mt-2 ml-30 py-2 px-4 bg-black text-white rounded-lg hover:bg-red-700"
            onClick={handleLogout}
          >
            Logout
          </button>
        ) : null}
      </div>
        </form>
        <div className="mt-10">
        <h1 className="text-3xl font-bold text-center mb-4">Todo List</h1>
        <TodoDetails />
      </div>
      </div>
    </div>
  )
}

export default Dashboard;
