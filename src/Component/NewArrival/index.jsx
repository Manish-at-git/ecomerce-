import React from "react";
import CategoryHeader from "../CategoryHeader";
import { Images } from "@/constants";
import Image from "next/image";

const NewArrival = ({ title, subTitle, showButton, buttonText }) => {
  const showText = (title, subTitle, className = "", subTitleClass = "") => {
    return (
      <div
        className={`absolute bottom-0 left-0 right-0 text-white z-10 px-10 flex flex-col ${className}`}
      >
        <h3 className="text-[28px] fomr-semibold">{title}</h3>
        <p className={`text-[16px] font-[300] ${subTitleClass}`}>{subTitle}</p>
        <div className="undrline font-medium text-[18px] underline">
          Shop Now
        </div>
      </div>
    );
  };
  return (
    <div className="px-10 py-16">
      <CategoryHeader
        title={title}
        subTitle={subTitle}
        showButton={showButton}
        buttonText={buttonText}
      />
      <div className="border grid grid-cols-2 gap-10 h-[650px]">
        <div className="relative bg-black rounded-lg flex justify-center items-end pt-20">
          <Image
            width={550}
            height={550}
            src={Images.playStation}
            alt="playstation"
          />
          {showText(
            "PlayStation 5",
            "Black and White version of the PS5 coming out on sale.",
            "h-[26%] gap-3",
            "w-1/2"
          )}
        </div>
        <div className="flex flex-col gap-10">
          <div className="relative bg-black rounded-lg flex justify-end flex-1">
            <Image
              width={450}
              height={460}
              src={Images.womenCollection}
              alt="playstation"
            />
            {showText(
              "Women's Collections",
              "Featured woman collections that give you another vibe.",
              "h-[56%] gap-2",
              "w-1/2"
            )}
          </div>
          <div className="flex gap-10 w-full flex-1">
            <div className="relative bg-black rounded-lg w-full flex items-center justify-center">
              <Image
                width={220}
                height={220}
                src={Images.speakers}
                alt="playstation"
              />
              {showText(
                "Speakers",
                "Amazon wireless speakers",
                "h-[45%] gap-1",
                "w-full"
              )}
            </div>
            <div className="relative bg-black rounded-lg w-full flex items-center justify-center">
              <Image
                width={220}
                height={220}
                src={Images.perfumes}
                alt="playstation"
              />
              {showText(
                "Perfume",
                "GUCCI INTENSE OUD EDP",
                "h-[45%] gap-1",
                "w-full"
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewArrival;
