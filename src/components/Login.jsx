import { useState, useRef } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/validate";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const email = useRef(null);
  const password = useRef(null);

  const handleButtonClick = () => {
    // validate the form data
    const message = checkValidData(email.current.value, password.current.value);
    setErrorMessage(message);
    // Sign / Sign Up
  };
  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
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
            {isSignInForm ? "SignUp" : "SignIn"}
          </h1>
          {isSignInForm && (
            <input
              type="text"
              className="p-3 bg-gray-500 my-2 w-full"
              placeholder="Full Name"
            />
          )}
          <input
            ref={email}
            type="text"
            placeholder="Email Address"
            className=" p-3 bg-gray-500 my-2 w-full"
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
            {isSignInForm ? "SignUp" : "SignIn"}
          </button>
          <p className="py-4 cursor-pointer" onClick={toggleSignInForm}>
            {!isSignInForm
              ? "New to Netflix? Sign Up Now"
              : "Already registered? Sign In now."}
          </p>
        </form>
      </div>
    </>
  );
};
export default Login;
