import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from "@nextui-org/react";
import { usePathname } from "next/navigation";
import MInput from "../Input/MInput";
import ProfileSvg from "@/assets/icons/FCSVG/ProfileSvg";

export default function NavbarComponent() {
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
  ];

  return (
    <Navbar className="border w-full">
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
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Link href="/login">Login</Link>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color="primary" href="/signup" variant="flat">
            Sign Up
          </Button>
        </NavbarItem>
        <Link href="/profile">
          <ProfileSvg />{" "}
        </Link>
      </NavbarContent>
    </Navbar>
  );
}
