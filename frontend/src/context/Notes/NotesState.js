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

      const fetchArchivedNotes = async () => {
        const response = await fetch(`${host}/api/notes/fetch-archived-notes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
        });
        const json = await response.json();
        setNotes(json);
    };


      const fetchTrashNotes = async () => {
        const response = await fetch(`${host}/api/notes/fetch-trash-notes`, {
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

     const pinNote = async (id) => {
        await fetch(`${host}/api/notes/pin-note/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token'),
            },
        });
    };

         const unPinNote = async (id) => {
        await fetch(`${host}/api/notes/unpin-note/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token'),
            },
        });
    };


     const archiveNote = async (id) => {
        await fetch(`${host}/api/notes/archive-note/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token'),
            },
        });
    };

     const unarchiveNote = async (id) => {
        await fetch(`${host}/api/notes/unarchive-note/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token'),
            },
        });
    };

      const trashNote = async (id) => {
        await fetch(`${host}/api/notes/trash-note/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token'),
            },
        });
    };

      const untrashNote = async (id) => {
        await fetch(`${host}/api/notes/untrash-note/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token'),
            },
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

     const emptyBin = async (id) => {
        await fetch(`${host}/api/notes/empty-bin`, {
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
            deleteNote,
            pinNote,
            archiveNote,
            unarchiveNote,
            fetchArchivedNotes,
            fetchTrashNotes,
            trashNote,
            unPinNote,
            untrashNote,
            emptyBin
        }}>
            {props.children}
        </NotesContext.Provider>
    );
};

export default NotesState;
