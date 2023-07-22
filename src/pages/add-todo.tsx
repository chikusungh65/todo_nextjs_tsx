import { doc } from '@firebase/firestore';
import { setDoc } from 'firebase/firestore';
import type { NextPage } from 'next'
import Head from "next/head";
import { useState } from 'react';
import { firestore } from '../firebase/firebaseApi';
import styles from '../styles/Dashboard.module.css'

const AddTodo:NextPage = () => {

    const [title,setTitle] = useState<string>("");
    const [description,setDescription] = useState<string>("");
    const [error,setError] = useState<string>("");
    const [message,setMessage] = useState<string>("");

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        
        if(!title || !description){
            return setError("All fields are required");
        }
        addTodo();
    }

    const addTodo = async () => {
        const timestamp:string = Date.now().toString();

        const _todo = doc(firestore,`todos/${timestamp}`);  
    
        const todoData = {
            title,
            description,
            done:false
        };
        
        try{
            await setDoc(_todo,todoData);
            
            setMessage("Todo added successfully");
           
            setTitle("");
            setDescription("");
        }catch(error){
    
            setError("An error occurred while adding todo");      
        }
    };

    return (
        <div className={styles.container}>
            <Head>
                <title>Add todo</title>
                <meta name="description" content="Next.js firebase todos app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className={styles.main}>

                <h1 className={styles.title}>
                    Add todo
                </h1>

                <form onSubmit={handleSubmit} className={styles.form}>

                    {
                        error ? (
                            <div className={styles.formGroup}>
                                <p className={styles.error}>{error}</p>
                            </div>
                        ) : null
                    }

                    {
                        message ? (
                            <div className={styles.formGroup}>
                                <p className={styles.success}>
                                    {message}. Proceed to <a href="/dashboard">Home</a>
                                </p>
                            </div>
                        ) : null
                    }

                    <div className={styles.formGroup}>
                        <label>Title</label>
                        <input type="text" 
                        placeholder="Todo title" 
                        onChange={e => setTitle(e.target.value)}
                        value={title}
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label>Description</label>
                        <textarea 
                        placeholder="Todo description"  
                        onChange={e => setDescription(e.target.value)}
                        value={description}
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <button type="submit">Submit</button>
                    </div>

                </form>

            </div>
        </div>
    )
}

export default AddTodo;