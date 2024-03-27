import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import "swiper/css/autoplay";
import "swiper/css/virtual";
// import "./index.css";

import {
  EffectCoverflow,
  Pagination,
  Navigation,
  FreeMode,
  Autoplay,
  Virtual,
} from "swiper/modules";
import "swiper/swiper-bundle.css";
// import "./styles.css";
const Slider = () => {
  const images = [
    "/meetup/Gallery/1.webp",
    "/meetup/Gallery/2.webp",
    "/meetup/Gallery/3.webp",
    "/meetup/Gallery/4.webp",
    "/meetup/Gallery/5.webp",
    "/meetup/Gallery/6.webp",
    "/meetup/Gallery/7.webp",
  ];

  return (
    <div>
      <div>
        <Swiper
          slidesPerView={1}
          spaceBetween={1}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}
        >
          {images.map((image) => {
            return (
              <SwiperSlide>
                <div class="flex flex-col rounded-3xl bg-[#fff] p-3 shadow-xl lg:flex-row lg:p-10">
                  <img
                    src="/meetup/Bengaluru_BITDEVS_March.webp"
                    class="h-[50vh] rounded-lg py-2"
                  />
                  <div class="my-10 flex flex-col lg:mx-10">
                    <h1 class="mb-5 font-header text-3xl text-orange lg:text-5xl">
                      Silent Payments Deep Dive
                    </h1>
                    <p class="text-md lg:text-xl">
                      Get ready for another exciting Bitcoin Tech Meetup in
                      Bangalore, this time diving deep into the world of Silent
                      Payments! We'll explore how this innovative tech enhances
                      privacy and efficiency within the Bitcoin network.
                    </p>
                    <a
                      href="https://discord.com/invite/STeQFVEWf9"
                      target="_blank"
                      class="text-m mt-5 w-1/2 rounded-lg p-4 text-center outline-dashed hover:bg-orange hover:text-white lg:text-xl"
                    >
                      Tell me more
                    </a>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
};

export default Slider;
