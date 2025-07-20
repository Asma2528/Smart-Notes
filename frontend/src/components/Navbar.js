import { Link } from 'react-router-dom';
import { useState } from 'react';
import { FiMenu } from 'react-icons/fi';
import Sidebar from './Sidebar';
import { FaRegUserCircle } from "react-icons/fa";
import { CiGrid2H } from "react-icons/ci";
import { IoGridOutline } from "react-icons/io5";
import notesContext from '../context/Notes/NotesContext';
import { useContext } from 'react';
import { IoRefresh } from "react-icons/io5";
import { FaLightbulb } from "react-icons/fa";
import { FaRegLightbulb } from "react-icons/fa";
import ThemeContext from '../context/Themes/ThemeContext';


function Navbar(props) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userData, setUserData] = useState({
    name: "",
    email: ""
  });

  const handleRefresh = () => {
    window.location.reload(true);
  };

  let context = useContext(notesContext);
  const { setViewMode } = context;

  let context2 = useContext(ThemeContext);
  const { theme, toggleTheme } = context2;

  const [viewIconMode, setViewIconMode] = useState("list");

  const toggleViewMode = () => {
    const newView = viewIconMode === "list" ? "grid" : "list";
    setViewIconMode(newView);
    const newView1 = viewIconMode === "list" ? "list" : "grid";
    setViewMode(newView1);
  };




  const fetchUserData = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_HOST}/api/auth/get-user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        }
      });
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      const userData = await response.json();
      console.log(userData);

      if (!userData.success) {
        throw new Error("Failed to fetch user data");
      }

      setUserData({ name: userData.user.name, email: userData.user.email });
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleLogout = () => {
    setDropdownOpen(false);
    localStorage.removeItem('token');
    window.location.href = '/login';
    props.setAlert({ message: "User Log out!", type: "Success" });
  };


  return (
    <>
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <nav className="sticky top-0 z-50 bg-white shadow-md shadow-amber-600 dark:shadow-neutral-700 border-b dark:border-neutral-200 dark:bg-neutral-800 dark:border-neutral-900 shadow-sm relative">
        {/* Menu icon absolutely positioned extreme left */}
        <div className="absolute left-0 top-0 h-full flex items-center px-3">
          <button className="" onClick={() => setSidebarOpen(!sidebarOpen)}>
            <FiMenu className="text-2xl text-amber-500 dark:text-neutral-400 hover:text-amber-700 dark:hover:text-neutral-500 dark:text-white cursor-pointer" />
          </button>
        </div>

        {/* Main container with responsive padding-left to prevent overlap with menu icon */}
        <div className="max-w-screen-xl mx-auto flex items-center justify-between px-4 py-3 pl-12 md:pl-16">
          {/* Logo + App Name */}
          <div className="flex items-center space-x-2">
            <Link to="/" className="flex items-center space-x-2">
              <img src="note.png" className="h-8" alt="Smart Notes Logo" />
              <span className="text-xl font-semibold text-amber-500 dark:text-white whitespace-nowrap">Smart Notes</span>
            </Link>
          </div>

          {/* Search Bar Centered */}
          <div className="flex-1 flex justify-center px-4">
            <div className="relative w-full max-w-md hidden md:block">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg className="w-4 h-4 text-amber-500 dark:text-neutral-400" fill="none" viewBox="0 0 20 20">
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search..."
                className="block w-full pl-10 pr-4 py-2 text-sm rounded-lg border border-amber-300 dark:border-neutral-300 bg-amber-100 dark:bg-neutral-900 text-black dark:text-neutral-900 focus:outline-none focus:ring-2 focus:ring-amber-500 dark:focus:ring-cyan-500 dark:bg-neutral-700 dark:text-white dark:border-neutral-600"
              />
            </div>
          </div>
          {theme === 'dark' ? (
            <FaRegLightbulb className="w-6 h-6 text-amber-400 cursor-pointer" onClick={toggleTheme} />
          ) : (
            <FaLightbulb className="w-6 h-6 text-amber-400 cursor-pointer" onClick={toggleTheme} />

          )}

          {/* Profile icon */}

          <div className="relative min-w-[50px] flex justify-end">
            <div className="hidden sm:flex items-center">
              <IoRefresh onClick={handleRefresh} className="mt-1 w-7 h-7 mx-2 text-amber-400 cursor-pointer" />
            </div>
            {localStorage.getItem('token') ? (
              <div className="flex items-center space-x-2">
                <div className="hidden sm:flex items-center">
                  <button
                    onClick={toggleViewMode}
                    className="flex items-center text-sm dark:bg-neutral-800 rounded-full focus:ring-2 focus:ring-neutral-300 dark:focus:ring-neutral-600 p-1"
                  >
                    {viewIconMode === "list" ? (
                      <CiGrid2H title="List View" className="w-8 h-8 text-amber-400 cursor-pointer" />
                    ) : (
                      <IoGridOutline title="Grid View" className="w-7 h-7 text-amber-400 cursor-pointer" />
                    )}
                  </button>
                </div>



                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center text-sm dark:bg-neutral-800 rounded-full focus:ring-2 focus:ring-neutral-300 dark:focus:ring-neutral-600 p-1"
                >
                  <FaRegUserCircle
                    onClick={fetchUserData}
                    className="w-8 h-8 rounded-full text-amber-400"
                  />
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  to="/login"
                  className="flex items-center hover:bg-cyan-600 dark:hover:bg-cyan-600 text-sm bg-blue-500 dark:bg-blue-500 px-3 py-1 rounded-lg"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="flex items-center text-sm bg-amber-500 hover:bg-amber-600  dark:hover:bg-amber-600 dark:bg-amber-500 px-3 py-1 rounded-lg"
                >
                  Register
                </Link>
              </div>)}

            {dropdownOpen && localStorage.getItem('token') && (
              <div className="absolute right-0 top-12 z-50 mt-2 w-48 bg-white text-amber-500 divide-y divide-neutral-100 rounded-lg shadow-lg dark:bg-neutral-700 dark:divide-neutral-600">
                <div className="px-4 py-3 border-b-2 border-amber-400 dark:border-neutral-700">
                  <span className="block text-sm  text-amber-500  dark:text-white">{userData.name}</span>
                  <span className="block text-sm text-amber-500   truncate dark:text-neutral-400">{userData.email}</span>
                </div>

                <div className="py-2">
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-neutral-100 dark:hover:bg-neutral-600 dark:hover:text-red-400"
                  >
                    Sign out
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
