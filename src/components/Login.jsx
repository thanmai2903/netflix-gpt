import { useState } from "react";
import Header from "./Header";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
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
        <form className="w-3/12 bg-opacity-75 rounded-lg absolute mx-auto right-0 left-0 p-12 my-36 bg-black text-white">
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
            type="text"
            placeholder="Email Address"
            className=" p-3 bg-gray-500 my-2 w-full"
          />
          <input
            type="password"
            className="p-3 bg-gray-500 my-2 w-full"
            placeholder="Password"
          />

          <button className="p-4 my-4 bg-red-700 w-full rounded-lg">
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
