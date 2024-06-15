import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import "./styles.css";
import Image from "next/image";

export default function BannerSlider({ list }) {
  const pagination = {
    clickable: true,
    renderBullet: function (index, className) {
      return '<span class="' + className + '"></span>';
    },
  };
  return (
    <div className="w-[80%] pt-5">
      <Swiper
        spaceBetween={30}
        pagination={pagination}
        modules={[Pagination]}
        className="mySwiper h-[450px]"
      >
        <>
          {list.map((item, i) => {
            return (
              <SwiperSlide key={i}>
                <Image
                  src={item.img.src}
                  layout="fill"
                  objectFit="contain"
                  alt=""
                />
              </SwiperSlide>
            );
          })}
        </>
      </Swiper>
    </div>
  );
}
