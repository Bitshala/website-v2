import { useState } from "react";
const slides = [
  {
    url: "/website-v2/activities/cohort.png",
    title: "Bitcoin Study Cohorts",
    content:
      "You, with fellow learners collectively explore selected texts over several weeks in a structured self-study format. You gain hands-on experience and in-depth insights into Bitcoin’s technical aspects. And also receive certificates to celebrate your wins!",
    targetLink: "/website-v2/cohorts",
  },
  {
    url: "/website-v2/cohort/lbtcl.png",
    title: "Bitcoin Deep Dive",
    content:
      "Here, for you, we decode the technical intricacies of the Bitcoin protocol layer. Deep Dive is a recorded series for you to explore specific technical topics around Bitcoin. Be ready to geek out during your self-study sessions.",
    targetLink: "",
  },
  {
    url: "/website-v2/activities/cohort.png",
    title: "Bitcoin Talk",
    content:
      "You get to listen to insightful conversations with experienced Bitcoin developers as they share their journeys, provide valuable advice, and offer suggestions for newcomers in the exciting world of Bitcoin development.",
    targetLink: "/website-v2/talks",
  },
  {
    url: "/website-v2/cohort/lbtcl.png",
    title: "Bitcoin Core Review Club",
    content:
      "You get hand-on experience into the inner workings of Bitcoin Core and understand how experienced contributors review PRs. You’ll also develop a deeper understanding of Bitcoin’s design principles while sharpening your adversarial-thinking skills.",
    targetLink: "/website-v2/review",
  },
  {
    url: "/website-v2/activities/cohort.png",
    title: "Discord Community",
    content:
      "Come and become a part of our vibrant community of Bitcoin enthusiasts. Here, you can engage in discussions, challenge ideas, and explore Bitcoin opportunities with like-minded peers passionate about shaping the future of decentralized finance.",
    targetLink: "https://discord.gg/ekzAUeeR",
  },
];

const MobileCarousel = () => {
  return (
    <div className="my-2 flex flex-col lg:hidden  ">
      {slides.map((slide) => {
        return (
          <div className="my-2 rounded-lg bg-orange p-3">
            <h1 className="mb-5  font-header text-2xl  lg:p-11 lg:text-8xl">
              {slide.title}
            </h1>
            <h1
              style={{
                WebkitTextStrokeColor: "black",
                WebkitTextFillColor: "transparent",
                WebkitTextStrokeWidth: "2px",
              }}
              className="absolute top-12 mb-2 hidden font-header text-2xl opacity-10  lg:p-11 lg:text-9xl xl:flex"
            >
              {slide.title}
            </h1>
            <div
              href={slide.targetLink}
              className="flex flex-col lg:flex-row"
            >
              <a href={slide.targetLink}>
                <div
                  style={{
                    backgroundImage: `url(${slide.url})`,
                  }}
                  className=" h-40 rounded-2xl bg-contain bg-center bg-no-repeat duration-500 lg:h-96 lg:w-1/2"
                ></div>
              </a>
              <div className="flex  flex-col lg:w-1/2">
                <div className="my-5 lg:p-5 lg:text-3xl">
                  {slide.content}
                </div>
                <a
                  href={slide.targetLink}
                  className="flex justify-center"
                >
                  <button className="mt-1 rounded-lg border-2 border-dotted border-black  px-4 py-4 text-xl  hover:bg-white">
                    Tell Me More!
                  </button>
                </a>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide
      ? slides.length - 1
      : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  return (
    <>
      <MobileCarousel />
      <div className="group relative m-auto hidden w-full rounded-2xl bg-orange px-4 py-16  lg:block">
        <h1 className="mb-2 font-header text-2xl  lg:p-11 lg:text-8xl">
          {slides[currentIndex].title}
        </h1>
        <h1
          style={{
            WebkitTextStrokeColor: "black",
            WebkitTextFillColor: "transparent",
            WebkitTextStrokeWidth: "2px",
          }}
          className="absolute top-12 mb-2 hidden font-header text-2xl opacity-10  lg:p-11 lg:text-9xl xl:flex"
        >
          {slides[currentIndex].title}
        </h1>
        <div className="flex">
          <a
            href={slides[currentIndex].targetLink}
            className="h-40 rounded-2xl bg-contain bg-center bg-no-repeat duration-500 lg:h-96 lg:w-1/2"
            style={{
              backgroundImage: `url(${slides[currentIndex].url})`,
            }}
          ></a>

          <div className="flex  flex-col lg:w-1/2">
            <div className="my-5 lg:p-5 lg:text-3xl">
              {slides[currentIndex].content}
            </div>
            <a
              href={slides[currentIndex].targetLink}
              className="flex justify-center"
            >
              <button className="mt-5 rounded-lg  border-2 border-dotted border-black  py-4 text-xl hover:bg-white  lg:px-36">
                Tell Me More!
              </button>
            </a>
          </div>
        </div>

        <div className="absolute left-5 top-[50%] hidden -translate-x-0 translate-y-[-50%] cursor-pointer rounded-full bg-black/20 p-2 text-2xl text-white hover:text-5xl group-hover:block">
          <button onClick={prevSlide}>⇐</button>
        </div>
        <div className="absolute right-5 top-[50%] hidden -translate-x-0 translate-y-[-50%] cursor-pointer rounded-full bg-black/20 p-2 text-2xl text-white hover:text-5xl group-hover:block">
          <button onClick={nextSlide}>⇒</button>
        </div>
        <div className="top-4 flex justify-center py-2">
          {slides.map((slide, slideIndex) => (
            <div
              key={slideIndex}
              onClick={() => goToSlide(slideIndex)}
              className={`cursor-pointer p-2 text-3xl ${
                currentIndex == slideIndex
                  ? ""
                  : "hover:text-4xl"
              }`}
            >
              {currentIndex == slideIndex ? "⚪" : "⚫"}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Carousel;
