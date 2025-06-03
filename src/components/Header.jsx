import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../utils/FireBase";
import { useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { LOGO } from "../utils/constants";
import { addUser, removeUser } from "../utils/userSlice";
import { useDispatch } from "react-redux";
import { USER_AVATAR } from "../utils/constants";
const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        //signout successful.
      })
      .catch((error) => {
        //An error happened
        navigate("/error");
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        //if user signed in / login then this will be executed
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        navigate("/browse");
      } else {
        //if user logged out / signed out the this will be executed
        dispatch(removeUser());
        navigate("/");
      }
    });
    //unsubscribe when component unmounts
    return () => unsubscribe();
  }, []);
  return (
    <>
      <div className="absolute px-6 py-2 bg-gradient-to-b flex flex-col md:flex-row justify-between from-black z-10 w-screen">
        <img className="w-52 rounded-3xl" src={LOGO} alt="logo" />

        {user && (
          <div className="flex p-2">
            <img className="w-11 h-11 pt-1 rounded-sm" src={USER_AVATAR} />
            <button
              onClick={handleSignOut}
              className="pl-4 mb-3 cursor-pointer text-white font-bold"
            >
              Sign Out
            </button>
          </div>
        )}
      </div>
    </>
  );
};
export default Header;
