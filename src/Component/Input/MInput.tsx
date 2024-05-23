"use client"

import React from "react";
import { Input } from "@nextui-org/input";
import "./input.css"

type MInputProps = {
  className?: string;
  placeholder: string;
  isDisabled?: boolean;
  change: () => void;
  value?: string | (readonly string[] & string) | undefined;
  type?:string
};
  

const MInput: React.FC<MInputProps> = ({
  className="",
  placeholder,
  change,
  isDisabled=false,
  value,
  type="text"
}) => {
  return <Input type={type} placeholder={placeholder} isDisabled={isDisabled} onChange={change} value={value} className={`${className} w-full`} />;
};

export default MInput;
