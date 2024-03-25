import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addUser, removeUser } from "../utils/userSlice";
import { LOGO_URL } from "../utils/constants";

const Header = () => {

    const navigate = useNavigate();
    const user = useSelector((store) => store.user);
    const dispatch = useDispatch();

    const handleSignOut = () => {
        signOut(auth).then(() => {
            // Signed out.
        }).catch((error) => {
            // An error happened.
        });
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in
                const { uid, email, displayName } = user;
                dispatch(addUser({ uid: uid, email: email, displayName: displayName }));
                navigate("/browse");
            } else {
                // User is signed out
                dispatch(removeUser());
                navigate("/");
            }
        });

        return () => unsubscribe();
    }, []);

    return (
        <div className="absolute px-8 py-2 bg-gradient-to-b from-black w-full z-10 flex justify-between">
            <img
                className="w-48"
                src={LOGO_URL}
                alt="logo"
            />
            {user && <div className="p-6 m-4 z-20">
                <span className="font-bold">{user.displayName + " "}</span>
                <button
                    onClick={handleSignOut}
                    className="font-bold text-red-600">
                    Sign Out
                </button>
            </div>}
        </div>
    )
}

export default Header;
