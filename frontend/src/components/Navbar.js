import { Link } from 'react-router-dom';
import { useState } from 'react';
import { FiMenu } from 'react-icons/fi';
import Sidebar from './Sidebar';
import { FaRegUserCircle } from "react-icons/fa";

function Navbar(props) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userData, setUserData] = useState({
    name: "",
    email: ""
  });

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
      <nav className="sticky top-0 z-50 bg-white shadow-md shadow-neutral-700 border-b border-neutral-200 dark:bg-neutral-800 dark:border-neutral-900 shadow-sm relative">
        {/* Menu icon absolutely positioned extreme left */}
        <div className="absolute left-0 top-0 h-full flex items-center px-3">
          <button className="" onClick={() => setSidebarOpen(!sidebarOpen)}>
            <FiMenu className="text-2xl text-neutral-700 hover:text-neutral-500 dark:text-white cursor-pointer" />
          </button>
        </div>

        {/* Main container with responsive padding-left to prevent overlap with menu icon */}
        <div className="max-w-screen-xl mx-auto flex items-center justify-between px-4 py-3 pl-12 md:pl-16">
          {/* Logo + App Name */}
          <div className="flex items-center space-x-2">
            <Link to="/" className="flex items-center space-x-2">
              <img src="note.png" className="h-8" alt="Smart Notes Logo" />
              <span className="text-xl font-semibold dark:text-white whitespace-nowrap">Smart Notes</span>
            </Link>
          </div>

          {/* Search Bar Centered */}
          <div className="flex-1 flex justify-center px-4">
            <div className="relative w-full max-w-md hidden md:block">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg className="w-4 h-4 text-neutral-500 dark:text-neutral-400" fill="none" viewBox="0 0 20 20">
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
                className="block w-full pl-10 pr-4 py-2 text-sm rounded-lg border border-neutral-300 bg-neutral-900 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:bg-neutral-700 dark:text-white dark:border-neutral-600"
              />
            </div>
          </div>

          {/* Profile icon */}

          <div className="relative min-w-[50px] flex justify-end">
            {localStorage.getItem('token') ? (
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center text-sm bg-neutral-200 dark:bg-neutral-800 rounded-full focus:ring-2 focus:ring-neutral-300 dark:focus:ring-neutral-600 p-1"
              >
                <FaRegUserCircle
                  onClick={fetchUserData}
                  className="w-8 h-8 rounded-full text-amber-400"
                />
              </button>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  to="/login"
                  className="flex items-center text-sm bg-blue-200 dark:bg-blue-500 px-3 py-1 rounded-lg"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="flex items-center text-sm bg-amber-200 dark:bg-amber-500 px-3 py-1 rounded-lg"
                >
                  Register
                </Link>
              </div>)}

            {dropdownOpen && localStorage.getItem('token') && (
              <div className="absolute right-0 top-12 z-50 mt-2 w-48 bg-white divide-y divide-neutral-100 rounded-lg shadow-lg dark:bg-neutral-700 dark:divide-neutral-600">
                <div className="px-4 py-3">
                  <span className="block text-sm text-neutral-900 dark:text-white">{userData.name}</span>
                  <span className="block text-sm text-neutral-500 truncate dark:text-neutral-400">{userData.email}</span>
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
