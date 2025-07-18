import NoteItem from './NoteItem';
import AddNoteItem from './AddNoteItem';
import notesContext from '../context/Notes/NotesContext';
import { useEffect, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Home(props) {
  const navigate = useNavigate();
  const context = useContext(notesContext);
  const { notes, fetchNotes, updateNote, deleteNote } = context;

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

  if (loading) return <div className="text-white mt-10">Loading...</div>;

  return (
    <div className="flex flex-col justify-center items-center my-10">
      <AddNoteItem setAlert={props.setAlert} fetchNotes={fetchNotes} />
      <div className="flex flex-col items-center mt-8">
        <h4 className="text-neutral-300 text-md font-semibold">OTHERS:</h4>
       <div className="columns-1 sm:columns-2 md:columns-3 gap-0.5 transition-all duration-300">
  {Array.isArray(notes) && notes.length === 0 && (
    <p className="text-neutral-400">No notes available</p>
  )}
  {Array.isArray(notes) &&
    notes.map((note) => (
      <div
        key={note._id}
        className="break-inside-avoid rounded-md"
      >
        <NoteItem
          note={note}
          setAlert={props.setAlert}
          fetchNotes={fetchNotes}
          updateNote={updateNote}
          deleteNote={deleteNote}
        />
      </div>
    ))}
</div>

      </div>
    </div>
  );
}

export default Home;
