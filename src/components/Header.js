import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {

    const navigate = useNavigate();
    const user = useSelector((store) => store.user);

    const handleSignOut = () => {
        signOut(auth).then(() => {
            navigate("/");
        }).catch((error) => {
            // An error happened.
        });
    };

    return (
        <div className="absolute px-8 py-2 bg-gradient-to-b from-black w-full z-10 flex justify-between">
            <img
                className="w-48"
                src="https://images.ctfassets.net/4cd45et68cgf/7LrExJ6PAj6MSIPkDyCO86/542b1dfabbf3959908f69be546879952/Netflix-Brand-Logo.png?w=700&h=456"
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


