import { useState } from "react";
import SlidingPane from "react-sliding-pane";
import "./sliding-pane.css";
import {
  FaTwitter,
  FaGithub,
  FaYoutube,
  FaLinkedin,
} from "react-icons/fa";

const Hamburger = () => {
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <button
        className="relative h-12 w-12 rounded-lg  bg-[#f7f7f74d]  focus:outline-none"
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
      name: "Cohorts",
      url: "/website-v2/cohorts",
      desc: "Learn About our Study Cohorts",
    },
    {
      name: "Review Club",
      url: "/website-v2/review",
      desc: "Enjoy the Bitcoin PR Review Club",
    },
    {
      name: "Talks",
      url: "/website-v2/talks",
      desc: "Learn about Bitcoin through insightful conversations",
    },
    {
      name: "Join our Discord !",
      url: "https://discord.gg/ekzAUeeR",
      tar: "_blank",
      desc: "Join our Discord and be a part of the biggest technical bitcoin community",
    },
  ];
  return (
    <div className="flex h-full w-full flex-col pb-[10%]">
      <a href="/website-v2">
        <img
          src="/website-v2/footer/logo.png"
          className="h-16"
        />
      </a>
      <div className="flex">
        <hr className="my-10 w-1/3 border-0 bg-orange outline outline-orange" />
        <div className="my-6 hidden gap-4 px-10 lg:flex">
          <a
            href="https://twitter.com/bitshala_org"
            target="_blank"
          >
            <FaTwitter
              style={{ color: "white", fontSize: "32px" }}
            />
          </a>
          <a
            href="https://github.com/bitshala"
            target="_blank"
          >
            <FaGithub
              style={{ color: "white", fontSize: "32px" }}
            />
          </a>
          <a
            href="https://www.youtube.com/@bitshala/videos"
            target="_blank"
          >
            <FaYoutube
              style={{ color: "white", fontSize: "32px" }}
            />
          </a>

          <a
            href="https://www.linkedin.com/company/bitshala"
            target="_blank"
          >
            <FaLinkedin
              style={{ color: "white", fontSize: "32px" }}
            />
          </a>
        </div>
      </div>

      <ul className="flex h-1/2 flex-col justify-between">
        {links.map((link) => {
          return (
            <a href={link.url} target={link.tar}>
              <div className="flex ">
                <p className="flex w-80 items-center font-header text-2xl font-bold text-white hover:text-orange lg:text-4xl">
                  {link.name}
                </p>
                <p className="  mx-10 mt-1 hidden items-center justify-center text-2xl text-white  lg:flex">
                  {" "}
                  {link.desc}{" "}
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
