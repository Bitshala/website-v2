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
    </div>
  );
};

export default PreviousSessions;
