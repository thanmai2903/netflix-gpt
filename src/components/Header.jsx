import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../utils/FireBase";
import { useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { LOGO, SUPPORTED_LANGUAGES } from "../utils/constants";
import { addUser, removeUser } from "../utils/userSlice";
import { useDispatch } from "react-redux";
import { USER_AVATAR } from "../utils/constants";
import { toggleGptSearchView } from "../utils/gptSlice";
import { changeLanguage } from "../utils/configSLice";
const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);
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

  const handleGptSearchClick = () => {
    //Toggle GPT Search
    dispatch(toggleGptSearchView());
  };

  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  };

  return (
    <>
      <div className="absolute px-6 py-2 bg-gradient-to-b flex flex-col md:flex-row justify-between from-black z-10 w-screen">
        <img className="w-52 rounded-3xl" src={LOGO} alt="logo" />

        {user && (
          <div className="flex p-2">
            {showGptSearch && (
              <select
                className="rounded-xs  text-white px-3 m-2 bg-gray-900"
                onChange={handleLanguageChange}
              >
                {SUPPORTED_LANGUAGES.map((lang) => (
                  <option key={lang.identifier} value={lang.identifier}>
                    {lang.name}
                  </option>
                ))}
                {/* <option value="en">English</option>
              <option value="hindi">Hindi</option>
              <option value="spanish">Spanish</option>
              <option value="telugu">Telugu</option>
              <option value="tamil">Tamil</option>*/}
              </select>
            )}
            <button
              className="py-2 px-4 mb-5 bg-purple-800 text-white rounded-lg mx-4 my-2"
              onClick={handleGptSearchClick}
            >
              {showGptSearch ? "Homepage" : "GPT Search"}
            </button>
            <img className="w-11 h-11 mt-1 rounded-sm" src={USER_AVATAR} />
            <button
              onClick={handleSignOut}
              className="pl-4 cursor-pointer mb-3 text-white font-bold"
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
