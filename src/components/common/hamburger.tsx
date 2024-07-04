import { useState } from "react";
import SlidingPane from "react-sliding-pane";
import "./sliding-pane.css";
import { FaTwitter, FaGithub, FaYoutube, FaLinkedin } from "react-icons/fa";

const Hamburger = () => {
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(!open);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <button
        className="relative h-16 w-16 rounded-lg bg-black focus:outline-none"
        onClick={handleClick}
      >
        <span className="sr-only">Open main menu</span>
        <div className="absolute left-1/2 top-1/2 block w-5 -translate-x-1/2 -translate-y-1/2 transform">
          <span
            aria-hidden="true"
            className={`bg-current absolute block h-0.5 w-5 transform bg-white transition duration-500 ease-in-out ${
              open ? "rotate-45" : "-translate-y-1.5"
            }`}
          />
          <span
            aria-hidden="true"
            className={`bg-current absolute block h-0.5 w-5 transform bg-white transition duration-500 ease-in-out ${
              open ? "opacity-0" : ""
            }`}
          />
          <span
            aria-hidden="true"
            className={`bg-current absolute block h-0.5 w-5 transform bg-white transition duration-200 ease-in-out ${
              open ? "-rotate-45" : "translate-y-1.5"
            }`}
          />
        </div>
      </button>
      <SlidingPane
        className=" bg-black"
        onRequestClose={handleClose}
        isOpen={open}
        hideHeader
        shouldCloseOnEsc
        from="left"
      >
        <SideMenu />
      </SlidingPane>
    </>
  );
};

const SideMenu = () => {
  const links = [
    {
      name: "Home",
      url: "/",
      desc: "Back to the home page.",
    },
    {
      name: "Cohorts",
      url: "/cohorts",
      desc: "Learn Bitcoin Technicals via Self-Study Cohort Programs.",
    },
    {
      name: "Fellowship",
      url: "/fellowship",
      desc: "Bitshala's paid fellowship program.",
    },
    {
      name: "Meetups",
      url: "/meetup",
      desc: "Come, hang with us in the Meetups",
    },
    {
      name: "Reading Club",
      url: "/readingClub",
      desc: "Weekly reading club for Bitcoin learners",
    },
    {
      name: "Review Club",
      url: "/review",
      desc: "Deep-dive into Bitcoin Core via bi-weekly PR Review Clubs.",
    },
    {
      name: "Optech",
      url: "/optech",
      desc: "Bitcoin Optech Weekly Deep Dive Series",
    },
    {
      name: "Talks",
      url: "/talks",
      desc: "Learn about Bitcoin through insightful conversations",
    },
    {
      name: "Bitspace",
      url: "/bitspace",
      desc: "India’s Bitcoin-Only community hub for Bitcoin enthusiasts!",
    },
    {
      name: "Join our Discord!",
      url: "https://discord.com/invite/STeQFVEWf9",
      tar: "_blank",
      desc:
        "Join our Discord and be a part of the biggest technical bitcoin community",
    },
  ];
  return (
    <div className="flex h-full w-full flex-col pb-[10%] pt-16">
      <div className="mb-7 flex">
        <hr className="my-10 w-1/3 border-0 bg-orange outline outline-orange" />
        <div className="my-6 hidden gap-4 px-10 lg:flex">
          <a href="https://twitter.com/bitshala_org" target="_blank">
            <FaTwitter className="text-4xl text-white hover:text-[#1DA1F2]" />
          </a>
          <a href="https://github.com/bitshala" target="_blank">
            <FaGithub className="text-4xl text-white hover:rounded-full hover:bg-[black] hover:invert" />
          </a>
          <a href="https://www.youtube.com/@bitshala/videos" target="_blank">
            <FaYoutube className="text-4xl text-white hover:text-[#CD201F]" />
          </a>

          <a href="https://www.linkedin.com/company/bitshala" target="_blank">
            <FaLinkedin className="text-4xl text-white hover:text-[#0077b5]" />
          </a>
        </div>
      </div>

      <ul className="flex h-1/2 flex-col justify-between">
        {links.map((link) => {
          return (
            <a href={link.url} target={link.tar}>
              <div className="flex ">
                <p className="flex w-80 items-center font-header text-3xl font-bold text-white hover:text-orange lg:text-4xl">
                  {link.name}
                </p>
                <p className="mx-10 mt-1 hidden items-center justify-center text-xl text-peach lg:flex">
                  {link.desc}
                </p>
              </div>
            </a>
          );
        })}
      </ul>
    </div>
  );
};

export default Hamburger;
