import React from "react";
import Images from "../../constants/images";
import Image from "next/image";

const About = () => {
  const carts = [
    {
      icon: Images.HomeSvg,
      Price: "10.5k ",
      description: "Sallers active our site",
      isActive: false,
    },
    {
      icon: Images.Dollar,
      Price: "33k",
      description: "Mopnthly Produduct Sale",
      isActive: true,
    },
    {
      icon: Images.BagSvg,
      Price: "45.5k",
      description: "Customer active in our site",
      isActive: false,
    },
    {
      icon: Images.BagDollarSvg,
      Price: "25k",
      description: "Anual gross sale in our site",
      isActive: false,
    },
  ];

  return (
    <div className="flex flex-col   w-full">
      {/* 1st div */}
      <div className="flex justify-between items-center ">
        <div className="  md:w-1/2  items-center px-20">
          <h1 className=" flex justify-start items-start font-semibold text-5xl mb-10">
            Our Story
          </h1>
          <p className="font-normal text-base mb-6">
            Launced in 2015, Exclusive is South Asia’s premier online shopping
            makterplace with an active presense in Bangladesh. Supported by wide
            range of tailored marketing, data and service solutions, Exclusive
            has 10,500 sallers and 300 brands and serves 3 millioons customers
            across the region.
          </p>
          <p className="font-normal text-base">
            Exclusive has more than 1 Million products to offer, growing at a
            very fast. Exclusive offers a diverse assotment in categories
            ranging from consumer.
          </p>
        </div>
        <div className="md:w-1/2">
          <Image src={Images.TwoGirl} width={"100%"} height={"100%"} alt="" />
        </div>
      </div>
      {/* 2nd Div */}
      <div className="grid grid-cols-4 gap-10 container mx-auto py-20 w-full items-center">
        {carts.map((cart, index) => {
          return (
            <div
              key={index}
              className={`flex flex-col border w-full justify-between items-center  ${
                cart.isActive ? "bg-red-500 text-white" : "bg-white"
              } p-8 mb-4`}
            >
              <div className="flex w-full flex-col items-center ">
                <Image src={cart.icon} width={60} height={50} alt=""/>
                <div className=" flex flex-col items-center justify-center mt-5">
                  <h1 className="font-bold text-3xl">{cart.Price}</h1>
                  <p className="font-normal text-sm">{cart.description}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default About;
