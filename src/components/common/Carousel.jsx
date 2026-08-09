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
    img: "/bitspace/collage.jpg",
  },
  {
    title: "Host an event with us",
    desc: "Got a bitcoin talk or workshop in mind? Use the space and the crowd to run it.",
    cta: "Tell me more   → ",
    href: "mailto:contact@bitshala.org",
    img: "/bitspace/Gallery/3.webp",
  },
  {
    title: "Co-work at Bitspace",
    desc: "A desk among Bitcoin builders and a chance to collaborate with some of the brightest minds.",
    cta: "Apply to join in   → ",
    href: "https://docs.google.com/forms/d/e/1FAIpQLScM_PzAyEKOs3QNCzX-wfvdB3stIB6yh-WoHklQU6hof9s9Rg/viewform",
    img: "/bitspace/Gallery/7.webp",
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

const linkClass =
  "w-fit font-header text-base font-semibold text-orange hover:underline";

function isExternal(href) {
  return href.startsWith("http") || href.startsWith("mailto:");
}

function ExtLink({ href, className, children }) {
  return (
    <a
      href={href}
      className={className}
      target={isExternal(href) ? "_blank" : undefined}
      rel={isExternal(href) ? "noopener noreferrer" : undefined}
    >
      {children}
    </a>
  );
}

function MobileShell({ title, cta, href, children }) {
  return (
    <div className="flex flex-col gap-5 rounded-[24px] bg-peach p-5">
      <div className="flex flex-col gap-2">
        <h2 className="font-header text-2xl font-bold leading-[1.25]">
          {title}
        </h2>
        {cta && (
          <a href={href} className={linkClass}>
            {cta}
          </a>
        )}
      </div>
      {children}
    </div>
  );
}

function ClubGrid({ cols = "grid-cols-2 lg:grid-cols-3" }) {
  return (
    <div className={`grid gap-3 ${cols} lg:gap-5`}>
      {clubCards.map((club) => (
        <ExtLink
          key={club.name}
          href={club.href}
          className="overflow-hidden rounded-[16px] transition-opacity hover:opacity-90 lg:rounded-[20px]"
        >
          <img
            src={club.img}
            alt={club.name}
            className="aspect-[16/9] w-full object-cover"
          />
        </ExtLink>
      ))}
    </div>
  );
}

function CohortGrid({ withDesc = false }) {
  return (
    <div
      className={`grid grid-cols-2 gap-3 lg:grid-cols-3 lg:gap-5 ${withDesc ? "lg:grid-cols-3" : ""}`}
    >
      {cohortCards.map((cohort) => (
        <a
          key={cohort.url}
          href={cohort.url}
          className="group flex flex-col gap-2"
        >
          <img
            src={cohort.img}
            alt={cohort.name}
            className="aspect-[16/9] w-full rounded-[16px] object-cover transition-opacity group-hover:opacity-90"
          />
          {withDesc && (
            <p className="hidden text-sm leading-[1.3] text-black lg:block lg:text-base">
              {cohort.desc}
            </p>
          )}
        </a>
      ))}
    </div>
  );
}

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

        {/* Mobile: each section is its own stacked card */}
        <div className="flex flex-col gap-5 lg:hidden">
          <MobileShell
            title="SHOW UP AT YOUR LOCAL BITCOIN MEETUP"
            cta="Tell me more   → "
            href="/meetups"
          >
            <img
              src="/home/meetup-showup.jpg"
              alt="Show up at a Bitcoin meetup"
              className="aspect-[4/3] w-full rounded-[16px] object-cover"
            />
          </MobileShell>

          <MobileShell
            title="JOIN OUR BITCOIN CLUBS"
            cta="See all clubs   → "
            href="/clubs"
          >
            <ClubGrid />
          </MobileShell>

          <MobileShell
            title="JOIN OUR STUDY COHORTS"
            cta="See all cohorts   → "
            href="/cohorts"
          >
            <CohortGrid />
          </MobileShell>

          <MobileShell
            title="JOIN OUR FELLOWSHIP PROGRAM"
            cta="More details   → "
            href="/fellowship"
          >
            <div className="flex flex-col gap-3">
              {fellowshipCards.map((card) => (
                <a
                  key={card.title}
                  href={card.href}
                  className="flex flex-col gap-3 rounded-[16px] border border-black/10 bg-white p-4"
                >
                  <div className="flex items-center gap-2">
                    <span
                      aria-hidden="true"
                      className="h-2.5 w-2.5 shrink-0 rounded-full bg-black"
                    />
                    <p className="font-header text-lg font-semibold leading-[1.2]">
                      {card.title}
                    </p>
                  </div>
                  <p className="text-sm leading-[1.35] text-black/80">
                    {card.desc}
                  </p>
                  <span className={linkClass}>Tell me more   → </span>
                </a>
              ))}
            </div>
          </MobileShell>

          <MobileShell
            title="JOIN BITCOIN CONTRIBUTORS AT BITSPACE"
            cta="Tell me more about Bitspace   → "
            href="/bitspace"
          >
            <div className="flex flex-col gap-3">
              {bitspaceCards.map((card) => (
                <ExtLink
                  key={card.title}
                  href={card.href}
                  className="flex flex-col gap-3 rounded-[16px] border border-black/10 bg-white p-4"
                >
                  <p className="font-header text-lg font-semibold leading-[1.2]">
                    {card.title}
                  </p>
                  <p className="text-sm leading-[1.35] text-black/80">
                    {card.desc}
                  </p>
                  <span className={linkClass}>{card.cta}</span>
                  <img
                    src={card.img}
                    alt={card.title}
                    className="aspect-[16/10] w-full rounded-[12px] object-cover"
                  />
                </ExtLink>
              ))}
            </div>
          </MobileShell>
        </div>

        {/* Desktop: tabbed panels */}
        <div className="hidden flex-col gap-10 lg:flex">
          <div
            role="tablist"
            aria-label="Ways to get started with Bitshala"
            className="grid grid-cols-5 gap-4"
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
                  className="relative flex"
                >
                  <button
                    type="button"
                    role="tab"
                    id={`tab-${index}`}
                    aria-selected={isActive}
                    aria-controls="tab-panel"
                    onClick={() => setActive(index)}
                    className={`relative z-10 flex min-h-[120px] w-full flex-col rounded-[20px] px-6 pb-5 pt-5 text-left transition-colors ${isDark
                      ? "bg-black text-white"
                      : "bg-peach text-black"
                      } ${isActive
                        ? "border-4 border-white shadow-[2px_4px_12px_0px_rgba(0,0,0,0.16)]"
                        : "border-4 border-transparent"
                      }`}
                  >
                    <p className="font-header text-[20px] font-bold leading-[1.1]">
                      {tab.label}
                    </p>
                    <p className="mt-4 text-base/[1.3]">
                      {tab.tagline}
                    </p>
                  </button>
                  {isActive && (
                    <img
                      src="/home/tab-pointer.svg"
                      alt=""
                      aria-hidden="true"
                      className="absolute -bottom-[29px] left-1/2 -ml-[2px] h-[45px] w-[50px] -translate-x-1/2 rotate-180"
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
            className="flex flex-col gap-7 rounded-[24px] border border-black border-opacity-10 bg-peach p-8"
          >
            <div className="flex flex-col gap-2">
              <h2 className="font-header text-[32px] font-bold leading-[1.3]">
                {panel.title}
              </h2>
              <p className="text-[24px] leading-[1.4]">
                {panel.content}
              </p>
              {panel.cta && (
                <a
                  href={panel.targetLink}
                  className={`${linkClass} text-[24px]`}
                >
                  {panel.cta}
                </a>
              )}
            </div>

            {panel.type === "clubs" ? (
              <ClubGrid cols="grid-cols-3" />
            ) : panel.type === "cohorts" ? (
              <CohortGrid withDesc />
            ) : panel.type === "fellowship" ? (
              <div className="grid grid-cols-3 gap-5">
                {fellowshipCards.map((card) => (
                  <a
                    key={card.title}
                    href={card.href}
                    className="relative flex min-h-[460px] flex-col gap-5 overflow-hidden rounded-[20px] border border-black border-opacity-10 bg-black p-6 text-white transition-opacity hover:opacity-90"
                  >
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
                    <img
                      src={card.icon}
                      alt=""
                      aria-hidden="true"
                      className="pointer-events-none absolute left-1/2 top-1/2 z-[1] h-28 w-28 -translate-x-1/2 -translate-y-1/2 opacity-90"
                    />
                    <div className="relative z-10 flex flex-col gap-4">
                      <p className="font-header text-[30px] font-semibold leading-[1.2]">
                        {card.title}
                      </p>
                      <p className="text-base leading-[1.2]">
                        {card.desc}
                      </p>
                    </div>
                    <span className="relative z-10 mt-auto font-header text-[19px] font-semibold text-orange">
                      Tell me more   →
                    </span>
                  </a>
                ))}
              </div>
            ) : panel.type === "bitspace" ? (
              <div className="flex items-stretch gap-5">
                <div className="flex w-full max-w-[393px] shrink-0 flex-col gap-5">
                  {bitspaceCards.map((card) => (
                    <ExtLink
                      key={card.title}
                      href={card.href}
                      className="flex h-[160px] max-h-[140px] flex-col overflow-hidden rounded-[20px] border border-black border-opacity-10 bg-white px-5 py-4 transition-opacity hover:opacity-90"
                    >
                      <div className="flex flex-col gap-2">
                        <p className="font-header text-[24px] font-semibold leading-[1.2]">
                          {card.title}
                        </p>
                        <p className="text-sm leading-[1.2]">
                          {card.desc}
                        </p>
                        <span className="mt-1 font-header text-base font-semibold text-orange">
                          {card.cta}
                        </span>
                      </div>
                    </ExtLink>
                  ))}
                </div>
                <div className="relative h-[521px] max-h-[456px] w-full flex-1 overflow-hidden rounded-[18px] border border-black border-opacity-10 bg-white">
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
                className="h-[433px] w-full rounded-[20px] object-cover"
              />
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

export default Carousel;
