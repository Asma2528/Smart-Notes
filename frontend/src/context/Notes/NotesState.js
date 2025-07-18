import NotesContext from "./NotesContext";
import { useState } from "react";

const NotesState = (props) => {
    const host = process.env.REACT_APP_HOST;

    const notesInitial = [];

    const [notes, setNotes] = useState(notesInitial);

    const fetchNotes = async () => {
        const response = await fetch(`${host}/api/notes/fetch-all-notes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token' : localStorage.getItem('token')
            }
        });
        const json = await response.json();
        setNotes(json);

    }

    const addNote = async ({ title, description, tag }) => {
        const response = await fetch(`${host}/api/notes/add-note`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token' : localStorage.getItem('token'),
            },
            body: JSON.stringify({ title, description, tag })
        });
    }

    const updateNote = async (id,  updatedNote) => {
       const response = await fetch(`${host}/api/notes/update-note/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token' : localStorage.getItem('token'),
            },
            body: JSON.stringify(updatedNote)
        });
    }

    const deleteNote = async (id) => {
    const response = await fetch(`${host}/api/notes/delete-note/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token' : localStorage.getItem('token'),
            }
        });
    }

    

    return (
        <NotesContext.Provider value={{ notes, setNotes, fetchNotes, addNote, updateNote, deleteNote }}>
            {props.children}
        </NotesContext.Provider>
    );
}

export default NotesState;