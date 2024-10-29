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
    targetLink: "/bitdev",
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
    <div className="mx-auto max-w-screen-xl ">
      <h1 class="mt-20 hidden text-center  font-header text-3xl font-bold md:text-3xl lg:block lg:text-6xl">
        “Bitcoin seems really technical, <br />
        is it hard to get started?"
      </h1>
      <h1 class="mt-20 block text-center  font-header text-3xl font-bold md:text-3xl lg:hidden lg:text-6xl">
        “Bitcoin seems really <br /> technical, is it hard
        to <br /> get started?"
      </h1>

      <p className="mx-4 mt-[40px] hidden text-center text-base lg:block lg:text-2xl">
        Don’t worry, our club activities, meetups, and study
        cohorts, will help make <br /> your Bitcoin journey
        much more smoother, accessible, and fun.
      </p>
      <p className="mx-4 mt-[40px] block text-center text-base md:text-base lg:hidden lg:text-2xl">
        Don’t worry, our club activities, <br /> meetups,
        and study cohorts, will help <br /> make your
        Bitcoin journey much more <br /> smoother,
        accessible, and fun.
      </p>
      <div className="mt-10 flex flex-col gap-4 p-5 md:grid md:grid-cols-2 lg:my-[72px] lg:grid lg:grid-cols-3 lg:gap-7 lg:p-0">
        {slides.map((slide, index) => (
          <div
            key={index}
            className="lg: rounded-3xl bg-peach px-3 pb-3 pt-5 lg:px-5 lg:pb-5 lg:pt-8"
          >
            <h1 className="mb-3 px-3 font-header text-2xl font-medium lg:text-3xl">
              {slide.title}
            </h1>
            <p className="font-regular mb-3 px-3 text-base lg:text-base ">
              {slide.content}
            </p>
            <a
              href={slide.targetLink}
              className="px-3 font-header text-orange hover:underline"
            >
              {slide.cta}
            </a>

            <img
              src={slide.url}
              className="mt-[20px] rounded-2xl "
              alt=""
            />
            <a href={slide.targetLink}></a>
          </div>
        ))}
      </div>
      <p class="m-4 block text-center text-base md:text-base lg:mx-28 lg:mb-20 lg:mt-[72px] lg:hidden lg:text-3xl">
        And, we totally understand, Bitcoin Tech <br /> can
        seem overwhelming in the start but it’s <br /> hard
        mostly if you’re trying to learn alone.
      </p>
      <p class="text-bas m-4 hidden text-center md:text-base lg:mx-28 lg:mb-20 lg:mt-[72px] lg:block lg:text-3xl">
        And, we totally understand, Bitcoin Tech can seem
        overwhelming in the start but it’s hard mostly if
        you’re trying to learn alone.
      </p>
    </div>
  );
}

export default Carousel;
