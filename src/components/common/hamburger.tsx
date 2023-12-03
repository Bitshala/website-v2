import { useState } from "react";
import SlidingPane from "react-sliding-pane";
import "./sliding-pane.css";

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
        className="relative h-12 w-12 rounded-lg  bg-[#f7f7f74d] focus:outline-none"
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
        width="300px"
      >
        <SideMenu />
      </SlidingPane>
    </>
  );
};

const SideMenu = () => {
  const links = [
    { name: "Cohorts", url: "/website-v2/cohorts" },
    { name: "Review Club", url: "/website-v2/review" },
    { name: "Talks", url: "/website-v2/talks" },
    {
      name: "Join our Discord !",
      url: "https://discord.gg/ekzAUeeR",
      tar: "_blank",
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
      <div>
        <hr className="my-10 w-1/3 border-0 bg-orange outline outline-orange" />
      </div>

      <ul className="flex h-1/2 flex-col justify-between">
        {links.map((link) => {
          return (
            <a
              href={link.url}
              target={link.tar}
              className="text-2xl text-white hover:text-peach"
            >
              {link.name}
            </a>
          );
        })}
      </ul>
    </div>
  );
};

export default Hamburger;
