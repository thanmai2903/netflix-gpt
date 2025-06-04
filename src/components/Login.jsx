import { useState, useRef } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { BG_URL } from "../utils/constants";
import { auth } from "../utils/FireBase";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { USER_AVATAR } from "../utils/constants";
const Login = () => {
  const dispatch = useDispatch();
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const handleButtonClick = () => {
    const emailVal = email.current.value;
    const passwordVal = password.current.value;

    // Validate the form data
    const message = checkValidData(emailVal, passwordVal);
    if (message) {
      setErrorMessage(message);
      return;
    }

    // Sign Up
    if (!isSignInForm) {
      createUserWithEmailAndPassword(auth, emailVal, passwordVal)
        .then((userCredential) => {
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value,
            photoURL: USER_AVATAR,
          })
            .then(() => {
              //profile updated
              const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                })
              );
            })
            .catch((error) => {
              // error occured
              setErrorMessage(error.message);
            });
        })
        .catch((error) => {
          if (error.code === "auth/user-not-found") {
            setErrorMessage("No account found with this email.");
          } else if (error.code === "auth/wrong-password") {
            setErrorMessage("Incorrect password. Try again.");
          } else {
            setErrorMessage(`${error.code}: ${error.message}`);
          }
        });
    }

    // Sign In
    else {
      signInWithEmailAndPassword(auth, emailVal, passwordVal)
        .then((userCredential) => {
          const user = userCredential.user;
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(`${errorCode}: ${errorMessage}`);
        });
    }
  };

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
    setErrorMessage(null); // Clear errors on form toggle
  };

  return (
    <>
      <div>
        <Header />
        <div>
          <img
            className="w-full absolute"
            src={BG_URL}
            alt="background-image"
          />
        </div>
        <form
          onSubmit={(e) => e.preventDefault()}
          className="w-3/12 bg-opacity-75 rounded-lg absolute mx-auto right-0 left-0 p-12 my-36 bg-black text-white"
        >
          <h1 className="text-3xl py-4">
            {isSignInForm ? "Sign In" : "Sign Up"}
          </h1>
          {!isSignInForm && (
            <input
              ref={name}
              type="text"
              className="p-3 bg-gray-500 my-2 w-full"
              placeholder="Full Name"
            />
          )}
          <input
            ref={email}
            type="text"
            placeholder="Email Address"
            className="p-3 bg-gray-500 my-2 w-full"
          />
          <input
            ref={password}
            type="password"
            className="p-3 bg-gray-500 my-2 w-full"
            placeholder="Password"
          />
          <p className="text-red-500 text-lg py-2 font-bold">{errorMessage}</p>
          <button
            className="p-4 my-4 bg-red-700 w-full rounded-lg"
            onClick={handleButtonClick}
          >
            {isSignInForm ? "Sign In" : "Sign Up"}
          </button>
          <p className="py-4 cursor-pointer" onClick={toggleSignInForm}>
            {isSignInForm
              ? "New to Netflix? Sign Up Now"
              : "Already registered? Sign In now."}
          </p>
        </form>
      </div>
    </>
  );
};

export default Login;
