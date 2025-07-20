import { MdRestoreFromTrash } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";

export default function TrashItem(props) {
  const {
    untrashNote,
    viewNotesMode,
    note,
    deleteNote,
    setAlert,
    fetchNotes,
  } = props;

  const handleUnTrashClick = async () => {
    await untrashNote(note._id);
    setAlert({ message: "Note restored!", type: "Success" });
    fetchNotes();
  };

  const handleDeleteClick = async () => {
    await deleteNote(note._id);
    setAlert({ message: "Note deleted!", type: "Success" });
    fetchNotes();
  };

  const containerStyle =
    viewNotesMode === "list"
      ? "max-w-2xl w-full sm:w-auto p-4 sm:p-6 space-y-3 mx-auto"
      : "w-full sm:w-80 p-4 space-y-2";

  return (
    <div className="p-4">
      <div
        className={`flex flex-col bg-amber-200 dark:bg-neutral-800 rounded-lg shadow-lg ${containerStyle}`}
      >
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xl font-semibold text-black dark:text-white">
            {note.title}
          </h2>
          {note.createdAt && (
            <span className="text-sm text-black dark:text-white">
              {new Date(note.createdAt).toLocaleDateString()}
            </span>
          )}
        </div>

        <p className="text-base text-black dark:text-white break-words whitespace-pre-wrap mb-2">
          {note.description}
        </p>

        <div className="mt-2 flex flex-wrap gap-1">
          {note.tag?.map((tag) => (
            <span
              key={tag}
              className="text-xs bg-amber-400 dark:bg-neutral-700 text-black dark:text-neutral-400 px-2 py-1 rounded"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex justify-end gap-2 mt-3">
          <MdDeleteOutline
            className="cursor-pointer text-amber-500 text-xl"
            onClick={handleDeleteClick}
          />
          <MdRestoreFromTrash
            className="cursor-pointer text-red-500 text-xl"
            onClick={handleUnTrashClick}
          />
        </div>
      </div>
    </div>
  );
}
