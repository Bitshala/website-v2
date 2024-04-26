import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/swiper-bundle.css";
import { Pagination, Navigation } from "swiper/modules";
const PreviousSessions = ({
  videoConfig: videoConfig,
  heading,
  description,
}) => {
  return (
    <div>
      <h1 class="mb-5 mt-10 font-header text-5xl"> {heading}</h1>
      <p class="mb-10 text-xl">{description}</p>

      <Swiper
        slidesPerView={1.4}
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
        {videoConfig.map((video, key) => {
          return (
            <SwiperSlide key={key}>
              <div class="flex flex-col rounded-3xl bg-[#fff] p-3 shadow-xl lg:flex-row lg:p-10">
                <iframe
                  height="250"
                  allowFullScreen
                  src={video.link.replace("watch?v=", "embed/")}
                ></iframe>

                <div class="my-2 flex flex-col lg:mx-5">
                  <h1 class="font-header text-2xl text-orange lg:mb-5 lg:text-3xl">
                    {video.title.slice(0, 55)}...
                  </h1>
                  <p class="text-sm lg:text-lg">
                    {video.description.slice(0, 75)}...
                  </p>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default PreviousSessions;
