"use client"

import React from "react";
import { Button } from "@nextui-org/react";

type MButtonProps = {
  className?: string;
  title: string;
  click: () => void;
  variant?: "solid" | "bordered" | "light" | "flat" | "faded" | "shadow" | "ghost" | undefined;
  isDisabled?: boolean,
  type?: "button" | "submit" | "reset" | undefined
};

const MButton = ({ className, title, click, variant=undefined, isDisabled, type="" }:any) => {
  return <Button type={type} color="primary" variant={variant} isDisabled={isDisabled} className={`!px-10 !py-6 font-medium rounded ${className}`} onClick={click}>{title}</Button>;
};

export default MButton;
