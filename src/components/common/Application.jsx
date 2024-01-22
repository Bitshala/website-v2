import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Card,
  Collapse,
  Input,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

const Application = ({ name }) => {
  const [open, setOpen] = useState(false);
  const toggleOpen = () => setOpen((cur) => !cur);
  return (
    <>
      <section class="grid place-items-center my-10 ">
        <label>
          <input class="peer/showLabel absolute scale-0" type="checkbox" />
          <span class="block max-h-14 overflow-hidden rounded-lg bg-orange text-white px-4 py-0 shadow-lg transition-all duration-300 peer-checked/showLabel:max-h-96">
            <h3 class="flex h-14 cursor-pointer items-center font-bold lg:text-4xl">
              Found the cohort interesting? Click here to apply!
            </h3>
            <form className="bg-white text-black p-5 mb-2 rounded-lg">
              <div class="mb-4">
                <label
                  class="block text-gray-700 text-sm font-bold mb-2"
                  for="username"
                >
                  Name/Pseudonym
                </label>
                <input
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="username"
                  type="text"
                  placeholder="Satoshi Nakamoto"
                />
              </div>
              <div class="">
                <label
                  class="block text-gray-700 text-sm font-bold mb-2"
                  for="email"
                >
                  Email
                </label>
                <input
                  class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  id="email"
                  type="email"
                  placeholder="satoshin@gmx.com"
                />
              </div>

              <div class="">
                <label
                  class="block text-gray-700 text-sm font-bold mb-2"
                  for="email"
                >
                  Cohort
                </label>
                <input
                  class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  value={name}
                  readOnly
                />
              </div>
              <div class="flex items-center justify-between">
                <button
                  class="bg-orange text-white justify-center font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="button"
                >
                  Apply
                </button>
              </div>
            </form>
          </span>
        </label>
      </section>
    </>
  );
};

export default Application;
