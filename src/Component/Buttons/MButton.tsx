"use client"

import React from "react";
import { Button } from "@nextui-org/react";

type MButtonProps = {
  className?: string;
  title: string;
  click: () => void;
  variant?: "solid" | "bordered" | "light" | "flat" | "faded" | "shadow" | "ghost" | undefined;
  isDisabled?: boolean
};

const MButton: React.FC<MButtonProps> = ({ className, title, click, variant=undefined, isDisabled }) => {
  return <Button color="primary" variant={variant} isDisabled={isDisabled} className={`!px-10 !py-6 font-medium rounded ${className}`}>{title}</Button>;
};

export default MButton;
