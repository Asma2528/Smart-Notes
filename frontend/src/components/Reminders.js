import { useContext } from 'react';
import notesContext from '../context/Notes/NotesContext';
import NoteItem from './NoteItem';
import { MdOutlineArchive } from "react-icons/md";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Reminders(props) {
  const navigate = useNavigate();

  const context = useContext(notesContext);
  const {
    unarchiveNote,
    fetchReminders,
    viewNotesMode,
    updateNote,
    archiveNote,
    reminders,
    pinNote,
    clearReminder,
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
        await fetchReminders();
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
      <h4 className="text-black dark:text-neutral-300 text-md font-semibold mb-4 text-center">
        REMINDERS:
      </h4>
      {reminders.length > 0 ? (
        <>
          {viewNotesMode === "list" ? (
            <div className="flex flex-col items-center gap-4 w-full max-w-4xl mx-auto transition-all duration-300">
              {reminders.map((note) => (
                <div key={note._id} className="break-inside-avoid rounded-md w-full">
                  <NoteItem
                    note={note}
                    setAlert={props.setAlert}
                    fetchNotes={fetchReminders}
                    updateNote={updateNote}
                    archiveNote={archiveNote}
                    unarchiveNote={unarchiveNote}
                    pinNote={pinNote}
                    unPinNote={unPinNote}
                                        clearReminder={clearReminder}

                    trashNote={trashNote}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="columns-1 sm:columns-2 md:columns-3 gap-0.5 transition-all duration-300 w-full max-w-6xl mb-6">
              {reminders.map((note) => (
                <div key={note._id} className="break-inside-avoid rounded-md mb-4">
                  <NoteItem
                    note={note}
                    setAlert={props.setAlert}
                    fetchNotes={fetchReminders}
                    updateNote={updateNote}
                    archiveNote={archiveNote}
                    unarchiveNote={unarchiveNote}
                    pinNote={pinNote}
                    unPinNote={unPinNote}
                    trashNote={trashNote}
                    clearReminder={clearReminder}
                  />
                </div>
              ))}
            </div>
          )}
        </>
      ) : (
        <div className="flex items-center flex-col justify-center h-screen">
          <MdOutlineArchive className="text-neutral-900 text-6xl mb-4" />
          <p className="text-neutral-900 text-2xl">No reminders available!</p>
        </div>
      )}
    </div>
  );
}

export default Reminders;
