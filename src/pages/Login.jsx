import React, { useState } from "react";
import logo from "/logo.svg";
import twitter from "/twitter.svg";
import google from "/google.svg";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <section className="flex items-center  flex-col justify-center mt-[92px]">
      <figure>
        <img src={logo} alt="logo" />
      </figure>

      <main className="bg-white rounded-[16px] mt-[32px] px-[16px] w-[404px] drop-shadow-[0_0px_.6px_rgba(0,0,0,0.25)]">
        {/* Auth buttons */}
        <div className="mt-[24px] gap-[16px] flex flex-col items-center ">
          <button className="flex w-full py-[12px] justify-center border-[1px] items-center rounded-[8px] border-[#D9D8DD] gap-[8px]">
            <img src={google} alt="google-sigin" />
            <p className="text-[#353333] font-medium text-center text-[14px]">
              sign in with google
            </p>
          </button>
          <button className="flex w-full py-[12px]  justify-center border-[1px] items-center rounded-[8px] border-[#D9D8DD] gap-[8px]">
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
        <form className="flex flex-col mt-[24px] capitalize gap-[24px] justify-center">
          <div className="flex flex-col justify-center gap-[8px]">
            <label className="text-[16px] font-medium" htmlFor="email">
              Email*
            </label>
            <input
              id="email"
              type="email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="border rounded-[8px] focus:border-[#6172F3] border-[#D9D8DD] placeholder-[#AFAFAF] py-[14px] outline-none pl-[12px] placeholder:font-normal"
            />
          </div>
          <div className="flex flex-col justify-center gap-[8px]">
            <label className="text-[16px] font-medium" htmlFor="password">
              password*
            </label>
            <input
              id="password"
              name="password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="border rounded-[8px] focus:border-[#6172F3] border-[#D9D8DD] placeholder-[#AFAFAF] py-[14px] outline-none pl-[12px] placeholder:font-normal"
            />
          </div>

          <button
            type="submit"
            className="bg-[#6172F3] text-white rounded-[8px] py-[16px]"
          >
            Login
          </button>
        </form>
        {/* FORM */}
        <p className="mt-[16px] mb-[24px] sfont-medium flex items-center justify-center">
          Don't have an account?{" "}
          <Link to="/signup">
            <span className="text-[#6172F3] pl-[2px]">Sign up</span>
          </Link>
        </p>
      </main>
    </section>
  );
};

export default Login;
