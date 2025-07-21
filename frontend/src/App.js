import './index.css';
import 'react-datepicker/dist/react-datepicker.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import NotesState from './context/Notes/NotesState';
import { useRef,useEffect } from 'react';
import Login from './components/Login';
import Register from './components/Register';
import ForgetPassword from './components/ForgetPassword';
import Alert from './components/Alert';
import { useState } from 'react';
import ThemeState from './context/Themes/ThemeState';
import ArchiveNotes from './components/ArchiveNotes';
import TrashNotes from './components/TrashNotes';
import Reminders from './components/Reminders'
import Modal from 'react-modal';
import 'react-toastify/dist/ReactToastify.css';
import { useContext } from "react";
import ThemeContext from "./context/Themes/ThemeContext";
import { ToastContainer, toast, Bounce } from "react-toastify";
import NotesContext from "./context/Notes/NotesContext";

function App() {
  const [alert, setAlert] = useState({ message: '', type: '' });
  const clearAlert = () => setAlert({ message: null, type: null });
  
  Modal.setAppElement('#root');

  return (
    <div className="bg-amber-100 dark:bg-neutral-600 min-h-screen">
      <Router>
        <NotesState>
          <ThemeState>
                             <ReminderToastWatcher /> 
            <ToastWithTheme />
            <Navbar setAlert={setAlert} />
            <Alert message={alert.message} type={alert.type} clearAlert={clearAlert} />
            <Routes>
              <Route path="/" element={<Home setAlert={setAlert} />} />
              <Route path="/login" element={<Login setAlert={setAlert} />} />
              <Route path="/register" element={<Register setAlert={setAlert} />} />
              <Route path="/forget-password" element={<ForgetPassword setAlert={setAlert} />} />
              <Route path="/archive-notes" element={<ArchiveNotes setAlert={setAlert} />} />
              <Route path="/reminders" element={<Reminders setAlert={setAlert} />} />
              <Route path="/trash-notes" element={<TrashNotes setAlert={setAlert} />} />
            </Routes>
          </ThemeState>
        </NotesState>
      </Router>

    </div>
  );
}

function ToastWithTheme() {
  const { theme } = useContext(ThemeContext);

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme={theme === "dark" ? "dark" : "light"}
        transition={Bounce}
        style={{ width: "400px" }}
      />

    </>
  );
}


function ReminderToastWatcher() {
  const { fetchReminders} = useContext(NotesContext);
  const shownReminders = useRef(new Set());
  const intervalIdRef = useRef(null);

 useEffect(() => {
   console.log("⏱️ Setting reminder interval");
  let isMounted = true;

  const checkAndNotifyReminders = async () => {
    try {
      const allReminders = await fetchReminders();
      if (!isMounted || !Array.isArray(allReminders)) return;

      const now = new Date();
      const oneMinuteBefore = new Date(now.getTime() - 60 * 1000); // look back 1 minute
      const oneMinuteAfter = new Date(now.getTime() + 60 * 1000); // slight buffer

      // Filter reminders due within the current minute (± buffer)
      const dueReminders = allReminders.filter((reminder) => {
        const reminderTime = new Date(reminder.reminder);
        return (
          reminderTime >= oneMinuteBefore &&
          reminderTime <= oneMinuteAfter &&
          !shownReminders.current.has(reminder._id)
        );
      });

      dueReminders.forEach((reminder) => {
        toast.info(
          `Reminder: ${reminder.title} - ${reminder.description.slice(0, 80)}...`,
          {
            toastId: reminder._id,
            autoClose: 8000,
          }
        );
        shownReminders.current.add(reminder._id);
      });
    } catch (err) {
      console.error("Error fetching reminders:", err);
    }
  };

  checkAndNotifyReminders(); // run immediately

if (intervalIdRef.current) {
  clearInterval(intervalIdRef.current);
}
intervalIdRef.current = setInterval(checkAndNotifyReminders, 60 * 1000);

  return () => {
    isMounted = false;
    if (intervalIdRef.current) clearInterval(intervalIdRef.current);
  };
}, [fetchReminders]);


  return null;
}
export default App;
