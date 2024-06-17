import Image from "next/image";
import React from "react";
import Images from "../../constants/images";
import MButton from "../Buttons/MButton";

const Enhance = ({}) => {
  const timer = [
    { time: "05", type: "Days" },
    { time: "23", type: "Hours" },
    { time: "59", type: "Minutes" },
    { time: "35", type: "Seconds" },
  ];
  return (
    <div className="bg-black w-full px-16 py-10 flex justify-between items-center">
      <div className="flex flex-col gap-8">
        <div className="text-green-400 font-semibold">Categories</div>
        <div className="text-[52px] font-semibold text-[#FAFAFA] leading-[70px]">
          Enhance Your <br /> Music Experience
        </div>
        <div className="flex gap-8">
          {timer.map((item, index) => (
            <div
              className="bg-white text-black rounded-full w-[70px] h-[70px] flex flex-col justify-center items-center"
              key={index}
            >
              <div className="text-[18px] font-semibold leading-[18px]">
                {item?.time}
              </div>
              <div className="text-[13px]">{item?.type}</div>
            </div>
          ))}
        </div>
        <MButton
          title="Buy Now"
          click={() => {}}
          className="bg-green-400 w-fit mt-5"
        />
      </div>
      <div className="">
        <Image src={Images.enhance} alt="" />
      </div>
    </div>
  );
};

export default Enhance;
