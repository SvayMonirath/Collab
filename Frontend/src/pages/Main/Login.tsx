import { useState } from "react";

import { AuthNav } from "../../components/AuthNav";
import Collaboration from "../../assets/collaboration.svg";
import GoogleIcon from "../../assets/googleIcon.png";
import GithubIcon from "../../assets/githubIcon.png";

import type { LoginTypes } from "../../types/loginTypes";
import { useLogin } from "../../hooks/authHooks";
import { PopUpMessage } from "../../components/popUpMessage";

export function Login() {
  const { login, loading, error, message } = useLogin();

  const [formData, setFormData] = useState<LoginTypes>({
    username: "",
    password: "",
    rememberMe: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(formData);
  };

  return (
    <div>
      <AuthNav />
      <main
        className="bg-white min-h-screen flex flex-row justify-center! pt-5!
                md:pt-5! md:text-left! md:pb-36 lg:pb-40! md:items-center! lg:justify-around!
            "
      >
        {/* input content */}
        <div
          className="flex flex-col gap-4 w-full max-w-md px-4!
                    sm:mt-6 md:max-w-lg! md:px-6! lg:max-w-xl! lg:px-8!
                "
        >
          <h2
            className="text-black! font-extrabold text-3xl text-center mb-2!
                        sm:text-5xl! md:text-5xl!
                    "
          >
            Welcome Back
          </h2>
          <p
            className="text-gray-500 text-xs mb-10 text-center opacity-80
                        sm:text-sm! md:text-base!
                    "
          >
            Log in to access your team, calls, and AI features
          </p>
          <div className="flex flex-col gap-2 ">
            <label
              htmlFor=""
              className="text-black! font-bold text-base ml-5
                            sm:text-lg! md:text-xl!
                        "
            >
              Name
            </label>
            <input
              type="text"
              className="rounded-md! px-2! text-black!
                            sm:p-3! md:p-4! text-sm! sm:text-base! md:text-lg!
                        "
              placeholder="Enter your name"
              id="username"
              value={formData.username}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label
              htmlFor=""
              className="text-black! font-bold text-base ml-5
                            sm:text-lg! md:text-xl!
                        "
            >
              Password
            </label>
            <input
              type="password"
              className="rounded-md! px-2! text-black!
                            sm:p-3! md:p-4! text-sm! sm:text-base! md:text-lg!
                        "
              placeholder="Enter your password"
              id="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <div
            className="flex flex-row justify-between mt-10 mb-4!
                        sm:mt-12! sm:mb-6! md:mt-14! md:mb-8!
                    "
          >
            {/* TODO[X]: Add Remember Me */}
            <div>
              <input
                type="checkbox"
                id="remember"
                className="mr-2!"
                checked={formData.rememberMe}
                onChange={(e) =>
                  setFormData({ ...formData, rememberMe: e.target.checked })
                }
              />
              <label
                htmlFor="remember"
                className="text-gray-600! text-xs!
                                sm:text-sm! md:text-base!
                            "
              >
                Remember me
              </label>
            </div>
            {/* TODO[]: Implement forgot password functionality */}
            <div>
              <a
                href="#"
                className="text-purple-700! font-semibold! hover:text-purple-900! text-xs!
                                sm:text-sm! md:text-base!
                            "
              >
                Forgot Password?
              </a>
            </div>
          </div>
          <button
            onClick={handleSubmit}
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-2 px-4 rounded-md
                        sm:text-base! md:text-lg!
                    "
          >
            {loading ? "Loading..." : "Log In"}
          </button>
          <p
            className="text-gray-500 text-center text-sm opacity-80
                        md:text-base!
                    "
          >
            Or Login With
          </p>
          <div className="flex flex-row justify-center gap-6 mt-2!">
            <div className="flex flex-row gap-2 hover:cursor-pointer! hover:scale-105! transition-all! duration-200 items-center text-center bg-black! p-2 px-6 rounded-md">
              <img
                src={GoogleIcon}
                alt="Google Icon"
                className="w-6 h-6
                                md:w-8! md:h-8!
                            "
              />
              <span
                className="text-white! text-base! font-bold!
                                sm:text-xl!
                            "
              >
                Google
              </span>
            </div>
            <div className="flex flex-row gap-2 hover:cursor-pointer! hover:scale-105! transition-all! duration-200 items-center text-center bg-black! p-2 px-6 rounded-md">
              <img
                src={GithubIcon}
                alt="Github Icon"
                className="w-6 h-6 invert!
                                md:w-8! md:h-8!
                            "
              />
              <span
                className="text-white! text-base font-bold!
                                sm:text-xl!
                            "
              >
                Github
              </span>
            </div>
          </div>

          <div className="">
            <p
              className="text-gray-600! text-center! mt-2! sm:mt-6! text-sm!
                            sm:text-base! md:text-lg!
                        "
            >
              Don't have an account?{" "}
              <a
                href="/register"
                className="ml-2 text-purple-700! font-semibold! hover:text-purple-900!"
              >
                Sign Up
              </a>
            </p>
          </div>
        </div>
        {/* illustration */}
        <img
          src={Collaboration}
          alt="Collaboration Illustration"
          className="hidden! lg:block! lg:size-[20rem] 2xl:size-[35rem] rotate-5! hover:rotate-0! transition-transform! duration-500!"
        />
      </main>
      {(message || error) && <PopUpMessage message={message} error={error} />}
    </div>
  );
}
