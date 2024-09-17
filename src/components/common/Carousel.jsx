const slides = [
  {
    url: "/apprenticeship/optech.png",
    title: "Latest in Bitcoin Tech",
    content: "Stay updated and explore the latest developments in Bitcoin tech",
    targetLink: "/",
    cta: "Start staying updated  → ",
  },
  {
    url: "/apprenticeship/readingClub.webp",
    title: "Bitcoin Reading Club",
    content: "Learn from non-tech Bitcoin books with fun community reading sessions",
    targetLink: "/reading-club",
    cta: "Join the club   → ",
  },
  {
    url: "/apprenticeship/reviewClub.webp",
    title: "Bitcoin PR Review Club",
    content: "Review Bitcoin Core PRs together and sharpen your dev skills along the way",
    targetLink: "/review",
    cta: "Review PRs together  → ",
  },
  {
    url: "/bitspace/bengaluruBitdev.webp",
    title: "Bengaluru BITDEVS",
    content: "Join us offline for an evening of Bitcoin tech learning and fun",
    targetLink: "/meetup",
    cta: "Tell me more  → ",
  },
  {
    url: "/cohort/mb.webp",
    title: "Bitcoin Study Cohorts",
    content:
      "Dive deeper into Bitcoin tech with fellow learners and aspiring developers",
    targetLink: "/cohorts",
    cta: "Check out the cohorts   → ",
  },
  {
    url: "/apprenticeship/fellowship.webp",
    title: "Bitshala Fellowship (Paid)",
    content: "Kickstart your Bitcoin FOSS career with hands-on work on real-world projects",
    targetLink: "/apprenticeship/fellowship",
    cta: "Apply for a fellowship  → ",
  },

];


function Carousel() {
  return (
    <>
      <div className="flex flex-col gap-3 mt-20 md:grid md:grid-cols-2 lg:grid lg:grid-cols-3">
        {slides.map((slide, index) => (
          <div
            key={index}
            className="rounded-2xl bg-peach p-5"
          >
            <h1 className="mb-5 font-header text-2xl lg:text-3xl">
              {slide.title}
            </h1>
            <p className="mb-2 text-xl ">
              {slide.content}
            </p>
            <a href={slide.targetLink} className="text-orange">{slide.cta} </a>
            
            <img src={slide.url} className="rounded-2xl mt-3" alt="" />
            <a href={slide.targetLink}>
             
            </a>
          </div>
        ))}
      </div>
    </>
  );
}

export default Carousel;
