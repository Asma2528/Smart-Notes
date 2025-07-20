import NoteItem from './NoteItem';
import AddNoteItem from './AddNoteItem';
import notesContext from '../context/Notes/NotesContext';
import { useEffect, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Home(props) {
  const navigate = useNavigate();
  let context = useContext(notesContext);
  const { viewNotesMode, notes, fetchNotes, updateNote, archiveNote, pinNote, trashNote, unPinNote } = context;

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }


    const fetchData = async () => {
      try {
        await fetchNotes();
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

  const pinnedNotes = notes.filter(note => note.pinned);
  const otherNotes = notes.filter(note => !note.pinned);

  if (loading) return <div className="text-white flex justify-center items-center mt-10">Loading...</div>;

  return (
    <div className="flex flex-col justify-center items-center my-6 px-4 sm:px-6"> {/* Added horizontal padding for small screens */}
      <AddNoteItem setAlert={props.setAlert} fetchNotes={fetchNotes} />
      <div className="flex flex-col items-center mt-8 w-full">
        {/* Pinned Notes Section */}
        {pinnedNotes.length > 0 && (
          <>
            <h4 className="text-amber-500 dark:text-amber-500 text-md font-semibold mb-4 text-center">
              PINNED:
            </h4>
            {viewNotesMode === "list" ? (
              <div className="flex flex-col items-center gap-4 w-full max-w-4xl mx-auto transition-all duration-300">
                {pinnedNotes.map((note) => (
                  <div key={note._id} className="break-inside-avoid rounded-md w-full">
                    <NoteItem
                      note={note}
                      setAlert={props.setAlert}
                      fetchNotes={fetchNotes}
                      updateNote={updateNote}
                      archiveNote={archiveNote}
                      pinNote={pinNote}
                      unPinNote={unPinNote}
                      trashNote={trashNote}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="columns-1 sm:columns-2 md:columns-3 gap-0.5 transition-all duration-300 w-full max-w-6xl mb-6">
                {pinnedNotes.map((note) => (
                  <div key={note._id} className="break-inside-avoid rounded-md mb-4">
                    <NoteItem
                      note={note}
                      setAlert={props.setAlert}
                      fetchNotes={fetchNotes}
                      updateNote={updateNote}
                      archiveNote={archiveNote}
                      pinNote={pinNote}
                      unPinNote={unPinNote}
                      trashNote={trashNote}
                    />
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* Unpinned Notes Section */}
        <h4 className="text-black dark:text-neutral-300 text-md font-semibold mb-4 text-center">
          OTHERS:
        </h4>
        {viewNotesMode === "list" ? (
          <div className="flex flex-col items-center gap-4 w-full max-w-4xl mx-auto transition-all duration-300">
            {otherNotes.length === 0 && (
              <p className="text-amber-500 dark:text-neutral-400 text-center">No notes available</p>
            )}
            {otherNotes.map((note) => (
              <div key={note._id} className="break-inside-avoid rounded-md w-full">
                <NoteItem
                  note={note}
                  setAlert={props.setAlert}
                  fetchNotes={fetchNotes}
                  updateNote={updateNote}
                  archiveNote={archiveNote}
                  pinNote={pinNote}
                  trashNote={trashNote}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="columns-1 sm:columns-2 md:columns-3 gap-0.5 transition-all duration-300 w-full max-w-6xl">
            {otherNotes.length === 0 && (
              <p className="text-amber-500 dark:text-neutral-400 text-center">No notes available</p>
            )}
            {otherNotes.map((note) => (
              <div key={note._id} className="break-inside-avoid rounded-md mb-4">
                <NoteItem
                  note={note}
                  setAlert={props.setAlert}
                  fetchNotes={fetchNotes}
                  updateNote={updateNote}
                  archiveNote={archiveNote}
                  pinNote={pinNote}
                  trashNote={trashNote}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
