import React from "react";
import { Images } from "@/constants";
import Image from "next/image";
import { Button } from "@nextui-org/react";

const index = () => {
  return (
    <div className="flex w-full">
      <div className="w-1/2">
        <Image
          src={Images.SignUpSizeImg}
          width={"100%"}
          height={"100%"}
          alt=""
        />
      </div>
      <div className="flex justify-center items-center w-1/2">
        <LoginForm />
      </div>
    </div>
  );
};

export default index;

// InputField.jsx
const InputField = ({ type, placeholder }) => (
  <input
    type={type}
    placeholder={placeholder}
    className="w-full bg-[#ffffff] h-10 p-0 border-b border-black flex items-center mb-4 focus:outline-none"
  />
);

// CreateAccountButton.jsx
const CreateAccountButton = () => (
  <Button className="px-16 py-4 mt-10 w-full bg-[#DB4444] rounded-none text-white">
    Create Account
  </Button>
);

// GoogleSignUpButton.jsx
const GoogleSignUpButton = () => (
  <Button className="px-16 py-4 mt-10 border rounded-sm w-full bg-white/60 text-[#000000]">
    <Image src={Images.Google} width={25} height={25} alt="" />
    Sign up with Google
  </Button>
);

// LoginForm.jsx
const LoginForm = () => {
  const formFields = [
    { type: "text", placeholder: "Name" },
    { type: "text", placeholder: "Email or Phone Number" },
    { type: "password", placeholder: "Password" },
  ];

  return (
    <div className="flex flex-col">
      <span className="text-4xl font-medium leading-7 tracking-wider text-left">
        Create an Account
      </span>
      <span className="mt-6 font-poppins text-base font-normal leading-6 text-left">
        Enter Your Details Below
      </span>
      <div className="mt-12">
        {formFields.map((field, index) => (
          <InputField
            key={index}
            type={field.type}
            placeholder={field.placeholder}
          />
        ))}
      </div>
      <CreateAccountButton />
      <GoogleSignUpButton />
      <div className="flex justify-center items-center mt-8  text-[#000000] text-opacity-70 text-base font-normal leading-6">
        Already have account?
        <a className="ml-2 text-base underline font-medium leading-6 text-left">
          Log in
        </a>
      </div>
    </div>
  );
};
