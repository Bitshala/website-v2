import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/swiper-bundle.css";

import { Pagination, Navigation } from "swiper/modules";
import { testimonial } from "../common/list.js";

const TestimonialMobile = () => {
  return (
    <div>
      <div>
        <Swiper
          slidesPerView={1.2}
          spaceBetween={10}
          centeredSlides={true}
          initialSlide={0}
          speed={1000}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Pagination, Navigation]}
        >
          {testimonial.map((group) =>
            group.map((item, index) => (
              <SwiperSlide key={index}>
                <div className="flex flex-col rounded-3xl border-2 border-orange bg-[#fff] p-3 shadow-xl lg:flex-row lg:p-10">
                  <div className="my-2 flex flex-col lg:mx-5 lg:my-10">
                    <p className="text-base">{item.text}</p>
                    <div className="flex">
                      <img
                        src={item.img}
                        alt={item.name}
                        className="h-16 w-16 rounded-full py-2 pr-5"
                      />
                      <div className="my-2 flex flex-col">
                        <h1 className="font-header text-2xl font-bold text-orange lg:mb-5 lg:text-3xl">
                          {item.name}
                        </h1>
                        <p className="text-sm lg:text-lg">
                          {item.cohort}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            )),
          )}
        </Swiper>
      </div>
    </div>
  );
};

export default TestimonialMobile;
