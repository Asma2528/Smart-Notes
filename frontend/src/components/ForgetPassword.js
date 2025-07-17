import { Link } from "react-router-dom"

function ForgetPassword() {
  return (
                <div className="flex flex-col items-center justify-center px-6 pt-5 pb-10 mx-auto min-h-[calc(100vh-64px)]">
                    <Link to="/" className="flex items-center mb-6 text-2xl font-semibold text-neutral-900 dark:text-white">
                        <img className="w-8 h-8 mr-2" src="note.png" alt="logo"/>
                            Smart Notes
                    </Link>
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-neutral-800 dark:border-neutral-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-neutral-900 md:text-2xl dark:text-white">
                                Forget your password?
                            </h1>
                            <form className="space-y-4 md:space-y-6" action="#">
                                <div>
                                    <label for="email" className="block mb-2 text-sm font-medium text-neutral-900 dark:text-white">Your email</label>
                                    <input type="email" name="email" id="email" className="bg-neutral-50 border border-neutral-300 text-neutral-900 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-neutral-700 dark:border-neutral-600 dark:placeholder-neutral-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@example.com" required=""/>
                                </div>
                                <div className="flex items-center justify-between">
    
                                    <Link to="/login" className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">Sign In?</Link>
                                </div>
                                <button type="submit" className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Forget Password</button>
                                <p className="text-sm font-light text-neutral-500 dark:text-neutral-400">
                                    Don’t have an account yet? <Link to="/register" className="font-medium text-amber-600 hover:underline dark:text-amber-500">Sign up</Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
  )
}

export default ForgetPassword
