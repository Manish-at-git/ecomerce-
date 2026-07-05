"use client";

import React from "react";
import { Button } from "@nextui-org/react";
import { useDispatch } from "react-redux";
import { setToken, setUserDetails } from "@/Slices/LoginStatus";
import { useRouter } from "next/navigation";

const LogoutButton = ({
  className,
  title,
  click,
  variant = undefined,
  isDisabled,
  type = "",
}) => {
  const router = useRouter()
  const dispatch = useDispatch();
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userDetails");
    dispatch(setUserDetails({}));
    dispatch(setToken(""));
    router.push("/login");
  };
  return (
    <Button
      type={type}
      color="primary"
      variant={variant}
      isDisabled={isDisabled}
      className={`absolute bottom-0 !px-10 !py-6 font-medium rounded-none !w-full text-white ${className}`}
      onClick={handleLogout}
    >
      {title}
    </Button>
  );
};

export default LogoutButton;
