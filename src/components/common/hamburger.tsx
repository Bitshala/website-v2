import { useState } from "react";
import SlidingPane from "react-sliding-pane";
import "./sliding-pane.css";
import {
  FaTwitter,
  FaGithub,
  FaYoutube,
  FaLinkedin,
} from "react-icons/fa";
import { MdKeyboardArrowDown } from "react-icons/md";

import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";

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
  const [open, setOpen] = useState(1);

  const handleOpen = (value: number) =>
    setOpen(open === value ? 0 : value);

  const list = [
    {
      name: "Org",
      link: "/org",
      subMenu: [
        { name: "About", link: "/org/about" },
        {
          name: "Contact us ",
          link: "/bitspace/#contact_us",
        },
      ],
    },
    {
      name: "Bitcoin Career",
      link: "/#bitcoin_career",
      subMenu: [
        { name: "Study cohorts", link: "/cohorts" },
        { name: "Fellowship", link: "/fellowship" },
      ],
    },
    {
      name: "IRL Funzzz",
      link: "/#irl_funzzz",
      subMenu: [
        { name: "Bitspace", link: "/bitspace" },
        { name: "BITDEVS", link: "/meetup" },
      ],
    },
    {
      name: "Social Clubs ",
      link: "/#social_clubs",
      subMenu: [
        {
          name: "Latest in Bitcoin Tech",
          link: "/optech",
        },
        { name: "Reading Club", link: "/readingClub" },
        {
          name: "Bitcoin PR Review Club",
          link: "/review",
        },
        {
          name: "Hands-on Lightning",
          link: "/hands-on-lightning",
        },
        { name: "Bitcoin Talks", link: "/talks" },
      ],
    },
    // {
    //   name: "Join our community",
    //   link: "/#join_our_community",
    // },
  ];

  return (
    <div className="flex h-full w-full flex-col pb-[10%] pt-16">
      <div className="mb-7 flex">
        <hr className="my-10 w-1/3 border-0 bg-orange outline outline-orange" />
        <div className="my-6 hidden gap-4 px-10 lg:flex">
          <a
            href="https://twitter.com/bitshala_org"
            target="_blank"
          >
            <FaTwitter className="text-4xl text-white hover:text-[#1DA1F2]" />
          </a>
          <a
            href="https://github.com/bitshala"
            target="_blank"
          >
            <FaGithub className="text-4xl text-white hover:rounded-full hover:bg-[black] hover:invert" />
          </a>
          <a
            href="https://www.youtube.com/@bitshala/videos"
            target="_blank"
          >
            <FaYoutube className="text-4xl text-white hover:text-[#CD201F]" />
          </a>

          <a
            href="https://www.linkedin.com/company/bitshala"
            target="_blank"
          >
            <FaLinkedin className="text-4xl text-white hover:text-[#0077b5]" />
          </a>
        </div>
      </div>

      {list.map((item, index) => {
        return (
          <Accordion key={index} open={open === index + 1}>
            <AccordionHeader
              className="font-header text-2xl text-white "
              onClick={() => handleOpen(index + 1)}
            >
              {item.name}
              <MdKeyboardArrowDown className="-ml-5" />
            </AccordionHeader>
            <AccordionBody>
              {item.subMenu.map((subItem) => {
                return (
                  <div
                    className="ml-2 font-header text-lg text-white"
                    key={subItem.name}
                  >
                    <a href={subItem.link}>
                      - {subItem.name}
                    </a>
                  </div>
                );
              })}
            </AccordionBody>
          </Accordion>
        );
      })}
      {/* <p className="font-header text-2xl text-white">
        <a href="https://discord.com/invite/STeQFVEWf9">
          Join Discord
        </a>
      </p> */}
    </div>
  );
};

export default Hamburger;
