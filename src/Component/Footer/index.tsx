import Image from "next/image";
import React from "react";
import { Images } from "@/constants";
import { title } from "process";

const footerData = [
  {
    title: "Exclusive",
    details: ["Subscribe", "Get 10% off your first order"],
    input: { placeholder: "Coupon Code" },
  },
  {
    title: "Support",
    details: [
      "111 Bijoy sarani, Dhaka, DH 1515, Bangladesh.",
      "exclusive@gmail.com",
      "+88015-88888-9999",
    ],
  },
  {
    title: "Account",
    details: ["My Account", "Login / Register", "Cart", "Wishlist", "Shop"],
  },
  {
    title: "Quick Link",
    details: ["Privacy Policy", "Terms Of Use", "FAQ", "Contact"],
  },
];

const index = () => {
  return (
    <>
      <div className="md:flex md:flex-row flex-col bottom-0 w-full md:justify-around text-white bg-[#000000]">
        <div className="md:flex md:justify-around mt-10 md:mt-8 md:w-full md:pb-20 gap-y-4 sm:gap-y-6">
          {footerData.map((section, index) => (
            <FooterSection key={index} section={section} />
          ))}
          <AppDownloadSection />
        </div>
      </div>
      <span className="border-t border-opacity-0 border-white bg-[#000000] w-full py-4 flex justify-center text-[#545454]/60 items-center">
        @ Copyright Rimel 2022. All right reserved
      </span>
    </>
  );
};

export default index;

const AppDownloadSection = () => (
  <div className="flex md:w-1/6 flex-col gap-4">
    <div>Download App</div>
    <div className="text-[#FAFAFA]/70">Save $3 with App New User Only</div>
    <div className="flex w-full h-2/6 ">
      <Image src={Images.Qrcode} width={95} height={95} alt="" />
      <div className="flex ml-2 flex-col justify-between w-1/3">
        <Image src={Images.playstore} width={100} height={100} alt="" />
        <Image src={Images.appstore} alt="" />
      </div>
    </div>
    <div className="flex w-full justify-between px-4">
      <Image src={Images.FaceBook} alt="" />
      <Image src={Images.Twitter} alt="" />
      <Image src={Images.Insta} alt="" />
      <Image src={Images.LinkedIn} alt="" />
    </div>
  </div>
);

const FooterSection = ({ section }: any) => (
  <div className="flex md:w-1/6 flex-col gap-4">
    <div>
      <span>{section.title}</span>
    </div>
    {section.details.map((detail: any, detailIndex: any) => (
      <div key={detailIndex}>{detail}</div>
    ))}
    {section.input && (
      <div>
        <input
          className="h-10 px-4 border rounded-md bg-[#000000] border-black focus:border-black focus-visible:outline-black"
          type="text"
          placeholder={section.input.placeholder}
        />
      </div>
    )}
    {section.images && (
      <div className="flex w-full h-2/6">
        {section.images.map((image: any, imageIndex: any) => (
          <Image
            key={imageIndex}
            src={image.src}
            width={image.width}
            height={image.height}
            alt=""
          />
        ))}
      </div>
    )}
    {section.socials && (
      <div className="flex w-full justify-between px-4">
        {section.socials.map((social: any, socialIndex: any) => (
          <Image key={socialIndex} src={social.src} alt="" />
        ))}
      </div>
    )}
  </div>
);
