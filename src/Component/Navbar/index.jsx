import React, { useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { usePathname } from "next/navigation";
import MInput from "../Input/MInput";
import ProfileSvg from "@/assets/icons/FCSVG/ProfileSvg";
import { useDispatch, useSelector } from "react-redux";
import authLoginState, { setToken, setUserDetails } from "@/Slices/LoginStatus/index";

export default function NavbarComponent({ isAuthenticated, userType }) {
  const router = usePathname();
  const menu = [
    {
      text: "Home",
      link: "/",
    },
    {
      text: "Contact",
      link: "/contact",
    },
    {
      text: "About",
      link: "/about",
    },
    {
      text: "Sign Up",
      link: "/signup",
    },
  ];

  const loginStatus = useSelector((state) => state?.authLoginState);
  console.log(loginStatus, "loginStatus");

  return (
    <Navbar className="border !w-full">
      <NavbarBrand>
        <p className="text-[24px] font-semibold text-inherit">Exclusive</p>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-10" justify="center">
        {menu.map((item, index) => {
          if (item.text == "Sign Up") {
            return (
              <NavbarItem key={index}>
                <Button
                  as={Link}
                  color="primary"
                  href={item.link}
                  variant="flat"
                >
                  {item.text}
                </Button>
              </NavbarItem>
            );
          }
          return (
            <NavbarItem key={index}>
              <Link
                color={router.pathname === item.path ? "foreground" : ""}
                href={item.link}
              >
                {item.text}
              </Link>
            </NavbarItem>
          );
        })}
      </NavbarContent>
      <NavbarContent justify="end">
        <MInput placeholder="input" change={() => {}} />
      </NavbarContent>
      {isAuthenticated ? <></> : <></>}
      <NavbarContent justify="end">
        {!isAuthenticated ? (
          <>
            <NavbarItem className="hidden lg:flex">
              <Link href="/login">Login</Link>
            </NavbarItem>
            <NavbarItem>
              <Button as={Link} color="primary" href="/signup" variant="flat">
                Sign Up
              </Button>
            </NavbarItem>
          </>
        ) : (
          <></>
        )}
        <Profile />
      </NavbarContent>
    </Navbar>
  );
}

const Profile = () => {
  const dispatch = useDispatch()
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userDetails");
    dispatch(setUserDetails({}));
    dispatch(setToken(""));
  };
  return (
    <div className="flex items-center gap-4">
      <Dropdown placement="bottom-end">
        <DropdownTrigger>
          <div>
            <ProfileSvg />
          </div>
        </DropdownTrigger>
        <DropdownMenu aria-label="Profile Actions" variant="flat">
          <DropdownItem key="logout" onClick={handleLogout}>Logout</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};
