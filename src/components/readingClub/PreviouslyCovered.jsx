import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/swiper-bundle.css";

import { Pagination, Navigation } from "swiper/modules";
const list = [
  {
    id: 1,
    url: "/readingClub/image.png",
    title: "How to think about the economy",
    desc:
      "Get ready for another exciting Bitcoin Tech Meetup in Bangalore, this time diving deep into the etc stuff and all",
    link: "https://discord.com/invite/STeQFVEWf9",
  },
  {
    id: 2,
    url: "/readingClub/image.png",
    title: "How to think about the economy",
    desc:
      "Get ready for another exciting Bitcoin Tech Meetup in Bangalore, this time diving deep into the etc stuff and all",
    link: "https://discord.com/invite/STeQFVEWf9",
  },
];

const PreviouslyCovered = () => {
  return (
    <div>
      <div>
        <h1 class="mb-5 mt-10 font-header text-5xl">
          Previously Covered Books
        </h1>
        <p class="mb-10 text-xl">
          Need to catch up? Browse through the highlights and discussions from
          the books we've covered. Get the gist of past reads and stay in the
          loop with our collective learning journey.
        </p>
        <div>
          <Swiper
            slidesPerView={1.4}
            spaceBetween={10}
            centeredSlides={true}
            initialSlide={1}
            speed={1000}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            modules={[Pagination, Navigation]}
          >
            {list.map((item) => {
              return (
                <SwiperSlide>
                  <div class="flex flex-col rounded-3xl bg-[#fff] p-3 lg:flex-row shadow-xl lg:p-10">
                    <img
                      src={item.url}
                      class="lg:h-[30vh] h-[40vh] rounded-lg py-2"
                    />
                    <div class="my-2 flex flex-col lg:mx-5">
                      <h1 class="lg:mb-5 font-header text-2xl text-orange lg:text-3xl">
                        {item.title}
                      </h1>
                      <p class="text-sm lg:text-lg">{item.desc}</p>
                      <a
                        href={item.link}
                        target="_blank"
                        class="text-m my-5 lg:w-1/2 rounded-lg p-4 text-center outline-dashed hover:bg-orange hover:text-white lg:text-xl"
                      >
                        Attend
                      </a>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default PreviouslyCovered;
