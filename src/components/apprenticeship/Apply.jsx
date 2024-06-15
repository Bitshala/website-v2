import React, { useState } from "react";

const questions = [
  {
    label: "Name / Pseudonym*",
    inputType: "text",
  },
  {
    label:
      "Describe your program: (Please provide a detailed description of the program you wish to run)*",
    inputType: "text",
  },
  {
    label:
      "How long will the program run? (Please specify the duration in weeks/months)*",
    inputType: "text",
  },
  {
    label:
      "Why do you believe this program will be impactful? (Please provide a detailed explanation)*",
    inputType: "textarea",
  },
  {
    label:
      "Do you need any special operational support from Bitshala to run the program? (Please specify any requirements)*",
    inputType: "textarea",
  },
  {
    label: "What is your employment status?*",
    inputType: "text",
  },
  {
    label: "What is your educational background?*",
    inputType: "text",
  },
  {
    label:
      "Are you looking for a full-time role in Bitcoin FOSS (Free and Open Source Software)?*",
    inputType: "text",
  },
  {
    label:
      "What is your area of interest? (Select all that apply)*",
    inputType: "text",
  },
  {
    label:
      "Please describe your teaching experience and any relevant skills in curriculum development*",
    inputType: "textarea",
  },
  {
    label:
      "How do you plan to engage the community with your program? (Please provide any strategies you have)",
    inputType: "textarea",
  },
  {
    label:
      "What do you hope to achieve during this fellowship? (Please provide a detailed response)",
    inputType: "textarea",
  },
];

const questions1 = [
  {
    label: "Name / Pseudonym*",
    inputType: "text",
  },
  {
    label: "Github Profile*",
    inputType: "text",
  },
  {
    label: "LinkedIn Profile",
    inputType: "text",
  },
  {
    label:
      "List at least 3 merged contributions (provide links)*",
    inputType: "text",
  },
  {
    label: "What project do you wish to contribute to?*",
    inputType: "text",
  },
  {
    label:
      "Why are you passionate about the project? (Please provide a detailed response)*",
    inputType: "textarea",
  },
  {
    label: "What is your employment status?*",
    inputType: "text",
  },
  {
    label: "What is your educational background?*",
    inputType: "text",
  },
  {
    label:
      "Are you looking for a full-time role in Bitcoin FOSS (Free and Open Source Software)?*",
    inputType: "text",
  },
  {
    label:
      "What is your area of interest? (Select all that apply)*",
    inputType: "text",
  },
  {
    label:
      "Please describe your technical skills and any relevant experience you have in the areas you've selected above",
    inputType: "textarea",
  },
  {
    label:
      "How many hours per week can you dedicate to the fellowship?",
    inputType: "text",
  },
  {
    label:
      "What do you hope to achieve during this fellowship? (Please provide a detailed response)",
    inputType: "textarea",
  },
];

const Apply = () => {
  const [selectedTab, setSelectedTab] =
    useState("devProjects");

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  return (
    <div>
      <div className="flex justify-center font-header text-3xl text-black lg:text-7xl">
        <span className="text-orange">Apply</span> to become
        a Bitshala Fellow!
      </div>
      <div className="mt-4 flex w-full justify-center rounded-xl border-2 border-[#E5E5E5] text-2xl">
        <button
          className={`w-1/2 rounded-lg px-4 py-2 ${
            selectedTab === "devProjects"
              ? "bg-peach text-black"
              : ""
          }`}
          onClick={() => handleTabClick("devProjects")}
        >
          Apply for dev projects
        </button>
        <button
          className={`w-1/2 rounded-lg px-4 py-2 ${
            selectedTab === "educationProgram"
              ? "bg-peach text-black"
              : ""
          }`}
          onClick={() => handleTabClick("educationProgram")}
        >
          Apply for education program
        </button>
      </div>

      <div className="mx-2 mt-8 w-full justify-center">
        {selectedTab === "devProjects" && (
          <div>
            <div className="flex flex-col text-lg font-medium">
              {questions1.map((question, index) => (
                <div
                  key={index}
                  className="mt-2 flex flex-col"
                >
                  <div className="max-md:max-w-full">
                    {question.label}
                  </div>
                  {question.inputType === "text" ? (
                    <input className="border-stone-300 mt-4 min-h-[52px] w-full rounded-xl border border-solid px-5 max-md:max-w-full" />
                  ) : (
                    <textarea className="border-stone-300 mt-4 min-h-[52px] w-full rounded-xl border border-solid px-5 max-md:max-w-full" />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {selectedTab === "educationProgram" && (
          <div className="flex flex-col text-lg font-medium">
            {questions.map((question, index) => (
              <div
                key={index}
                className="mt-2 flex flex-col"
              >
                <div className="max-md:max-w-full">
                  {question.label}
                </div>
                {question.inputType === "text" ? (
                  <input className="border-stone-300 mt-4 min-h-[52px] w-full rounded-xl border border-solid px-5 max-md:max-w-full" />
                ) : (
                  <textarea className="border-stone-300 mt-4 min-h-[52px] w-full rounded-xl border border-solid px-5 max-md:max-w-full" />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Apply;
