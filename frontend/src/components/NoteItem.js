import { useState, useEffect, useRef } from "react";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
import { MdSave } from "react-icons/md";
import notesContext from '../context/Notes/NotesContext';
import { useContext } from 'react';
import { MdPushPin } from "react-icons/md";
import { MdOutlineArchive } from "react-icons/md";

export default function NoteItem(props) {

  const { note, updateNote, setAlert, pinNote, archiveNote, unarchiveNote, trashNote,unPinNote } = props;
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(note.title);
  const [editedDescription, setEditedDescription] = useState(note.description);
  const [editedTag, setEditedTag] = useState(note.tag.join(", "));

  let context = useContext(notesContext);
  const { viewNotesMode } = context;

  const textareaRef = useRef(null);
  useEffect(() => {
    if (isEditing && textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [isEditing]);



  const handleEditClick = () => {
    setIsEditing(true);
  };

  const [errors, setErrors] = useState({
    title: "",
    description: "",
  });

  const validate = () => {
    const newErrors = {};

    if (!editedTitle.trim()) {
      newErrors.title = "Title is required.";
    }


    if (!editedDescription.trim()) {
      newErrors.description = "Description is required.";
    } else if (editedDescription.length < 5) {
      newErrors.description = "Description must be at least 5 characters.";
    }



    setErrors(newErrors);

    // Return true if no errors
    return Object.keys(newErrors).length === 0;
  };

  const handlePinClick = async () => {
    await pinNote(note._id);
    setAlert({ message: "Note Pinned!", type: "Success" });
    props.fetchNotes();
  }

  const handleUnPinClick = async () => {
    await unPinNote(note._id);
    setAlert({ message: "Note Unpinned!", type: "Success" });
    props.fetchNotes();
  }

  const handleArchiveClick = async () => {
    await archiveNote(note._id);
    setAlert({ message: "Note Archived!", type: "Success" });
    props.fetchNotes();
  }

    const handleUnArchiveClick = async () => {
    await unarchiveNote(note._id);
    setAlert({ message: "Note Unarchived!", type: "Success" });
    props.fetchNotes();
  }

  const handleTrashClick = async () => {
    await trashNote(note._id);
    setAlert({ message: "Note moved to trash!", type: "Success" });
    props.fetchNotes();
  }
  const handleSaveClick = async () => {

    if (!validate()) {
      return; // Stop submission if validation fails
    }

    const updatedNote = {
      title: editedTitle,
      description: editedDescription,
      tag: editedTag.split(",").map(t => t.trim()),
    };

    await updateNote(note._id, updatedNote);
    setIsEditing(false);
    setAlert({ message: "Note updated!", type: "Success" });
    props.fetchNotes();
  };

  const containerStyle = viewNotesMode === "list"
    ? "max-w-2xl w-full sm:w-auto p-4 sm:p-6 space-y-3 mx-auto"
    : "w-full sm:w-80 p-4 space-y-2";


  return (
    <div className="p-4">
      <div className={`flex flex-col bg-amber-200 dark:bg-neutral-800 rounded-lg shadow-lg ${containerStyle}`}>
        <div>
          <div className="flex items-center justify-between">
            {isEditing ? (
              <>
                <input
                  type="text"
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                  className="text-lg font-semibold text-black dark:text-white mb-2 bg-amber-200 dark:bg-neutral-800 px-2 py-1 rounded w-full focus:outline-none focus:ring-2 focus:ring-amber-500 dark:focus:ring-neutral-800"
                />
                {errors.title && <p className="text-red-600 text-xs mt-1">{errors.title}</p>}
              </>
            ) : (
              <h2 className="text-xl font-semibold text-black dark:text-white mb-2">{note.title}</h2>
            )}
            {note.createdAt && (
              <span className="text-sm text-black dark:text-white my-2 ">
                {new Date(note.createdAt).toLocaleDateString()}
              </span>
            )}
            {
              note.pinned ? (
                <MdPushPin onClick={handleUnPinClick} title="Unpin note" className="text-md hover:text-black dark:text-amber-500 my-2 text-amber-500 dark:hover:text-white cursor-pointer" />
              ) : (
                <MdPushPin onClick={handlePinClick} title="Pin note" className="text-md text-black dark:text-white my-2 hover:text-amber-500 dark:hover:text-amber-500 cursor-pointer" />

              )
            }

          </div>

          {isEditing ? (
            <>
              <textarea
                ref={textareaRef}
                value={editedDescription}
                onChange={(e) => {
                  setEditedDescription(e.target.value);
                  e.target.style.height = 'auto';
                  e.target.style.height = `${e.target.scrollHeight}px`;
                }}
                className="text-sm text-black dark:text-white dark:focus:ring-neutral-800 bg-amber-200 dark:bg-neutral-800 px-2 py-1 rounded w-full resize-none overflow-hidden min-h-[60px] focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              {errors.description && <p className="text-red-600 text-xs mt-1">{errors.description}</p>}
            </>) : (
            <p className="text-base text-black dark:text-white break-words whitespace-pre-wrap">
              {note.description}
            </p>
          )}
        </div>

        <div className="flex justify-end gap-2">
          <div className="mt-2 flex justify-center items-center flex-wrap gap-1">
            {isEditing ? (
              <input
                type="text"
                value={editedTag}
                onChange={(e) => setEditedTag(e.target.value)}
                placeholder="Enter tags, comma-separated"
                className="text-xs text-black dark:text-neutral-400 dark:focus:ring-neutral-800  bg-amber-200 dark:bg-neutral-700 px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            ) : (
              note.tag?.map((tag) => (
                <span key={tag} className="text-xs bg-amber-400 dark:bg-neutral-700 text-black dark:text-neutral-400 px-2 py-1 rounded">
                  {tag}
                </span>
              ))
            )}
          </div>

{note.archived ? (
            <MdOutlineArchive onClick={handleUnArchiveClick} title="unarchive note" className="text-xl mt-2 text-blue-500 dark:text-blue-400 my-2 hover:text-blue-700 dark:hover:text-blue-700 cursor-pointer" />
          ) : (
          <MdOutlineArchive onClick={handleArchiveClick} title="archive note" className="text-xl mt-2 text-black dark:text-blue-400 my-2 hover:text-blue-700 dark:hover:text-blue-700 cursor-pointer" />
          )
}

          {isEditing ? (
            <MdSave
              className="cursor-pointer text-blue-500 text-xl mt-2"
              onClick={handleSaveClick}
            />
          ) : (
            <FaRegEdit
              className="cursor-pointer text-amber-500 text-xl mt-2"
              onClick={handleEditClick}
            />
          )}

          <RiDeleteBinLine
            className="cursor-pointer text-red-500 text-xl mt-2"
            onClick={handleTrashClick}
          />
        </div>
      </div>
    </div>
  );
}
