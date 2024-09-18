import React, { useState } from "react";
import logo from "/logo.svg";
import twitter from "/twitter.svg";
import google from "/google.svg";
import { Link } from "react-router-dom";
import Spinner from "../../helpers/Spinner";
import { loginValidation } from "../utils/validation";
import toast from "react-hot-toast";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleAuth, twitterAuth } from "../../firebase/config";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setloading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setloading(true);
    try {
      if (loginValidation(email, password, setErrors)) {
        const user = await signInWithEmailAndPassword(auth, email, password);
        toast.success("login successful");
        console.log(user);
      } else {
        return;
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    } finally {
      setloading(false);
    }
  };

  const googleSignIn = async () => {
    try {
      const user = await signInWithPopup(auth, googleAuth);
      toast.success("Sign in with google successful");
    } catch (error) {
      console.error(error.message);
      toast.error(error.message);
    }
  };

  const twitterSignIn = async () => {
    try {
      const user = await signInWithPopup(auth, twitterAuth);
      toast.success("signin with twitter successful");
      console.log(user);
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  return (
    <section className="flex items-center  flex-col justify-center mt-[24px] md:mt-[92px]">
      <figure>
        <img src={logo} alt="logo" />
      </figure>

      <main className="bg-white rounded-[16px] md:mt-[32px] mt-[24px] px-[16px] w-full md:w-[404px] md:drop-shadow-[0_0px_.6px_rgba(0,0,0,0.25)]">
        {/* Auth buttons */}
        <div className="md:mt-[24px] gap-[16px] flex flex-col items-center ">
          <button
            onClick={googleSignIn}
            className="flex w-full py-[12px] justify-center border-[1px] items-center rounded-[8px] border-[#D9D8DD] gap-[8px]"
          >
            <img src={google} alt="google-sigin" />
            <p className="text-[#353333] font-medium text-center text-[14px]">
              sign in with google
            </p>
          </button>
          <button
            onClick={twitterSignIn}
            className="flex w-full py-[12px]  justify-center border-[1px] items-center rounded-[8px] border-[#D9D8DD] gap-[8px]"
          >
            <img src={twitter} alt="google-sigin" />
            <p className="text-[#353333] font-medium text-center text-[14px]">
              sign in with twitter
            </p>
          </button>
        </div>
        {/* Auth buttons */}
        <div className="flex items-center mt-[24px] justify-center">
          <hr className="border-[0.1px] w-full border-[#ecebee]" />
          <p className="px-[8px] text-[#D9D8DD]">OR</p>
          <hr className="border-[0.1px] font-light w-full border-[#ecebee]" />
        </div>
        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col mt-[24px] capitalize gap-[24px] justify-center"
        >
          <div className="flex flex-col justify-center gap-[8px]">
            <label className="text-[16px] font-medium" htmlFor="email">
              Email*
            </label>
            <input
              id="email"
              type="email"
              value={email || ""}
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className={`border rounded-[8px] ${
                errors.password ? "border-[#F84D4D]" : "border-[#D9D8DD] "
              } focus:border-[#6172F3] py-[14px] outline-none pl-[12px] placeholder-[#AFAFAF] placeholder:font-normal `}
            />
            {errors.email && (
              <p className="text-[#F84D4D] text-left text-[14px] font-medium">
                {errors.email}
              </p>
            )}
          </div>
          <div className="flex flex-col justify-center gap-[8px]">
            <label className="text-[16px] font-medium" htmlFor="password">
              password*
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={password || ""}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className={`border rounded-[8px] ${
                errors.password ? "border-[#F84D4D]" : "border-[#D9D8DD] "
              } focus:border-[#6172F3] py-[14px] outline-none pl-[12px] placeholder-[#AFAFAF] placeholder:font-normal `}
            />
            {errors.password && (
              <p className="text-[#F84D4D] text-left text-[14px] font-medium">
                {errors.password}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="bg-[#6172F3] text-white rounded-[8px] py-[16px]"
          >
            {loading ? <Spinner /> : "login"}
          </button>
        </form>
        {/* FORM */}
        <p className="mt-[16px] mb-[24px] sfont-medium flex items-center justify-center">
          Don't have an account?&nbsp;
          <Link to="/signup">
            <span className="text-[#6172F3] pl-[2px]">Sign up</span>
          </Link>
        </p>
      </main>
    </section>
  );
};

export default Login;
