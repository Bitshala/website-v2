import Collapse from "@mui/material/Collapse";
import { useState } from "react";
const defaultConfig = [
  {
    q: "How does the Bitcoin Study Cohort work?",
    a: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ",
  },
  {
    q: "Who can join the Bitcoin Study Cohort?",
    a: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ",
  },
  {
    q: "Is there a fee to join the cohort?",
    a: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ",
  },
  {
    q: "What resources are provided to participants?",
    a: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ",
  },
  {
    q: "Is there a fee to join the cohort?",
    a: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ",
  },
  {
    q: "What resources are provided to participants?",
    a: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ",
  },
];

export const Faq = () => {
  const [activeIndex, setActiveIndex] = useState(-1);
  const handleQuestionClick = (index: number) => {
    if (activeIndex == index) {
      setActiveIndex(-1);
    } else {
      setActiveIndex(index);
    }
  };
  return (
    <>
      <div className="mb-12 mt-6 text-5xl font-bold">
        Checkout some of the FAQs
      </div>
      <hr className="mb-8 border-spacing-12 border-dashed" />
      <ul>
        {defaultConfig.map((faq, index) => {
          return (
            <li key={faq.q} className="text-2xl">
              <button
                className="flex w-full items-center justify-between p-4"
                onClick={() => handleQuestionClick(index)}
              >
                {faq.q}
                <div
                  className={` hidden text-3xl transition-transform lg:block ${
                    activeIndex == index ? `rotate-45` : ``
                  }`}
                >
                  +
                </div>
              </button>
              <Collapse
                in={activeIndex == index}
                timeout="auto"
                unmountOnExit
              >
                <div className="flex justify-between p-4">
                  {faq.a}
                </div>
              </Collapse>
              <hr className="my-8 border-spacing-12 border-dashed" />
            </li>
          );
        })}
      </ul>
    </>
  );
};
