import { Link, useNavigate } from "react-router-dom"
import { useState } from "react";

function Login(props) {
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({
        email: "",
        password: ""
    });

    const onChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        });
    };

const handleLogin = async (e) => {
  e.preventDefault();
  try {
    const response = await fetch(`${process.env.REACT_APP_HOST}/api/auth/login-user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password
      })
    });

    const json = await response.json();

    if (response.ok && json.success) {
      props.setAlert({ message: "Login successful!", type: "Success" });
      localStorage.setItem('token', json.authToken);
      navigate("/");
    } else {
      props.setAlert({ message: json.message || "Login failed", type: "Error" });
    }

  } catch (error) {
    props.setAlert({ message: "Something went wrong!", type: "Error" });
    console.error(error.message);
  }
};

    return (
        <div className="flex flex-col items-center justify-center px-6 pt-5 pb-10 mx-auto min-h-[calc(100vh-64px)]">
            <Link to="/" className="flex items-center mb-6 text-2xl font-semibold text-neutral-900 dark:text-white">
                <img className="w-8 h-8 mr-2" src="note.png" alt="logo" />
                Smart Notes
            </Link>
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-neutral-800 dark:border-neutral-700">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-neutral-900 md:text-2xl dark:text-white">
                        Sign in to your account
                    </h1>
                    <form className="space-y-4 md:space-y-6" action="#">
                        <div>
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-neutral-900 dark:text-white">Your email</label>
                            <input type="email" name="email" id="email" value={credentials.email} onChange={onChange} className="bg-neutral-50 border border-neutral-300 text-neutral-900 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-neutral-700 dark:border-neutral-600 dark:placeholder-neutral-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@example.com" required="" />
                        </div>
                        <div>
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-neutral-900 dark:text-white">Password</label>
                            <input type="password" name="password" id="password" value={credentials.password} onChange={onChange} placeholder="•••••" className="bg-neutral-50 border border-neutral-300 text-neutral-900 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-neutral-700 dark:border-neutral-600 dark:placeholder-neutral-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                        </div>
                        <div className="flex items-center justify-between">

                            <Link to="/forget-password" className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">Forgot password?</Link>
                        </div>
                        <button type="submit" onClick={handleLogin} className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Sign in</button>
                        <p className="text-sm font-light text-neutral-500 dark:text-neutral-400">
                            Don’t have an account yet? <Link to="/register" className="font-medium text-amber-600 hover:underline dark:text-amber-500">Sign up</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login
