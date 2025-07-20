import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";


function Register(props) {

  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: ""
  });


const navigate = useNavigate();

  const onChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.REACT_APP_HOST}/api/auth/create-user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: credentials.name,
          email: credentials.email,
          password: credentials.password
        })
      });
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const json = await response.json();
      if (json.success) {
        localStorage.setItem('token', json.authToken);
        navigate("/");
        props.setAlert({ message: "Registration successful!", type: "Success" });
      } 
      else{
              props.setAlert({ message: json.message || "Registration failed", type: "Error" });

      }
    } catch (error) {
      props.setAlert({ message: "Something went wrong!", type: "Error" });
      console.error(error.message);
    }
  }



    return (
      <div className="min-h-[calc(100vh-64px)] flex flex-col md:flex-row items-center justify-center px-4 py-6">

        {/* Left Side - Info */}
        <div className="md:w-1/2 w-full flex flex-col items-center justify-center text-center md:items-start md:text-left px-4 md:px-10 mb-10 md:mb-0">
          <img src="note.png" alt="logo" className="w-16 h-16 mb-4" />

          <h1 className="text-4xl font-extrabold text-neutral-900 dark:text-white mb-2">
            Smart Notes
          </h1>

          <p className="text-lg text-neutral-600 dark:text-neutral-300 max-w-md mb-6">
            A modern, minimal note-taking app that helps you stay organized, productive, and in control.
          </p>

          <ul className="space-y-2 text-sm text-neutral-700 dark:text-neutral-300">
            <li className="flex items-start gap-2">
              <span className="text-blue-500">📝</span>
              <span>Create rich-text notes with titles, labels, and colors.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-yellow-500">📌</span>
              <span>Pin important notes for instant access anytime.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-500">🗂️</span>
              <span>Organize notes using tags.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500">🔍</span>
              <span>Search and filter notes instantly with smart search.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-sky-500">☁️</span>
              <span>Access your notes across devices — fully synced.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-rose-500">🔔</span>
              <span>Set reminders to never miss a task or thought.</span>
            </li>
          </ul>

          <p className="mt-6 text-sm text-neutral-500 dark:text-neutral-400 max-w-md">
            Built with 💛 for creators, students, and note-takers who want simplicity with power.
          </p>
        </div>


        {/* Right Side - Form */}
        <div className="md:w-1/3 w-full bg-amber-200 dark:bg-neutral-800 rounded-lg shadow-md p-6 sm:p-8">
          <h2 className="text-2xl font-semibold text-neutral-900 dark:text-white mb-6">Register your account</h2>
          <form className="space-y-5">
            <div>
              <label htmlFor="name" className="block mb-1 text-sm font-medium text-neutral-700 dark:text-neutral-200">
                Your name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                onChange={onChange}
                value={credentials.name}
                className="w-full p-2.5 rounded-md border border-neutral-300 dark:border-neutral-600 bg-neutral-50 dark:bg-neutral-700 text-neutral-900 dark:text-white focus:ring-blue-500 focus:border-blue-500"
                placeholder="John Doe"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block mb-1 text-sm font-medium text-neutral-700 dark:text-neutral-200">
                Your email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                onChange={onChange}
                value={credentials.email}
                className="w-full p-2.5 rounded-md border border-neutral-300 dark:border-neutral-600 bg-neutral-50 dark:bg-neutral-700 text-neutral-900 dark:text-white focus:ring-blue-500 focus:border-blue-500"
                placeholder="john@example.com"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block mb-1 text-sm font-medium text-neutral-700 dark:text-neutral-200">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                onChange={onChange}
                value={credentials.password}
                className="w-full p-2.5 rounded-md border border-neutral-300 dark:border-neutral-600 bg-neutral-50 dark:bg-neutral-700 text-neutral-900 dark:text-white focus:ring-blue-500 focus:border-blue-500"
                placeholder="••••••"
                required
              />
            </div>

            <button
              type="submit"
              onClick={handleRegister}
              className="w-full bg-amber-500 hover:bg-amber-600 dark:bg-cyan-600 dark:hover:bg-cyan-700 text-white py-2.5 rounded-md text-sm font-medium focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800"
            >
              Sign Up
            </button>

            <p className="text-sm text-neutral-600 dark:text-neutral-400 text-center">
              Already have an account?{" "}
              <Link to="/login" className="text-amber-600 hover:underline dark:text-amber-400">
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </div>
    );
  }


export default Register;
