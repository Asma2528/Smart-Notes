import { FaRegStickyNote } from "react-icons/fa";
import { FaUserClock } from "react-icons/fa";
import { MdLabelImportantOutline } from "react-icons/md";
import { MdOutlineArchive } from "react-icons/md";
import { GoTrash } from "react-icons/go";

function Sidebar({ isOpen, onClose }) {
  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-neutral-800 bg-opacity-50 z-40 transition-opacity duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      />

      {/* Sidebar */}
    <aside
  className={`fixed top-0 left-0 h-full w-36 bg-white dark:bg-neutral-900 shadow-lg z-50 transform transition-transform duration-300 ${
    isOpen ? "translate-x-0" : "-translate-x-full"
  }`}
>
  <div className="p-2 pt-20 overflow-y-auto h-full">
    <ul className="text-gray-800 dark:text-white space-y-2">
      <li>
        <a
          href="/"
          className="flex items-center gap-3 px-3 py-2 rounded-2xl hover:bg-orange-200 dark:hover:bg-amber-300"
        >
          <FaRegStickyNote />
          Notes
        </a>
      </li>
      <li>
        <a
          href="/"
          className="flex items-center gap-3 px-3 py-2 rounded-2xl hover:bg-amber-200 dark:hover:bg-amber-300"
        >
          <FaUserClock />
          Reminders
        </a>
      </li>
      <li>
        <a
          href="/"
          className="flex items-center gap-3 px-3 py-2 rounded-2xl hover:bg-amber-200 dark:hover:bg-amber-300"
        >
          <MdLabelImportantOutline />
          Labels
        </a>
      </li>
      <li>
        <a
          href="/"
          className="flex items-center gap-3 px-3 py-2 rounded-2xl hover:bg-amber-200 dark:hover:bg-amber-300"
        >
          <MdOutlineArchive />
          Archive
        </a>
      </li>
      <li>
        <a
          href="/"
          className="flex items-center gap-3 px-3 py-2 rounded-2xl hover:bg-amber-200 dark:hover:bg-amber-300"
        >
          <GoTrash />
          Trash
        </a>
      </li>
    </ul>
  </div>
</aside>

    </>
  );
}

export default Sidebar;
