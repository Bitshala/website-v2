import React from "react";
import Hamburger from "./hamburger";

const Navbar = () => {
  const list = [
    { name: "Org ↓ ", link: "https://bitshala.org" },
    { name: "Bitcoin Career ↓", link: "/#bitcoin_career" },
    {
      name: "Real Life Funzzz ↓",
      link: "/#real_life_funzzz",
    },
    { name: "Social Clubs ↓", link: "/#social_clubs" },
    {
      name: "Join our community ↓",
      link: "/#join_our_community",
    },
  ];

  return (
    <div>
      <nav class="fixed left-0 top-0 z-50 w-full bg-black  p-4 backdrop-blur-sm ">
        <div class="m-auto flex w-full justify-between">
          <a href="/">
            <img
              src="/footer/logo.png"
              class="h-16 justify-start"
            />
          </a>
          <div className="flex justify-end">
            {list.map(({ name, link }) => (
              <a key={name} href={link}>
                <div class="group relative">
                  <button class=" mt-2 flex w-full flex-row items-center rounded-lg px-4 py-4 text-left text-base font-bold uppercase focus:outline-none md:ml-4 md:mt-0 md:inline md:w-auto">
                    <span className="font-header text-white">
                      {name}
                    </span>
                  </button>
                  <div class="bg-grey-200 absolute z-10 hidden group-hover:block">
                    <div class="bg-gray-200 bg-white px-2 pb-4 pt-2 shadow-lg">
                      <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <p>dropdown content here</p>
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            ))}
            <Hamburger client:only />
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
