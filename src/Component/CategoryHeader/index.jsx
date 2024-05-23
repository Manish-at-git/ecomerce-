import React from "react";
import MButton from "../Buttons/MButton";

const CategoryHeader = ({ title, subTitle, showButton, buttonText }) => {
  return (
    <div className="">
      <div className="flex items-center gap-5 font-semibold text-[#DB4444] mb-3">
        <div className="w-5 h-10 bg-[#DB4444] rounded"></div>
        <p>{subTitle}</p>
      </div>
      <div className="flex justify-between item-center">
        <div className="text-[36px] font-semibold mb-6">{title}</div>
        {/* <div className="border">d</div> */}
        {showButton && <MButton title={buttonText} click={() => {}} />}
      </div>
    </div>
  );
};

export default CategoryHeader;
