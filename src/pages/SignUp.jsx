import React, { useState } from "react";
import logo from "/logo.svg";
import twitter from "/twitter.svg";
import { Link } from "react-router-dom";
import google from "/google.svg";
import toast from "react-hot-toast";
import { validation } from "../utils/validation";
import Spinner from "../../helpers/Spinner";
import { auth, googleAuth, twitterAuth } from "../../firebase/config";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (validation(email, password, name, setErrors)) {
        const user = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        toast.success("User created successfully");

        if (user) {
          console.log(user);
        }
      } else {
        return;
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const googleSignIn = async () => {
    try {
      const user = await signInWithPopup(auth, googleAuth);
      toast.success("Sign up with google successful");

      console.log(user);
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
      <main className="bg-white rounded-[16px] md:mt-[32px] mt-[32px] px-[16px] w-full md:w-[404px] md:drop-shadow-[0_0px_.6px_rgba(0,0,0,0.25)]">
        {/* Auth buttons */}
        <div className="md:mt-[24px] gap-[16px] flex flex-col items-center ">
          <button
            onClick={googleSignIn}
            className="flex w-full py-[12px] justify-center border-[1px] items-center rounded-[8px] border-[#D9D8DD] gap-[8px]"
          >
            <img src={google} alt="google-sigin" />
            <p className="text-[#353333] font-medium text-center text-[14px]">
              sign up with google
            </p>
          </button>
          <button
            onClick={twitterSignIn}
            className="flex w-full py-[12px]  justify-center border-[1px] items-center rounded-[8px] border-[#D9D8DD] gap-[8px]"
          >
            <img src={twitter} alt="google-sigin" />
            <p className="text-[#353333] font-medium text-center text-[14px]">
              sign up with twitter
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
            <label className="text-[16px] font-medium" htmlFor="name">
              Name*
            </label>
            <input
              id="name"
              type="text"
              name="name"
              value={name || ""}
              onChange={(e) => setName(e.target.value)}
              className={`border rounded-[8px] ${
                errors.name ? "border-[#F84D4D]" : "border-[#D9D8DD] "
              } focus:border-[#6172F3] py-[14px] outline-none pl-[12px] placeholder-[#AFAFAF] placeholder:font-normal `}
              placeholder="What is your name"
            />
            {errors.name && (
              <p className="text-[#F84D4D] text-left text-[14px] font-medium">
                {errors.name}
              </p>
            )}
          </div>
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
                errors.email ? "border-[#F84D4D]" : "border-[#D9D8DD] "
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
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
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
            {loading ? <Spinner /> : "Sign up"}
          </button>
        </form>
        {/* FORM */}
        <p className="mt-[16px] mb-[24px] sfont-medium flex items-center justify-center">
          <span>Already have an account?</span>&nbsp;
          <Link to="/login">
            <span className="text-[#6172F3] p">login</span>
          </Link>
        </p>
      </main>
    </section>
  );
};

export default SignUp;
