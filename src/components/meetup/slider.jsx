import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/swiper-bundle.css";

import { Pagination, Navigation } from "swiper/modules";
const list = [
  {
    id: 1,
    url: "/meetup/bitdevs_1.webp",
    title: "BIP324",
    desc:
      "Bengaluru witnessed a vibrant gathering of Bitcoiners and FOSS enthusiasts, where Stratospher unveiled BIP324's potential. It was an evening rich with conversations, connections, and celebration!",
    link: "https://discord.com/invite/STeQFVEWf9",
  },
  {
    id: 2,
    url: "/meetup/bitdevs_2.webp",
    title: "Miniscript and Descriptors",
    desc:
      "Bengaluru had a blast unwrapping the secrets of miniscript and descriptors with fellow Bitcoin buffs over great conversations and snacks!",
    link: "https://discord.com/invite/STeQFVEWf9",
  },
  {
    id: 3,
    url: "/meetup/bitdevs_3.webp",
    title: "Privacy Tech and Silent Payments",
    desc:
      "Get ready for another exciting Bitcoin Tech Meetup in Bangalore, this time diving deep into the world of Silent Payments! We'll explore how this innovative tech enhances privacy and efficiency within the Bitcoin network.",
    link: "https://discord.com/invite/STeQFVEWf9",
  },
];
const Slider = () => {
  return (
    <div>
      <h1 class="mb-5 mt-10 font-header text-5xl">Previous Meetups</h1>
      <p class="mb-10 text-xl">
        Missed some of our get-togethers? No worries. We've got the highlights
        right here. From figuring out Silent Payments to getting our heads
        around miniscript, we've been busy. It's all about diving deep into
        Bitcoin tech and having fun along the way.
      </p>
      <div>
        <Swiper
          slidesPerView={1.4}
          spaceBetween={10}
          centeredSlides={true}
          initialSlide={3}
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
                    class="lg:h-[50vh] h-[40vh] rounded-lg py-2"
                  />
                  <div class="lg:my-10 my-2 flex flex-col lg:mx-5">
                    <h1 class="lg:mb-5 font-header text-2xl text-orange lg:text-3xl">
                      {item.title}
                    </h1>
                    <p class="text-sm lg:text-lg">{item.desc}</p>
                    <a
                      href={item.link}
                      target="_blank"
                      class="text-m my-5 lg:w-1/2 rounded-lg p-4 text-center outline-dashed hover:bg-orange hover:text-white lg:text-2xl"
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
