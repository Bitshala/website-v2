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
        className="relative m-3 h-10 w-10 rounded-lg border-2 border-white bg-black focus:outline-none"
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
      subMenu: [
        { name: "About", link: "/about" },
        {
          name: "Contact us ",
          link: "/bitspace/#contact_us",
        },
      ],
    },
    {
      name: "BOSS",
      link: "/boss",
      subMenu: [],
    },
    {
      name: "Bitcoin Career",
      subMenu: [
        { name: "Study cohorts", link: "/cohorts" },
        { name: "Bitcoin Clubs", link: "/clubs" },
        { name: "Fellowship", link: "/fellowship" },
        { name: "Chaincode BOSS", link: "/chaincodeboss" },
      ],
    },
    {
      name: "IRL Funzzz",
      subMenu: [
        { name: "Bitspace", link: "/bitspace" },
        { name: "BITDEVS", link: "/bitdev" },
      ],
    },
    {
      name: "Social Clubs ",
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
        { name: "Bitcoin Talks", link: "/talks" },
      ],
    },
  ];

  return (
    <div className="flex h-full w-full flex-col pb-[10%] pt-16">
      {list.map((item, index) => {
        return (
          // @ts-ignore
          <Accordion
            key={index}
            open={open === index + 1}
            placeholder={"test"}
          >
            {/* @ts-ignore */}
            <AccordionHeader
              className="font-header text-2xl text-white "
              onClick={() => handleOpen(index + 1)}
              placeholder={"check"}
            >
              <a
                href={item.link}
                target="_blank"
                className="flex w-full items-center justify-between"
              >
                {item.name}
                {item.subMenu.length > 0 && (
                  <MdKeyboardArrowDown className="-ml-5" />
                )}
              </a>
            </AccordionHeader>
            <AccordionBody>
              {item.subMenu.map((subItem) => {
                return (
                  <div
                    className="ml-2 font-header text-base text-white"
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
    </div>
  );
};

export default Hamburger;
