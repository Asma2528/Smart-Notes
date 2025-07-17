import './index.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import NotesState from './context/Notes/NotesState';
import Login from './components/Login';
import Register from './components/Register';
import ForgetPassword from './components/ForgetPassword';

function App() {
  return (
    <div className="bg-neutral-600  min-h-screen">
      <Router>
        <NotesState>
          <Navbar />
            <Routes>
              <Route exact path="/" element={<Home />} />
               <Route exact path="/login" element={<Login/>} />
                <Route exact path="/register" element={<Register />} />
                  <Route exact path="/forget-password" element={<ForgetPassword />} />
            </Routes>
        </NotesState>
      </Router>
    </div>
  );
}

export default App;
