import React, { useCallback, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import CategoryHeader from "../CategoryHeader";

import "swiper/css";
import "swiper/css/pagination";

import MCard from "../Card/MCard";
import Image from "next/image";
import { Images } from "@/constants";

const SectionSlider = ({ title, subTitle, buttonText, data }) => {
  const sliderRef = useRef(null);

  const handlePrev = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slidePrev();
  }, []);

  const handleNext = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slideNext();
  }, []);

  return (
    <div className="w-full px-10 relative">
      <CategoryHeader
        title={title}
        subTitle={subTitle}
        showButton={true}
        buttonText={buttonText}
      />
      <div
        className="absolute left-3 top-[230px] z-20 border border-[#DB4444] bg-[#DB4444] rounded-full p-3 h-fit w-fit cursor-pointer"
        onClick={handlePrev}
      >
        <Image width={40} height={40} src={Images.arrowLeft.src} />
      </div>
      <div
        className="absolute right-3 top-[230px] z-20 border border-[#DB4444] bg-[#DB4444] rounded-full p-3 h-fit w-fit cursor-pointer"
        onClick={handleNext}
      >
        <Image width={40} height={40} src={Images.arrowRight.src} />
      </div>
      <div className="flex justify-between">
        <Swiper
          ref={sliderRef}
          slidesPerView={4}
          spaceBetween={40}
          modules={[Pagination, Navigation]}
          navigation={true}
          className="mySwiper"
        >
          <>
            {data.map((item) => {
              return (
                <SwiperSlide>
                  <MCard className="" data={item} />
                </SwiperSlide>
              );
            })}
          </>
        </Swiper>
      </div>
    </div>
  );
};

export default SectionSlider;