"use client";

import MButton from "@/Component/Buttons/MButton";
import { useGetProductByIdQuery } from "@/Slices/admin/product";
import { Images } from "@/constants";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

const ProductPreview = () => {
  const searchParams = useSearchParams();
  const productId = searchParams.get("productId");
  const { data, error, isLoading, refetch } = useGetProductByIdQuery({
    id: productId,
  });

  const [quantity, setQuantity] = useState(0);
  const [selectedImage, setSelectedImage] = useState(
    data?.data?.mediaSchema?.[0]?.url
  );

  useEffect(() => {
    setSelectedImage(data?.data?.mediaSchema?.[0]?.url);
  }, [data?.status]);

  return (
    <div className="flex justify-center mt-20">
      <div className="flex gap-8 justify-center w-[75%] h-fit">
        <div className="w-[12%] flex flex-col gap-5">
          {data?.data?.mediaSchema?.map((item) => {
            return (
              <Image
                src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${item?.url}`}
                width={140}
                height={170}
                className={`bg-[#F5F5F5] cursor-pointer border rounded object-cover px-5 py-3 ${
                  item?.url === selectedImage ? "border-[#DB4444]" : ""
                }`}
                onClick={() => setSelectedImage(item?.url)}
              />
            );
          })}
        </div>
        <div className="w-[40%] bg-[#F5F5F5] p-5 border rounded flex justify-center items-center">
          <Image
            src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${selectedImage}`}
            width={300}
            height={300}
          />
        </div>
        <div className="w-[40%] flex flex-col gap-3 ml-8">
          <div className="text-[24px] font-semibold">
            {data?.data?.productName}
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
            <p className="text-black/50 font-medium mt-1 ml-3">{`150 Reviews`}</p>
            <div className="text-gray pt-1 mx-3">|</div>
            <div className="text-[#00FF66] pt-1">In Stock</div>
          </div>
          <div className="text-[24px]">${data?.data?.offerPrice}</div>
          <div className="text-[16px]">{data?.data?.productDescription}</div>
          <div className="border-t border-black/50 my-6"></div>
          <div className="flex gap-3">
            <div className="flex-1 h-full">
              <div className="h-full flex">
                <button
                  className="rounded-tl-md rounded-bl-md w-[25%] flex justify-center items-center border border-black/50"
                  onClick={() => setQuantity(quantity == 0 ? 0 : quantity - 1)}
                >
                  <Image src={Images.minus} className="w-[24px]" />
                </button>
                <input
                  type="number"
                  onChange={(e) => setQuantity(e.target.value)}
                  value={quantity}
                  className="border-t border-b border-black/50 w-[50%] flex justify-center text-[20px] font-medium"
                  defaultValue={5}
                  style={{ textAlign: "center", outline: "none" }}
                />
                <button
                  className="rounded-tr-[5px] rounded-br-[5px] border-[#DB4444] w-[25%] flex justify-center items-center bg-[#DB4444]"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Image src={Images.add} className="w-[24px]" />
                </button>
              </div>
            </div>
            <div className="rounded flex-1">
              <MButton
                title="Buy Now"
                click={() => {}}
                className="rounded-md w-full h-full !py-0"
              />
            </div>
            <button className="border border-black/50 rounded-md w-fit p-[5px]">
              <Image src={Images.heart} height={40} className="text-black/50" />
            </button>
          </div>
          <div className="border border-black/50 rounded-md mt-10">
            <div className="flex gap-6 border-b border-black/50 p-8">
              <Image src={Images.iconDelivery} className="w-[50px]" />
              <div>
                <p className="text-[18px] text-black mb-1">Free Delivery</p>
                <p className="underline text-[14px]">
                  Enter your postal code for Delivery Availability
                </p>
              </div>
            </div>
            <div className="flex p-8 gap-6">
              <Image src={Images.iconReturn} className="w-[50px]" />
              <div>
                <p className="text-[18px] text-black mb-1">Return Delivery</p>
                <p className="underline text-[14px]">
                  Free 30 Days Delivery Returns. Details
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPreview;
