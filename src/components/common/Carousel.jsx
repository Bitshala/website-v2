const slides = [
  {
    url: "/carousel/optech.webp",
    title: "Latest in Bitcoin Tech",
    content:
      "Stay updated and explore the latest developments in Bitcoin tech",
    targetLink: "/optech",
    cta: "Start staying updated  → ",
  },
  {
    url: "/carousel/readingClub.webp",
    title: "Bitcoin Reading Club",
    content:
      "Learn from non-tech Bitcoin books with fun community reading sessions",
    targetLink: "/readingClub",
    cta: "Join the club   → ",
  },
  {
    url: "/carousel/reviewClub.webp",
    title: "Bitcoin PR Review Club",
    content:
      "Review Bitcoin Core PRs together and sharpen your dev skills along the way",
    targetLink: "/review",
    cta: "Review PRs together  → ",
  },
  {
    url: "/carousel/bitdev.webp",
    title: "Bengaluru BITDEVS",
    content:
      "Join us offline for an evening of diving deep into Bitcoin tech with bitcoiners",
    targetLink: "/meetup",
    cta: "Tell me more  → ",
  },
  {
    url: "/carousel/cohort.webp",
    title: "Bitcoin Study Cohorts",
    content:
      "Dive deeper into Bitcoin tech with fellow learners and aspiring developers",
    targetLink: "/cohorts",
    cta: "Check out the cohorts   → ",
  },
  {
    url: "/carousel/fellowship.webp",
    title: "Bitshala Fellowship (Paid)",
    content:
      "Kickstart your Bitcoin FOSS career with hands-on work on real-world projects",
    targetLink: "/fellowship",
    cta: "Apply for a fellowship  → ",
  },
];

function Carousel() {
  return (
    <div className="mx-auto max-w-screen-xl">
      <h1 class="my-8 pt-20 text-center font-header text-2xl font-bold md:text-3xl lg:pt-0 lg:text-6xl">
        “Bitcoin seems really technical, <br />
        is it hard to get started?"
      </h1>

      <p className="m-4 text-center text-base md:text-lg lg:text-2xl">
        Don’t worry, our club activities, meetups, and study
        cohorts, will help make <br /> your Bitcoin journey,
        much more smoother, accessible, and fun.
      </p>
      <div className="mt-10 flex flex-col gap-4 p-5 md:grid md:grid-cols-2 lg:my-28 lg:grid lg:grid-cols-3 lg:gap-7 lg:p-0">
        {slides.map((slide, index) => (
          <div
            key={index}
            className="lg: rounded-3xl bg-peach px-3 pb-3 pt-5 lg:px-5 lg:pb-5 lg:pt-8"
          >
            <h1 className="mb-3 px-3 font-header text-xl font-bold   lg:text-3xl">
              {slide.title}
            </h1>
            <p className="mb-3 px-3 text-base lg:text-xl ">
              {slide.content}
            </p>
            <a
              href={slide.targetLink}
              className="px-3 text-orange hover:underline"
            >
              {slide.cta}
            </a>

            <img
              src={slide.url}
              className="mt-[32px] rounded-2xl "
              alt=""
            />
            <a href={slide.targetLink}></a>
          </div>
        ))}
      </div>
      <p class="m-4 text-center text-base md:text-lg lg:mx-28 lg:mb-20 lg:mt-16 lg:text-2xl">
        And, we totally understand, Bitcoin Tech can seem
        overwhelming in the start but <br /> it’s hard
        mostly if you’re trying to learn alone.
      </p>
    </div>
  );
}

export default Carousel;
