import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login as storeLogin } from "../store/authSlice";
import { Button, Input, Logo } from "./index";
import { useForm } from "react-hook-form";
import authservice from "../appwrite/auth";
import { Link } from "react-router-dom";
import { Loading } from "./index.js";

function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const signup = async (data) => {
    setError("");
    // console.log("The data obtained from the signup form", data);
    try {
      setLoading(true);
      const session = await authservice.createAccount(data);
      if (session) {
        const userData = await authservice.getUser();
        if (userData) {
          dispatch(storeLogin({ userData }));
        }
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div
        className={`mx-auto w-full max-w-lg bg-gradient-to-r to-rose-500 via-rose-500  from-orange-300 rounded-xl p-10 `}
      >
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight text-white">
          Sign up to create account
        </h2>
        <p className="mt-2 mb-2 text-center text-base text-white">
          Already have an account?&nbsp;
          <Link
            to="/login"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign In
          </Link>
        </p>
        {error && (
          <p className="text-red-600 mt-8 text-center">{error.message}</p>
        )}

        <form onSubmit={handleSubmit(signup)}>
          <div className="space-y-5">
            <Input
              label="Username: "
              placeholder="Enter your username"
              className="bg-orange-200 border-none focus:bg-white focus:text-black text-black"
              {...register("name", {
                required: true,
              })}
            ></Input>
            <Input
              label="Email: "
              placeholder="Enter your email"
              className="bg-orange-200 border-none focus:bg-white focus:text-black text-black"
              type="email"
              {...register("email", {
                required: true,
                validate: {
                  matchPatern: (value) =>
                    /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
                      value
                    ) || "Email address must be a valid address",
                },
              })}
            />
            <Input
              label="Password: "
              placeholder="Enter your password"
              type="password"
              className="bg-orange-200 border-none focus:bg-white text-black"
              {...register("password", { required: true })}
            ></Input>
            <Button type="submit" className="w-full hover:opacity-70">
              {loading ? <Loading /> : "Sign up"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
