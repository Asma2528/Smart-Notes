import './index.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import NotesState from './context/Notes/NotesState';
import Login from './components/Login';
import Register from './components/Register';
import ForgetPassword from './components/ForgetPassword';
import Alert from './components/Alert';
import { useState } from 'react';
import ThemeState from './context/Themes/ThemeState';

function App() {
  const [alert, setAlert] = useState({ message: '', type: '' });
  const clearAlert = () => setAlert({ message: null, type: null });
  return (
    <div className="bg-amber-100 dark:bg-neutral-600  min-h-screen">
      <Router>
        <NotesState>
          <ThemeState>
          <Navbar setAlert={setAlert}/>
          <Alert message={alert.message} type={alert.type} clearAlert={clearAlert} />
          <Routes>
            <Route path="/" element={<Home  setAlert={setAlert}/>} />
            <Route path="/login" element={<Login setAlert={setAlert} />} />
            <Route path="/register" element={<Register setAlert={setAlert} />} />
            <Route path="/forget-password" element={<ForgetPassword setAlert={setAlert} />} />
          </Routes>
          </ThemeState>
        </NotesState>
      </Router>
    </div>
  );
}

export default App;
