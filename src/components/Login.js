import { useRef, useState } from "react"
import Header from "./Header"
import { checkValidData } from "../utils/validate"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BG_URL } from "../utils/constants";

const Login = () => {

    const [isSignInForm, setIsSignInForm] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);

    const dispatch = useDispatch();

    const name = useRef(null);
    const email = useRef(null);
    const password = useRef(null);

    const handleButtonClick = () => {
        const validationMessage = checkValidData(email.current.value, password.current.value);
        setErrorMessage(validationMessage);
        if (validationMessage) return;

        if (!isSignInForm) {
            createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
                .then((userCredential) => {
                    const user = userCredential.user;
                    updateProfile(user, {
                        displayName: name.current.value,
                    })
                        .then(() => {
                            // Profile updated!
                            const { uid, email, displayName } = auth.currentUser;
                            dispatch(addUser({ uid: uid, email: email, displayName: displayName }));
                        })
                        .catch((error) => {
                            // An error occurred
                            setErrorMessage(error.message);
                        });
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setErrorMessage(errorMessage);
                });
        }
        else {
            signInWithEmailAndPassword(auth, email.current.value, password.current.value)
                .then((userCredential) => {
                    const user = userCredential.user;
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setErrorMessage(errorMessage);
                });
        }

    }

    const toggleSignInForm = () => {
        setIsSignInForm(!isSignInForm);
    }

    return (
        <div>
            <Header />
            <div className="absolute">
                <img
                    src={BG_URL}
                    alt="logo"
                />
            </div>
            <form
                onSubmit={(e) => e.preventDefault()}
                className="w-[425px] absolute p-12 bg-black my-28 mx-auto left-0 right-0 text-white rounded-md bg-opacity-85">
                <h1 className="font-bold text-3xl my-4">
                    {isSignInForm ? "Sign In" : "Sign Up"}
                </h1>
                {!isSignInForm && <input
                    ref={name}
                    type="text"
                    placeholder="Full Name"
                    className="p-3 my-3 w-full border rounded-md bg-transparent" />}
                <input
                    ref={email}
                    type="text"
                    placeholder="Email or phone number"
                    className="p-3 my-3 w-full border rounded-md bg-transparent" />
                <input
                    ref={password}
                    type="password"
                    placeholder="Password"
                    className="p-3 my-3 w-full border rounded-md bg-transparent" />
                <p className="text-sm text-red-600">{errorMessage}</p>
                <button
                    className="p-3 my-4 w-full rounded-md font-semibold"
                    style={{ backgroundColor: "red" }}
                    onClick={handleButtonClick}>
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
