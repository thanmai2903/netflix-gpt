// import { useState, useRef } from "react";
// import Header from "./Header";
// import { checkValidData } from "../utils/validate";
// import { getAuth } from "firebase/auth";
// import {
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,
// } from "firebase/auth";

// const auth = getAuth();
// signInWithEmailAndPassword(auth, email, password)
//   .then((userCredential) => {
//     // Signed in
//     const user = userCredential.user;
//     // ...
//   })
//   .catch((error) => {
//     const errorCode = error.code;
//     const errorMessage = error.message;
//   });
// const Login = () => {
//   const [isSignInForm, setIsSignInForm] = useState(true);
//   const [errorMessage, setErrorMessage] = useState(null);
//   const name = useRef(null);
//   const email = useRef(null);
//   const password = useRef(null);

//   const handleButtonClick = () => {
//     // validate the form data
//     const message = checkValidData(email.current.value, password.current.value);
//     setErrorMessage(message);
//     // Sign / Sign Up
//     if (!isSignInForm) {
//       //sign up logic
//       createUserWithEmailAndPassword(
//         auth,
//         email.current.value,
//         password.current.value
//       )
//         .then((userCredential) => {
//           // Signed up
//           const user = userCredential.user;
//           console.log(user);
//           // ...
//         })
//         .catch((error) => {
//           const errorCode = error.code;
//           const errorMessage = error.message;
//           setErrorMessage(errorCode + errorMessage);
//         });
//     } else {
//       //sign in logic
//       signInWithEmailAndPassword(auth, email, password)
//         .then((userCredential) => {
//           // Signed in
//           const user = userCredential.user;
//           // ...
//         })
//         .catch((error) => {
//           const errorCode = error.code;
//           const errorMessage = error.message;
//         });
//     }
//   };
//   const toggleSignInForm = () => {
//     setIsSignInForm(!isSignInForm);
//   };
//   return (
//     <>
//       <div>
//         <Header />
//         <div>
//           <img
//             className="w-full absolute"
//             src="https://cdn.mos.cms.futurecdn.net/rDJegQJaCyGaYysj2g5XWY.jpg"
//             alt="background-image"
//           />
//         </div>
//         <form
//           onSubmit={(e) => e.preventDefault()}
//           className="w-3/12 bg-opacity-75 rounded-lg absolute mx-auto right-0 left-0 p-12 my-36 bg-black text-white"
//         >
//           <h1 className="text-3xl py-4">
//             {isSignInForm ? "SignUp" : "SignIn"}
//           </h1>
//           {isSignInForm && (
//             <input
//               ref={name}
//               type="text"
//               className="p-3 bg-gray-500 my-2 w-full"
//               placeholder="Full Name"
//             />
//           )}
//           <input
//             ref={email}
//             type="text"
//             placeholder="Email Address"
//             className=" p-3 bg-gray-500 my-2 w-full"
//           />
//           <input
//             ref={password}
//             type="password"
//             className="p-3 bg-gray-500 my-2 w-full"
//             placeholder="Password"
//           />
//           <p className="text-red-500 text-lg py-2 font-bold">{errorMessage}</p>

//           <button
//             className="p-4 my-4 bg-red-700 w-full rounded-lg"
//             onClick={handleButtonClick}
//           >
//             {isSignInForm ? "SignUp" : "SignIn"}
//           </button>
//           <p className="py-4 cursor-pointer" onClick={toggleSignInForm}>
//             {!isSignInForm
//               ? "New to Netflix? Sign Up Now"
//               : "Already registered? Sign In now."}
//           </p>
//         </form>
//       </div>
//     </>
//   );
// };
// export default Login;

import { useState, useRef } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/FireBase";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const handleButtonClick = () => {
    const emailVal = email.current.value;
    const passwordVal = password.current.value;
    console.log("Email:", emailVal, "Password:", passwordVal);

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
            photoURL: "https://example.com/jane-q-user/profile.jpg",
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
              navigate("/browse");
            })
            .catch((error) => {
              // error occured
              setErrorMessage(error.message);
            });
          console.log("User signed up:", user);
        })
        .catch((error) => {
          console.error("Sign in error:", error); // Full error log
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
          console.log("User signed in:", user);
          navigate("/browse");
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
            src="https://cdn.mos.cms.futurecdn.net/rDJegQJaCyGaYysj2g5XWY.jpg"
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
