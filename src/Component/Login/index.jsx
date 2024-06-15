"use client";
import React, { useState, useEffect } from "react";
import { Images } from "@/constants";
import Image from "next/image";
import { Button } from "@nextui-org/react";
import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useAuthLoginMutation } from "@/Slices/Login";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setFilterTabs } from "@/Slices/LoginStatus";

const index = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [touched, setTouched] = useState(false);
  const [authLogin, { data }] = useAuthLoginMutation({});

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Please Enter Email"),
    password: Yup.string()
      .min(8, "Password is too short - should be 8 chars minimum.")
      .required("Please Enter Password "),
  });

  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("setFilterTabssetFilterTabssetFilterTabssetFilterTabs");
    debugger;
    if (localStorage.getItem("token")) {
      dispatch(setFilterTabs("LoggedIn"));
      router.push("/");
    }
  }, []);

  return (
    <div
      className="flex w-full"
      style={{ height: "calc(100vh - 115px)", overflow: "hidden" }}
    >
      <div className="w-1/2 ">
        <Image
          src={Images.SignUpSizeImg}
          width={"100%"}
          height={"100%"}
          alt=""
          style={{ height: "100vh" }}
        />
      </div>
      <div className="flex justify-center  items-center w-1/2">
        <Formik
          initialValues={{ email: "", password: "" }}
          // validationSchema={validationSchema}
          onSubmit={(values) => {
            authLogin(values)
              .unwrap()
              .then((data) => {
                if (data?.status == 200) {
                  debugger;
                  // Store the token in local storage
                  localStorage.setItem("token", data.accessToken);
                  localStorage.setItem(
                    "userDetails",
                    JSON.stringify(data?.userDetails)
                  );

                  // Redirect to the home page
                  router.push("/");
                } else if (data?.status == 400) {
                  if (data?.message.includes("Email")) {
                    setFieldError("email", data?.message);
                  } else {
                    setFieldError("password", data?.message);
                  }
                }
              })
              .catch((error) => {
                Swal.fire({
                  icon: "error",
                  title: "Oops...",
                  text: "Something went wrong!",
                  footer: '<a href="#">Server ERROR</a>',
                });
                console.log(error);
              });
          }}
        >
          {({ errors, touched }) => (
            <Form className="flex flex-col">
              <div className="flex flex-col">
                <span className="text-4xl text-[#000000] font-medium leading-7 tracking-wider text-left">
                  Log in to Exclusive
                </span>
                <span className="mt-6 text-[#000000] font-poppins text-base font-normal leading-6 text-left">
                  Enter Your Details Below
                </span>

                <div className="mt-12">
                  <Field
                    name="email"
                    type="text"
                    placeholder="Email or Phone Number"
                    className="w-full text-[#000000] bg-[#ffffff] h-10 p-0 border-b border-black flex items-center mb-4 focus:outline-none"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-400"
                  />
                  <Field
                    name="password"
                    type="password"
                    placeholder="Password"
                    className="w-full bg-[#ffffff] text-[#000000] h-10 p-0 border-b border-black flex items-center mb-4 focus:outline-none"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-400"
                  />
                </div>
                <div className="flex justify-between mt-4">
                  <Button
                    className="px-12 py-6 bg-[#DB4444] rounded-sm text-white"
                    type="submit"
                  >
                    Log in
                  </Button>
                  <a
                    href="#"
                    className="flex justify-center items-center rounded-sm  bg-white/60 text-[#DB4444]"
                  >
                    Forget Password?
                  </a>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default index;

const InputField = ({ type, placeholder, name, onChange, setTouched }) => (
  <input
    type={type}
    placeholder={placeholder}
    name=""
    onChange={onChange}
    onKeyDown={() => setTouched(true)}
    className="w-full bg-[#ffffff] h-10 p-0 border-b border-black flex items-center mb-4 focus:outline-none"
  />
);

// LoginButton.jsx
const LoginButton = () => (
  <Button className="px-12 py-6 bg-[#DB4444] rounded-sm text-white">
    Log in
  </Button>
);

// ForgetPasswordLink.jsx
const ForgetPasswordLink = () => (
  <a className="flex justify-center items-center rounded-sm bg-white/60 text-[#DB4444]">
    Forget Password?
  </a>
);
