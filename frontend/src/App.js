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

function App() {
  const [alert, setAlert] = useState({ message: '', type: '' });

  return (
    <div className="bg-neutral-600  min-h-screen">
      <Router>
        <NotesState>
          <Navbar setAlert={setAlert}/>
          <Alert message={alert.message} type={alert.type} />
          <Routes>
            <Route path="/" element={<Home  setAlert={setAlert}/>} />
            <Route path="/login" element={<Login setAlert={setAlert} />} />
            <Route path="/register" element={<Register setAlert={setAlert} />} />
            <Route path="/forget-password" element={<ForgetPassword setAlert={setAlert} />} />
          </Routes>
        </NotesState>
      </Router>
    </div>
  );
}

export default App;
