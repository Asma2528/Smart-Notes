import { useState, useEffect, useRef } from "react";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
import { MdSave } from "react-icons/md";
import notesContext from '../context/Notes/NotesContext';
import { useContext } from 'react';
import { MdPushPin } from "react-icons/md";
import { MdOutlineArchive } from "react-icons/md";
import { BiBellPlus } from "react-icons/bi";
import DatePicker from "react-datepicker";
import Modal from 'react-modal';

export default function NoteItem(props) {

  const { note, updateNote, setAlert, pinNote, archiveNote, clearReminder, reminderNote, unarchiveNote, trashNote, unPinNote } = props;
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(note.title);
  const [editedDescription, setEditedDescription] = useState(note.description);
  const [editedTag, setEditedTag] = useState(note.tag.join(", "));
  const [showReminderDialog, setShowReminderDialog] = useState(false);
  const [reminderDate, setReminderDate] = useState(new Date());


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
    try {
      await pinNote(note._id);
      setAlert({ message: "Note Pinned!", type: "Success" });
      props.fetchNotes();
    } catch (error) {
      console.error(error);
      setAlert({ message: "Failed to pin note", type: "Error" });
    }
  };

  const handleUnPinClick = async () => {
    try {
      await unPinNote(note._id);
      setAlert({ message: "Note Unpinned!", type: "Success" });
      props.fetchNotes();
    } catch (error) {
      console.error(error);
      setAlert({ message: "Failed to unpin note", type: "Error" });
    }
  };

  const handleArchiveClick = async () => {
    try {
      await archiveNote(note._id);
      setAlert({ message: "Note Archived!", type: "Success" });
      props.fetchNotes();
    } catch (error) {
      console.error(error);
      setAlert({ message: "Failed to archive note", type: "Error" });
    }
  };

  const handleUnArchiveClick = async () => {
    try {
      await unarchiveNote(note._id);
      setAlert({ message: "Note Unarchived!", type: "Success" });
      props.fetchNotes();
    } catch (error) {
      console.error(error);
      setAlert({ message: "Failed to unarchive note", type: "Error" });
    }
  };

  const handleTrashClick = async () => {
    try {
      await trashNote(note._id);
      setAlert({ message: "Note moved to trash!", type: "Success" });
      props.fetchNotes();
    } catch (error) {
      console.error(error);
      setAlert({ message: "Failed to trash note", type: "Error" });
    }
  };


  const handleSaveClick = async () => {
    if (!validate()) return;
    const updatedNote = {
      title: editedTitle,
      description: editedDescription,
      tag: editedTag.split(",").map(t => t.trim()),
    };
    try {
      await updateNote(note._id, updatedNote);
      setIsEditing(false);
      setAlert({ message: "Note updated!", type: "Success" });
      props.fetchNotes();
    } catch (error) {
      console.error(error);
      setAlert({ message: "Failed to update note", type: "Error" });
    }
  };

  const handleSetReminder = async () => {
    try {
      await reminderNote(note._id, reminderDate);
      setAlert({ message: "Reminder set successfully!", type: "Success" });
      props.fetchNotes();
      setShowReminderDialog(false);
    } catch (error) {
      console.error(error);
      setAlert({ message: "Failed to set reminder", type: "Error" });
    }
  };

  const handleClearReminder = async () => {
    const confirmClear = window.confirm("Are you sure you want to clear this reminder?");
    if (!confirmClear) return;

    try {
      await clearReminder(note._id);
      setAlert({ message: "Reminder Cleared!", type: "Success" });
      props.fetchNotes();
    } catch (error) {
      console.error(error);
      setAlert({ message: "Failed to clear reminder", type: "Error" });
    }
  };


  const isReminderPassed = note.reminder && new Date(note.reminder) < new Date();

  const getReminderLabel = (reminderDate) => {
    const now = new Date();
    const date = new Date(reminderDate);

    const isToday = date.toDateString() === now.toDateString();
    const isYesterday = date.toDateString() === new Date(now.setDate(now.getDate() - 1)).toDateString();

    if (isYesterday) {
      return `Sent Yesterday at ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    } else if (isToday) {
      return `Sent Today at ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    } else {
      return `Sent on ${date.toLocaleDateString()} at ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    }
  };


  const handleReminderClick = () => {
    setShowReminderDialog(true);
  }


  const now = new Date();

  const isToday = (date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };
  const containerStyle = viewNotesMode === "list"
    ? "max-w-2xl w-full sm:w-auto p-4 sm:p-6 space-y-3 mx-auto"
    : "w-full sm:w-80 p-4 space-y-2";


  return (
    <div className="p-4">
      <Modal
        isOpen={showReminderDialog}
        onRequestClose={() => setShowReminderDialog(false)}
        contentLabel="Set Reminder"
        className="p-6 bg-white dark:bg-neutral-800 rounded shadow-md w-[90%] sm:w-[400px] mx-auto mt-[20vh]"
        overlayClassName="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
      >
        <h2 className="text-lg font-semibold text-black dark:text-white mb-4">Set Reminder</h2>

        <DatePicker
          selected={reminderDate}
          onChange={(date) => setReminderDate(date)}
          showTimeSelect
          minDate={now}
          minTime={isToday(reminderDate || now) ? now : new Date().setHours(0, 0, 0)} // disables past times if today
          maxTime={new Date().setHours(23, 59)} // allows up to 11:59 PM
          dateFormat="Pp"
          className="w-full px-3 py-2 border text-black dark:border-neutral-700 rounded focus:outline-none dark:bg-neutral-900 dark:text-white"
          calendarClassName="custom-datepicker"
        />


        <div className="flex justify-end mt-4 gap-2">
          <button
            onClick={() => setShowReminderDialog(false)}
            className="bg-gray-300 hover:bg-gray-400 dark:bg-neutral-600 dark:hover:bg-neutral-500 px-4 py-2 rounded text-black dark:text-white"
          >
            Cancel
          </button>
          <button
            onClick={handleSetReminder}
            className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded"
          >
            Set Reminder
          </button>
        </div>
      </Modal>

      <div className={`flex flex-col bg-amber-200 dark:bg-neutral-800 rounded-lg shadow-lg ${containerStyle}`}>
        <div>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
            <div className="flex-1 min-w-0">
              {isEditing ? (
                <>
                  <input
                    type="text"
                    value={editedTitle}
                    onChange={(e) => setEditedTitle(e.target.value)}
                    className="text-lg font-semibold text-black dark:text-white mb-1 bg-amber-200 dark:bg-neutral-800 px-2 py-1 rounded w-full focus:outline-none focus:ring-2 focus:ring-amber-500 dark:focus:ring-neutral-800"
                  />
                  {errors.title && <p className="text-red-600 text-xs mt-1">{errors.title}</p>}
                </>
              ) : (
                <h2 className="text-xl font-semibold break-words text-black dark:text-white mb-1">
                  {note.title}
                </h2>
              )}
              {note.createdAt && (
                <span className="text-sm text-black dark:text-white">
                  {new Date(note.createdAt).toLocaleDateString()}
                </span>
              )}
            </div>
            <div className="shrink-0 flex justify-end">
              {note.pinned ? (
                <MdPushPin
                  onClick={handleUnPinClick}
                  title="Unpin note"
                  className="text-lg hover:text-black dark:text-amber-500 text-amber-500 dark:hover:text-white cursor-pointer"
                />
              ) : (
                <MdPushPin
                  onClick={handlePinClick}
                  title="Pin note"
                  className="text-lg text-black dark:text-white hover:text-amber-500 dark:hover:text-amber-500 cursor-pointer"
                />
              )}
            </div>
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


        {note.reminder && (
          <div
            className={`text-xs mt-2 italic ${isReminderPassed
                ? "text-gray-600 dark:text-neutral-400"
                : "text-amber-600 dark:text-amber-400"
              }`}
          >
            {isReminderPassed ? getReminderLabel(note.reminder) : `Reminder set for ${new Date(note.reminder).toLocaleString()}`}
          </div>
        )}


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

          <BiBellPlus
            onClick={note.reminder ? handleClearReminder : handleReminderClick}
            title={note.reminder ? `Reminder already set: ${new Date(note.reminder).toLocaleString()} Do you want to clear Reminder?` : "Remind Me"}
            className="text-black mt-2 text-xl hover:text-neutral-800 dark:text-neutral-100 dark:hover:text-neutral-300 cursor-pointer"
          />

          {note.archived ? (
            <MdOutlineArchive onClick={handleUnArchiveClick} title="Unarchive note" className="text-xl mt-2 text-blue-400 dark:text-blue-400 my-2 hover:text-blue-500 dark:hover:text-blue-500 cursor-pointer" />
          ) : (
            <MdOutlineArchive onClick={handleArchiveClick} title="Archive note" className="text-xl mt-2 text-blue-400 dark:text-blue-400 my-2 hover:text-blue-500 dark:hover:text-blue-500 cursor-pointer" />
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
