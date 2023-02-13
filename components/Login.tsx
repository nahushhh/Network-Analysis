"use client";
import { BuiltInProviderType } from "next-auth/providers";
import { ClientSafeProvider, signIn } from "next-auth/react";
import React from "react";
import { useForm, SubmitHandler, LiteralUnion } from "react-hook-form";
import { BsGithub } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
type Props = {
  providers: Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null;
};
interface Inputs {
  email: string;
  password: string;
}
const Login = ({ providers }: Props) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);
  const registerOptions = {
    name: { required: "Name is required" },
    email: { required: "Email is required" },
    password: {
      required: "Password is required",
      minLength: {
        value: 8,
        message: "Password must have at least 8 characters",
      },
    },
  };
  return (
    <div>
      <section className=" min-h-screen   flex items-center justify-between w-full">
        <div className=" flex rounded-2xl pt-10 w-full px-8 md:px-20 items-center">
          <div className="md:w-1/2 px-2 md:px-2 ">
            <h1 className="text-4xl antialiased font-bold dark:text-white">
              Welcome to Reflections
            </h1>
            <h2 className="font-bold text-2xl text-[#126eff] dark:text-[#e5ff12]">
              Fast Login
            </h2>
            <p className="text-xs mt-4 text-[#002D74] dark:text-white">
              Easy login with Google, Github, Twitter and LinkedIn
            </p>

            <div className="">
              {providers &&
                Object.values(providers).map((provider, id) =>
                  provider.name === "Google" ? (
                    <button
                      key={id}
                      onClick={() => signIn(provider.id, { callbackUrl: "/" })}
                      className="bg-white border py-3 px-3 md:px-0 md:w-1/2 rounded-xl mt-5 flex justify-center items-center text-sm  duration-300 text-[#002D74]"
                    >
                      <FcGoogle className="text-2xl" />
                      <div className="ml-2  font-semibold">
                        Continue With Google
                      </div>
                    </button>
                  ) : (
                    <button
                      key={id}
                      onClick={() => signIn(provider.id, { callbackUrl: "/" })}
                      className="bg-white border py-3 px-3 md:px-0 md:w-1/2 rounded-xl mt-5 flex justify-center items-center text-sm  duration-300 text-[#002D74]"
                    >
                      <BsGithub className="text-xl" />
                      <div className="ml-2 font-semibold">
                        Continue With Github
                      </div>
                    </button>
                  )
                )}
            </div>
          </div>
          <div className="md:inline-block hidden w-1/2 h-full"></div>
        </div>
      </section>
    </div>
  );
};

export default Login;
