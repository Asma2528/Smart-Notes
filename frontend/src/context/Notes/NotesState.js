import NotesContext from "./NotesContext";
import { useState } from "react";

const NotesState = (props) => {
    const host = "http://localhost:5000";

    const notesInitial = [];

    const [notes,setNotes] = useState(notesInitial);

    const fetchNotes = async () => {
        const response = await fetch(`${host}/api/notes/fetch-all-notes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjg3NzMzMTQzZjllNDY0YmM3ZTg3YzZjIn0sImlhdCI6MTc1MjczODQyMn0.GlHRgCigZEKS3ylA5lFJKjTAODs8r1hgSGLBM0yMDeM'
            }
        });
        const json = await response.json();
        setNotes(json);
      
    }

    const addNote = async ({title,description,tag}) => {
 const response = await fetch(`${host}/api/notes/add-note`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjg3NzMzMTQzZjllNDY0YmM3ZTg3YzZjIn0sImlhdCI6MTc1MjczODQyMn0.GlHRgCigZEKS3ylA5lFJKjTAODs8r1hgSGLBM0yMDeM',
            },
                body: JSON.stringify({ title, description, tag })
        });
        console.log(response);
    }

    const updateNote = (id, {title,description,tag}) => {

    }

    const deleteNote = (id) => {

    }

    return (
        <NotesContext.Provider value={{notes, setNotes, fetchNotes, addNote, updateNote, deleteNote}}>
            {props.children}
        </NotesContext.Provider>
    );
}

export default NotesState;