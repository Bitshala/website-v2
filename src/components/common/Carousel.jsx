import { useEffect, useRef, useState } from "react";

const clubCards = [
  {
    name: "Latest in Bitcoin Tech",
    img: "/clubs/cards/optech.jpg",
    href: "/optech",
  },
  {
    name: "TradFi & Bitcoin",
    img: "/clubs/cards/tradfi.jpg",
    href: "https://www.youtube.com/playlist?list=PLdHBT9oS8yMWiWd0L48gHDgTi8roKB3Fs",
  },
  {
    name: "Bitcoin Kernel Club",
    img: "/clubs/cards/kernel.jpg",
    href: "/clubs",
  },
  {
    name: "Bitcoin Mining Club",
    img: "/clubs/cards/mining.jpg",
    href: "/clubs",
  },
  {
    name: "Bitshala Reading Club",
    img: "/clubs/cards/reading.jpg",
    href: "/readingClub",
  },
];

const fellowshipCards = [
  {
    title: "For Educators",
    desc: "Know Bitcoin well enough to teach it to other learners?",
    href: "/fellowship#apply",
    bg: "/home/fellowship-edu.jpg",
    icon: "/home/grad-icon.png",
  },
  {
    title: "For Developers",
    desc: "Ready to shape the protocols that Bitcoin runs on?",
    href: "/fellowship#apply",
    bg: "/home/fellowship-dev.jpg",
    icon: "/home/code-icon.png",
  },
  {
    title: "For Designers",
    desc: "Bitcoin's UX is bad marketing for Bitcoin. Want to fix it?",
    href: "/fellowship#apply",
    bg: "/home/fellowship-design.jpg",
    icon: "/home/pencil-icon.png",
  },
];

const bitspaceCards = [
  {
    title: "Join us for an event",
    desc: "Bitcoin & freedom tech talks, workshops, and meetups - open to anyone in Bangalore.",
    cta: "RSVP for the next one   → ",
    href: "/bitspace",
  },
  {
    title: "Host an event with us",
    desc: "Got a bitcoin talk or workshop in mind? Use the space and the crowd to run it.",
    cta: "Tell me more   → ",
    href: "mailto:contact@bitshala.org",
  },
  {
    title: "Co-work at Bitspace",
    desc: "A desk among Bitcoin builders and a chance to collaborate with some of the brightest minds.",
    cta: "Apply to join in   → ",
    href: "https://docs.google.com/forms/d/e/1FAIpQLScM_PzAyEKOs3QNCzX-wfvdB3stIB6yh-WoHklQU6hof9s9Rg/viewform",
  },
];

const cohortCards = [
  {
    name: "Mastering Bitcoin",
    img: "/cohort/mb.webp",
    desc: "Base Theory Track. Learn fundamentals of Bitcoin Tech.",
    url: "/cohorts/mb",
  },
  {
    name: "Learn Bitcoin from the Command Line",
    img: "/cohort/lbtcl.webp",
    desc: "Intro Hands-On Track. Dive into Bitcoin with Practical CLI Skills.",
    url: "/cohorts/lbtcl",
  },
  {
    name: "Programming Bitcoin",
    img: "/cohort/pb.webp",
    desc: "Advanced Hands-On Track. Learn adv. Bitcoin development skills.",
    url: "/cohorts/pb",
  },
  {
    name: "Bitcoin Protocol Dev.",
    img: "/cohort/bpd.webp",
    desc: "Advanced Theory Track. Gain adv. insights into Bitcoin Protocols.",
    url: "/cohorts/bpd",
  },
  {
    name: "Mastering Lightning",
    img: "/cohort/ln.webp",
    desc: "Intermediate Track. Learn fundamentals of LN Engineering.",
    url: "/cohorts/ln",
  },
  {
    name: "Building Bitcoin in Rust",
    img: "/cohort/rust.webp",
    desc: "Intermediate Track. Build Bitcoin systems end-to-end in Rust.",
    url: "/cohorts/rust",
  },
];

const tabs = [
  {
    label: "SHOW UP",
    tagline: "Join us for an IRL event in your city.",
    title: "SHOW UP AT YOUR LOCAL BITCOIN MEETUP",
    content:
      "Our meetups are happening across India to bring more and more people together to learn about Bitcoin. All you have to do is show up to the nearest one.",
    cta: "Tell me more   → ",
    targetLink: "/meetups",
    url: "/home/meetup-showup.jpg",
  },
  {
    label: "CLUBS",
    tagline: "Talk with like-minded folks and learn bitcoin.",
    title: "JOIN OUR BITCOIN CLUBS",
    content:
      "Our clubs bring Bitcoin enthusiasts together to foster community, spark discussions, and deepen understanding of diverse Bitcoin topics.",
    type: "clubs",
  },
  {
    label: "COHORTS",
    tagline: "Join a group of active bitcoin learners",
    title: "JOIN OUR STUDY COHORTS",
    content:
      "Our study cohorts are free and structured to take you from reading about Bitcoin to building it.",
    type: "cohorts",
  },
  {
    label: "FELLOWSHIP",
    tagline: "Kickstart your career in Bitcoin FOSS.",
    title: "JOIN OUR FELLOWSHIP PROGRAM",
    content:
      "Kickstart your Bitcoin career here. Work on real Bitcoin FOSS projects, under real mentors, with real outcomes. It’s focused, collaborative, high-impact work that makes you a serious contributor to the Bitcoin ecosystem.",
    type: "fellowship",
  },
  {
    label: "BITSPACE",
    tagline:
      "Collaborate & co-work with bitcoin builders",
    title: "JOIN BITCOIN CONTRIBUTORS AT BITSPACE",
    content:
      "Kickstart your Bitcoin career here. Work on real Bitcoin FOSS projects, under real mentors, with real outcomes. It’s focused, collaborative, high-impact work that makes you a serious contributor to the Bitcoin ecosystem.",
    type: "bitspace",
  },
];

function Carousel() {
  const [active, setActive] = useState(0);
  const tabRefs = useRef([]);
  const panel = tabs[active];

  useEffect(() => {
    tabRefs.current[active]?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  }, [active]);

  return (
    <div className="bg-orange px-4 py-16 lg:px-10 lg:py-24">
      <div className="mx-auto flex max-w-screen-xl flex-col gap-10 lg:gap-20">
        <div className="flex flex-col items-center gap-6 lg:gap-[60px]">
          <h1 className="text-center font-header text-3xl/[1.2] font-bold md:text-4xl/[1.2] lg:text-[60px]/[1.2]">
            “Bitcoin seems really technical, <br />
            is it hard to get started?"
          </h1>
          <p className="max-w-[1000px] text-center text-base leading-[1.4] lg:text-[28px]">
            Don’t worry, our club activities, meetups, and
            study cohorts, will help make your Bitcoin
            journey, much more smoother, accessible, and fun.
          </p>
        </div>

        <div className="flex flex-col gap-8 lg:gap-10">
          <div
            role="tablist"
            aria-label="Ways to get started with Bitshala"
            className="-mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:mx-0 lg:grid lg:grid-cols-5 lg:gap-4 lg:overflow-visible lg:px-0 lg:pb-0"
          >
            {tabs.map((tab, index) => {
              const isActive = index === active;
              const isDark = index % 2 === 0;
              return (
                <div
                  key={tab.label}
                  ref={(el) => {
                    tabRefs.current[index] = el;
                  }}
                  className="relative flex w-[78%] max-w-[280px] shrink-0 snap-center lg:w-auto lg:max-w-none lg:shrink"
                >
                  <button
                    type="button"
                    role="tab"
                    id={`tab-${index}`}
                    aria-selected={isActive}
                    aria-controls="tab-panel"
                    onClick={() => setActive(index)}
                    className={`relative z-10 flex h-[120px] w-full flex-col rounded-[20px] px-5 pb-4 pt-4 text-left transition-colors lg:h-auto lg:min-h-[120px] lg:px-6 lg:pb-5 lg:pt-5 ${isDark
                      ? "bg-black text-white"
                      : "bg-peach text-black"
                      } ${isActive
                        ? "border-4 border-white shadow-[2px_4px_12px_0px_rgba(0,0,0,0.16)]"
                        : "border-4 border-transparent"
                      }`}
                  >
                    <p className="font-header text-xl font-bold leading-[1.1] lg:text-[20px]">
                      {tab.label}
                    </p>
                    <p className="mt-3 text-sm/[1.3] lg:mt-4 lg:text-base/[1.3]">
                      {tab.tagline}
                    </p>
                  </button>
                  {isActive && (
                    <img
                      src="/home/tab-pointer.svg"
                      alt=""
                      aria-hidden="true"
                      className="absolute -bottom-[29px] left-1/2 -ml-[2px] hidden h-[45px] w-[50px] -translate-x-1/2 rotate-180 lg:block"
                    />
                  )}
                </div>
              );
            })}
          </div>

          <div
            id="tab-panel"
            role="tabpanel"
            aria-labelledby={`tab-${active}`}
            className="flex flex-col gap-7 rounded-[24px] border border-black border-opacity-10 bg-peach p-5 lg:p-8"
          >
            <div className="flex flex-col gap-2">
              <h2 className="font-header text-2xl font-bold leading-[1.3] lg:text-[32px]">
                {panel.title}
              </h2>
              <p className="text-base leading-[1.4] lg:text-[24px]">
                {panel.content}
              </p>
              {panel.cta && (
                <a
                  href={panel.targetLink}
                  className="w-fit font-header text-base font-semibold text-orange hover:underline lg:text-[24px]"
                >
                  {panel.cta}
                </a>
              )}
            </div>

            {panel.type === "clubs" ? (
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {clubCards.map((club) => (
                  <a
                    key={club.name}
                    href={club.href}
                    target={
                      club.href.startsWith("http")
                        ? "_blank"
                        : undefined
                    }
                    rel={
                      club.href.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className="overflow-hidden rounded-[20px] transition-opacity hover:opacity-90"
                  >
                    <img
                      src={club.img}
                      alt={club.name}
                      className="aspect-[16/9] w-full object-cover"
                    />
                  </a>
                ))}
              </div>
            ) : panel.type === "cohorts" ? (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
                {cohortCards.map((cohort) => (
                  <a
                    key={cohort.url}
                    href={cohort.url}
                    className="group flex flex-col gap-3"
                  >
                    <img
                      src={cohort.img}
                      alt={cohort.name}
                      className="aspect-[16/9] w-84 rounded-[16px] object-cover transition-opacity group-hover:opacity-90"
                    />
                    <p className="text-sm leading-[1.3] text-black lg:text-base">
                      {cohort.desc}
                    </p>
                  </a>
                ))}
              </div>
            ) : panel.type === "fellowship" ? (
              <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
                {fellowshipCards.map((card) => (
                  <a
                    key={card.title}
                    href={card.href}
                    className={`relative flex min-h-[280px] flex-col gap-5 overflow-hidden rounded-[20px] border border-black border-opacity-10 p-6 transition-opacity hover:opacity-90 lg:min-h-[460px] ${card.bg
                      ? "bg-black text-white"
                      : "bg-white text-black"
                      }`}
                  >
                    {card.bg && (
                      <>
                        <img
                          src={card.bg}
                          alt=""
                          aria-hidden="true"
                          className="pointer-events-none absolute inset-0 h-full w-full scale-125 object-cover blur-[28px]"
                        />
                        <div
                          aria-hidden="true"
                          className="absolute inset-0 bg-black/50"
                        />
                      </>
                    )}
                    {card.icon && (
                      <img
                        src={card.icon}
                        alt=""
                        aria-hidden="true"
                        className="pointer-events-none absolute left-1/2 top-1/2 z-[1] h-20 w-20 -translate-x-1/2 -translate-y-1/2 opacity-90 lg:h-28 lg:w-28"
                      />
                    )}
                    <div className="relative z-10 flex flex-col gap-4">
                      <p className="font-header text-2xl font-semibold leading-[1.2] lg:text-[30px]">
                        {card.title}
                      </p>
                      <p className="text-sm leading-[1.2] lg:text-base">
                        {card.desc}
                      </p>
                    </div>
                    <span className="relative z-10 mt-auto font-header text-base font-semibold text-orange lg:text-[19px]">
                      Tell me more   →
                    </span>
                  </a>
                ))}
              </div>
            ) : panel.type === "bitspace" ? (
              <div className="flex flex-col gap-5 lg:flex-row lg:items-stretch">
                <div className="flex w-full flex-col gap-5 lg:max-w-[393px]  lg:shrink-0">
                  {bitspaceCards.map((card) => (
                    <a
                      key={card.title}
                      href={card.href}
                      target={
                        card.href.startsWith("http")
                          ? "_blank"
                          : undefined
                      }
                      rel={
                        card.href.startsWith("http")
                          ? "noopener noreferrer"
                          : undefined
                      }
                      className="flex h-[160px] max-h-[140px] flex-col overflow-hidden rounded-[20px] border border-black border-opacity-10 bg-white px-5 py-4 transition-opacity hover:opacity-90"
                    >
                      <div className="flex flex-col gap-2">
                        <p className="font-header text-xl font-semibold leading-[1.2] lg:text-[24px]">
                          {card.title}
                        </p>
                        <p className="text-sm leading-[1.2]">
                          {card.desc}
                        </p>
                        <span className="mt-1 font-header text-base font-semibold text-orange">
                          {card.cta}
                        </span>
                      </div>
                    </a>
                  ))}
                </div>
                <div className="relative h-[280px] w-full max-h-[456px] overflow-hidden rounded-[18px] border border-black border-opacity-10 bg-white sm:h-[360px] lg:h-[521px] lg:flex-1">
                  <img
                    src="/bitspace/collage.jpg"
                    alt="Life at Bitspace"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            ) : (
              <img
                src={panel.url}
                alt={panel.title}
                className="aspect-video w-full rounded-[20px] object-cover lg:aspect-auto lg:h-[433px]"
              />
            )}
          </div>
        </div>

        <p className="text-center text-base leading-[1.4] lg:text-[28px]">
          And, we totally understand, Bitcoin Tech can seem
          overwhelming in the start but it’s hard mostly if
          you’re trying to learn alone.
        </p>
      </div>
    </div>
  );
}

export default Carousel;
