import { useContext } from 'react';
import notesContext from '../context/Notes/NotesContext';
import NoteItem from './NoteItem'; 
import { MdOutlineArchive } from "react-icons/md";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ArchiveNotes(props) {
      const navigate = useNavigate();

    const context = useContext(notesContext);
    const {
        unarchiveNote,
        fetchArchivedNotes,
        viewNotesMode,
        updateNote,
        archiveNote,
        notes,
        pinNote,
        trashNote,
        unPinNote
    } = context;

      const [loading, setLoading] = useState(true);
    
      useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }
    
    
        const fetchData = async () => {
          try {
            await fetchArchivedNotes();
            setLoading(false);
          } catch (err) {
            console.error("Fetch notes error:", err);
            localStorage.removeItem('token');
            navigate('/login');
          }
        };
    
        fetchData();
        // eslint-disable-next-line
      }, []);
    
    
      if (loading) return <div className="text-white flex justify-center items-center mt-10">Loading...</div>;
    

    return (
        <div className="flex flex-col items-center mt-8 w-full">
            {notes.length > 0 ? (
                <>
                    {viewNotesMode === "list" ? (
                        <div className="flex flex-col items-center gap-4 w-full max-w-4xl mx-auto transition-all duration-300">
                            {notes.map((note) => (
                                <div key={note._id} className="break-inside-avoid rounded-md w-full">
                                    <NoteItem
                                        note={note}
                                        setAlert={props.setAlert}
                                        fetchNotes={fetchArchivedNotes}
                                        updateNote={updateNote}
                                        archiveNote={archiveNote}
                                        unarchiveNote={unarchiveNote}
                                        pinNote={pinNote}
                                        unPinNote={unPinNote}
                                        trashNote={trashNote}
                                    />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="columns-1 sm:columns-2 md:columns-3 gap-0.5 transition-all duration-300 w-full max-w-6xl mb-6">
                            {notes.map((note) => (
                                <div key={note._id} className="break-inside-avoid rounded-md mb-4">
                                    <NoteItem
                                        note={note}
                                        setAlert={props.setAlert}
                                        fetchNotes={fetchArchivedNotes}
                                        updateNote={updateNote}
                                        archiveNote={archiveNote}
                                        unarchiveNote={unarchiveNote}
                                        pinNote={pinNote}
                                        unPinNote={unPinNote}
                                        trashNote={trashNote}
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                </>
            ) : (
                <div className="flex items-center flex-col justify-center h-screen">
                    <MdOutlineArchive className="text-neutral-900 text-6xl mb-4" />
                    <p className="text-neutral-900 text-2xl">No archived notes available!</p>
                </div>
            )}
        </div>
    );
}

export default ArchiveNotes;
