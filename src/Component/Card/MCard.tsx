"use client";

import React, { useState } from "react";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import Image from "next/image";
import Images from "@/constants/images";

type MCardProps = {
  className?: string;
  data?: any;
};

const MCard: React.FC<MCardProps> = ({ className, data }) => {
  const [showButton, setshowButton] = useState(false);
  return (
    <Card
      className={`${className} shadow-none rounded`}
      onMouseEnter={() => setshowButton(true)}
      onMouseLeave={() => setshowButton(false)}
    >
      <CardHeader className="relative pb-0 pt-2 px-4 flex-col items-start bg-[#F5F5F5] p-14 !rounded !rounded-t">
        <div className="absolute left-5 top-5 bg-[#DB4444] px-3 py-1 text-white rounded">
          {data?.discount}%
        </div>
        <div className="absolute right-5 top-5 flex flex-col gap-2">
          <div className="bg-white p-[6px] rounded-full">
            <Image
              alt="Card background"
              className="object-cover"
              src={Images.heart.src}
              width={30}
              height={30}
            />
          </div>
          <div className="bg-white p-[6px] rounded-full">
            <Image
              alt="Card background"
              className="object-cover"
              src={Images.quickView.src}
              width={30}
              height={30}
            />
          </div>
        </div>
        <Image
          alt="Card background"
          className="object-cover"
          src={data?.image?.src}
          width={200}
          height={220}
        />
        <div
          className={`${
            !showButton ? "py-0 h-0" : "py-2 h-auto"
          } duration-300 absolute bottom-0 bg-black text-white font-medium left-0 right-0 text-center cursor-pointer`}
        >
          Add To Cart
        </div>
      </CardHeader>
      <CardBody className="overflow-visible py-4 px-0 flex flex-col gap-2">
        <h4 className="text-[18px]">{data?.title}</h4>
        <div className="flex gap-4">
          <p className="text-[#DB4444] font-medium">${data?.offerPrice}</p>
          <s className="text-black/50 font-medium">
            {data?.price ? `${data?.price}` : ``}
          </s>
        </div>
        <div className="flex gap-1 items-center">
          {[0, 1, 2, 3, 4].map((item, index) => {
            return (
              <Image
                src={Images.star}
                height={20}
                width={20}
                alt=""
                key={index}
              />
            );
          })}
          <p className="text-black/50 font-medium mt-1 ml-3">{`(${data?.ratingCount})`}</p>
        </div>
      </CardBody>
    </Card>
  );
};

export default MCard;
