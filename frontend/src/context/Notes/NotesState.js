import NotesContext from "./NotesContext";
import { useState, useEffect } from "react";

const NotesState = (props) => {
    const host = process.env.REACT_APP_HOST;
    const notesInitial = [];

    const [notes, setNotes] = useState(notesInitial);
    const [viewNotesMode, setViewNotesMode] = useState("grid");

    // Detect mobile view and set to list mode
    useEffect(() => {
        if (window.innerWidth < 640) {
            setViewNotesMode("list");
        }
    }, []);

    const setViewMode = (mode) => {
        // Prevent changing to grid mode on mobile
        if (window.innerWidth < 640 && mode === "grid") return;
        setViewNotesMode(mode);
    };

    const fetchNotes = async () => {
        const response = await fetch(`${host}/api/notes/fetch-all-notes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
        });
        const json = await response.json();
        setNotes(json);
    };

    const addNote = async ({ title, description, tag }) => {
        await fetch(`${host}/api/notes/add-note`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token'),
            },
            body: JSON.stringify({ title, description, tag })
        });
    };

    const updateNote = async (id, updatedNote) => {
        await fetch(`${host}/api/notes/update-note/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token'),
            },
            body: JSON.stringify(updatedNote)
        });
    };

    const deleteNote = async (id) => {
        await fetch(`${host}/api/notes/delete-note/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token'),
            }
        });
    };

    return (
        <NotesContext.Provider value={{ 
            notes, 
            viewNotesMode, 
            setViewMode, 
            setNotes, 
            fetchNotes, 
            addNote, 
            updateNote, 
            deleteNote 
        }}>
            {props.children}
        </NotesContext.Provider>
    );
};

export default NotesState;
