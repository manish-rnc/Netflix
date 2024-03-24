import { useState } from "react"
import Header from "./Header"

const Login = () => {

    const [isSignInForm, setIsSignInForm] = useState(true);

    const toggleSignInForm = () => {
        setIsSignInForm(!isSignInForm);
    }

    return (
        <div>
            <Header />
            <div className="absolute">
                <img
                    src="https://assets.nflxext.com/ffe/siteui/vlv3/9d3533b2-0e2b-40b2-95e0-ecd7979cc88b/a3873901-5b7c-46eb-b9fa-12fea5197bd3/IN-en-20240311-popsignuptwoweeks-perspective_alpha_website_medium.jpg"
                    alt="logo"
                />
            </div>
            <form className="w-[430px] absolute p-12 bg-black my-28 mx-auto left-0 right-0 text-white rounded-md bg-opacity-85">
                <h1 className="font-bold text-3xl my-4">
                    {isSignInForm ? "Sign In" : "Sign Up"}
                </h1>
                {!isSignInForm && <input
                    type="text"
                    placeholder="Full Name"
                    className="p-3 my-3 w-full border rounded-md bg-transparent" />}
                <input
                    type="text"
                    placeholder="Email or phone number"
                    className="p-3 my-3 w-full border rounded-md bg-transparent" />
                <input
                    type="password"
                    placeholder="Password"
                    className="p-3 my-3 w-full border rounded-md bg-transparent" />
                <button
                    className="p-3 my-6 w-full bg-red-600 rounded-md font-semibold">
                    {isSignInForm ? "Sign In" : "Sign Up"}
                </button>
                <div className="mt-6">
                    <span className="text-slate-400">{isSignInForm ? "New to Netflix? " : "Already Registered? "}</span>
                    <span className="font-semibold cursor-pointer" onClick={toggleSignInForm}> {isSignInForm ? "Sign Up Now." : "Sign In."} </span>
                    <p className="text-slate-400 text-sm mt-2">This page is protected by Google reCAPTCHA to ensure you're not a bot.</p>
                </div>
            </form>
        </div>
    )
}

export default Login;
