import { useContext } from 'react';
import notesContext from '../context/Notes/NotesContext';
import TrashItem from './TrashItem';
import { RiDeleteBin6Line } from "react-icons/ri";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function TrashNotes(props) {
    const navigate = useNavigate();

    const context = useContext(notesContext);
    const {
        untrashNote,
        fetchTrashNotes,
        viewNotesMode,
        notes,
        emptyBin,
        deleteNote
    } = context;

    const [loading, setLoading] = useState(true);

          const handleEmptyBin = async () => {
    try {
        setLoading(true);
        await emptyBin();
        await fetchTrashNotes();
    } catch (err) {
        console.error("Fetch notes error:", err);
        localStorage.removeItem('token');
        navigate('/login');
    } finally {
        setLoading(false);
    }
};



    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
            return;
        }

        const fetchData = async () => {
            try {
                await fetchTrashNotes();
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
            <h3 className="text-black">
                Notes in the Recycle Bin are deleted after 7 days.
            </h3>
            <button onClick={handleEmptyBin} className="my-5 px-2 bg-amber-500 hover:bg-amber-600 dark:bg-amber-500 dark:hover:bg-amber-600 dark:text-white font-semibold py-2 rounded-md transition-colors duration-200">
                Empty Bin
            </button>
            {notes.length > 0 ? (
                <>
                    {viewNotesMode === "list" ? (
                        <div className="flex flex-col items-center gap-4 w-full max-w-4xl mx-auto transition-all duration-300">
                            {notes.map((note) => (
                                <div key={note._id} className="break-inside-avoid rounded-md w-full">
                                    <TrashItem
                                        note={note}
                                        setAlert={props.setAlert}
                                        fetchNotes={fetchTrashNotes}
                                        untrashNote={untrashNote}
                                        deleteNote={deleteNote}
                             viewNotesMode={viewNotesMode}
                                    />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="columns-1 sm:columns-2 md:columns-3 gap-0.5 transition-all duration-300 w-full max-w-6xl mb-6">
                            {notes.map((note) => (
                                <div key={note._id} className="break-inside-avoid rounded-md mb-4">
                                    <TrashItem
                                        note={note}
                                        setAlert={props.setAlert}
                                        fetchNotes={fetchTrashNotes}
                                        deleteNote={deleteNote}
                                        untrashNote={untrashNote}
                                        viewNotesMode={viewNotesMode}
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                </>
            ) : (
                <div className="flex items-center flex-col justify-center h-screen">
                    <RiDeleteBin6Line className="text-neutral-900 text-6xl mb-4" />
                    <p className="text-neutral-900 text-2xl">No notes in trash!</p>
                </div>
            )}
        </div>
    );
}

export default TrashNotes;
