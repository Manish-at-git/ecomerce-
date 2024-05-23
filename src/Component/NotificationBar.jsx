import Image from "next/image";
import React, { useState } from "react";
import Images from "../constants/images";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
  User,
  Button,
} from "@nextui-org/react";

const NotificationBar = () => {
  return (
    <div className="w-full bg-black text-white flex justify-evenly items-center h-12">
      <div></div>
      <div className="flex gap-4">
        <p className="text-[14px]">
          Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!
        </p>
        <p className="text-[14px] font-semibold underline">ShopNow</p>
      </div>
      <div className="flex items-center gap-4">
        <DropDown />
      </div>
    </div>
  );
};

export default NotificationBar;

const DropDown = () => {
    const [state, setState] = useState("English")
  return (
    <div className="flex items-center gap-4">
      <Dropdown placement="bottom-end">
        <DropdownTrigger>
          <Button variant="light">
            <>
              <span className="text-[16px] text-white">English</span>
              <div>
                <Image src={Images.dropdown} height={10} />
              </div>
            </>
          </Button>
        </DropdownTrigger>
        <DropdownMenu aria-label="Profile Actions" variant="flat">
          <DropdownItem key="English">English</DropdownItem>
          <DropdownItem key="Hindi">Hindi</DropdownItem>
          <DropdownItem key="Hindi">NAKE_KI_RAND</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};
