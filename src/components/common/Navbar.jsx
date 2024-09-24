import React from "react";
import Hamburger from "./hamburger";

const Navbar = () => {
  const list = [
    {
      name: "Org ⇩",
      link: "/org",
      subMenu: [
        { name: "About", link: "/org/about" },
        {
          name: "Contact us",
          link: "/bitspace/#contact_us",
        },
      ],
    },
    {
      name: "Bitcoin Career ⇩",
      link: "/#bitcoin_career",
      subMenu: [
        { name: "Study cohorts", link: "/cohorts" },
        { name: "Fellowship", link: "/fellowship" },
      ],
    },
    {
      name: "IRL Funzzz ⇩",
      link: "/#irl_funzzz",
      subMenu: [
        { name: "Bitspace", link: "/bitspace" },
        { name: "BITDEVS", link: "/bitdevs" },
      ],
    },
    {
      name: "Social Clubs ⇩",
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
    <div>
      <nav class="fixed left-0 top-0 z-50 w-full bg-black  p-4 backdrop-blur-sm ">
        <div class="m-auto flex w-full justify-between">
          <a href="/">
            <img
              src="/home/logo.png"
              class="ml-12 h-14  justify-start"
            />
          </a>
          <div className="flex justify-end">
            {list.map((item) => (
              <div class="group relative hidden lg:block">
                <button class=" mt-2 flex w-full flex-row items-center rounded-lg px-4 py-4 text-left text-base font-bold uppercase focus:outline-none md:ml-4 md:mt-0 md:inline md:w-auto">
                  <span className="font-header text-white">
                    {item.name}
                  </span>
                </button>
                <div class=" absolute z-10 hidden group-hover:block">
                  <div class="bg-gray-200  px-2 pb-4 pt-2 shadow-lg">
                    <div class="grid min-w-max grid-cols-1">
                      {item.subMenu &&
                        item.subMenu.map(
                          ({ name, link }) => (
                            <div class="flex flex-col bg-black bg-opacity-90 p-2 ">
                              <a
                                href={link}
                                class="block rounded-lg p-2 text-white  hover:text-orange"
                              >
                                <p class="font-header text-xl font-bold">
                                  {name}
                                </p>
                              </a>
                            </div>
                          ),
                        )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <a
              href=""
              class=" text hidden justify-center rounded-2xl bg-white text-center align-middle font-bold text-black hover:bg-orange hover:text-white lg:flex"
            >
              Join Our Community
            </a>
            <div className="sm:block lg:hidden">
              <Hamburger client:only />
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
