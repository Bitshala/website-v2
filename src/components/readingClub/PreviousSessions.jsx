import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/swiper-bundle.css";
import { Pagination, Navigation } from "swiper/modules";
const PreviousSessions = ({
  heading,
  description,
  url,
}) => {
  return (
    <div>
      <div class="my-5 items-center rounded-xl bg-[#fff] p-10 text-center shadow-lg">
        <h1 class="mb-5 font-header text-5xl font-bold">
          {heading}
        </h1>
        <p class="mb-8 text-xl">{description}</p>

        <a
          target="_blank"
          class="text-m mb-5 mt-2 rounded-lg border-2 border-dashed bg-white p-4 text-center font-bold hover:bg-orange hover:text-white lg:w-1/3 lg:text-2xl"
          href={url}
        >
          Watch on YouTube
        </a>
      </div>

      {/* <Swiper
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
                  <h1 class="font-header font-bold text-2xl text-orange lg:mb-5 lg:text-3xl">
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
      </Swiper> */}
    </div>
  );
};

export default PreviousSessions;
