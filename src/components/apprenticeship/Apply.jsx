import {
  Autocomplete,
  Input,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import axios from "axios";

const employmentStatusOptions = [
  "Student",
  "Employed",
  "Unemployed",
];

const educationOptions = [
  "Graduate (Tech)",
  "Graduate (Non-Tech)",
  "Dropped Out",
  "Still in School",
];

const areaOfInterestOptions = [
  "Backend Development",
  "Frontend Development",
  "Full-stack Development",
  "Design",
  "Research and Documentation",
];

const fullTimeInterestOptions = ["Yes", "No"];

const Apply = () => {
  const [selectedTab, setSelectedTab] =
    useState("devProjects");
  const [submitted, setSubmitted] = useState(false);
  const [inputs, setInputs] = useState([""]);

  const [devFormData, setDevFormData] = useState({
    name: "",
    github: "",
    linkedIn: "",
    contributions: [],
    project: "",
    whyPassionate: "",
    employmentStatus: [],
    education: [],
    lookingForFullTime: [],
    interest: [],
    technical: "",
    hours: "",
    achieve: "",
  });

  const [eduFormData, setEduFormData] = useState({
    name: "",
    program: "",
    duration: "",
    impact: "",
    operationalSupport: "",
    status: "",
    employmentStatus: [],
    education: [],
    lookingForFullTime: [],
    interest: [],
    teachingExperience: "",
    communityEngagement: "",
    achieve: "",
  });

  const devQuestion = [
    {
      heading: "Name / pseudonym*",
      inputType: "text",
      name: "name",
      value: devFormData.name,
      isRequired: true,
    },
    {
      heading: "Github Profile*",
      inputType: "text",
      name: "github",
      value: devFormData.github,
      isRequired: true,
    },
    {
      heading: "LinkedIn Profile",
      inputType: "text",
      name: "linkedIn",
      value: devFormData.linkedIn,
      isRequired: false,
    },
    {
      heading:
        "List at least 3 merged contributions (provide links)*",
      inputType: "text",
      name: "contributions",
      value: devFormData.contributions,
      isRequired: true,
    },
    {
      heading:
        "What project do you wish to contribute to?*",
      inputType: "text",
      name: "project",
      value: devFormData.project,
      isRequired: true,
    },
    {
      heading:
        "Why are you passionate about the project? (Please provide a detailed response)*",
      inputType: "textarea",
      name: "whyPassionate",
      value: devFormData.whyPassionate,
      isRequired: true,
    },
    {
      heading: "What is your employment status?*",
      inputType: "text",
      name: "employmentStatus",
      value: devFormData.employmentStatus,
      isRequired: true,
    },
    {
      heading: "What is your educational background?*",
      inputType: "text",
      name: "education",
      value: devFormData.education,
      isRequired: true,
    },
    {
      heading:
        "Are you looking for a full-time role in Bitcoin FOSS (Free and Open Source Software)?*",
      inputType: "text",
      name: "lookingForFullTime",
      value: devFormData.lookingForFullTime,
      isRequired: true,
    },
    {
      heading:
        "What is your area of interest? (Select all that apply)*",
      inputType: "text",
      name: "interest",
      value: devFormData.interest,
      isRequired: true,
    },
    {
      heading:
        "Please describe your technical skills and any relevant experience you have in the areas you've selected above",
      inputType: "textarea",
      name: "technical",
      value: devFormData.technical,
      isRequired: true,
    },
    {
      heading:
        "How many hours per week can you dedicate to the fellowship?",
      inputType: "text",
      name: "hours",
      value: devFormData.hours,
      isRequired: true,
    },
    {
      heading:
        "What do you hope to achieve during this fellowship? (Please provide a detailed response)",
      inputType: "textarea",
      name: "achieve",
      value: devFormData.achieve,
      isRequired: false,
    },
  ];

  const educationQuestion = [
    {
      heading: "Name / pseudonym*",
      name: "name",
      type: "text",
      value: eduFormData.name,
      isRequired: true,
    },
    {
      heading:
        "Describe your program: (Please provide a detailed description of the program you wish to run)*",
      name: "program",
      type: "text",
      value: eduFormData.program,
      isRequired: true,
    },
    {
      heading:
        "How long will the program run? (Please specify the duration in weeks/months)*",
      name: "duration",
      type: "text",
      value: eduFormData.duration,
      isRequired: true,
    },
    {
      heading:
        "Why do you believe this program will be impactful? (Please provide a detailed explanation)*",
      name: "impact",
      type: "text",
      value: eduFormData.impact,
      isRequired: true,
    },
    {
      heading:
        "Do you need any special operational support from Bitshala to run the program? (Please specify any requirements)*",
      name: "operationalSupport",
      type: "text",
      value: eduFormData.operationalSupport,
      isRequired: true,
    },
    {
      heading: "What is your employment status?*",
      inputType: "text",
      name: "employmentStatus",
      value: devFormData.employmentStatus,
      isRequired: true,
    },
    {
      heading: "What is your educational background?*",
      name: "education",
      type: "text",
      value: eduFormData.education,
      isRequired: true,
    },
    {
      heading:
        "Are you looking for a full-time role in Bitcoin FOSS (Free and Open Source Software)?*",
      name: "lookingForFullTime",
      type: "text",
      value: eduFormData.lookingForFullTime,
      isRequired: true,
    },
    {
      heading:
        "What is your area of interest? (Select all that apply)*",
      name: "interest",
      type: "text",
      value: eduFormData.interest,
      isRequired: true,
    },
    {
      heading:
        "Please describe your teaching experience and any relevant skills in curriculum development*",
      name: "teachingExperience",
      type: "text",
      value: eduFormData.teachingExperience,
      isRequired: false,
    },
    {
      heading:
        "How do you plan to engage the community with your program? (Please provide any strategies you have)",
      name: "communityEngagement",
      type: "text",
      value: eduFormData.communityEngagement,
      isRequired: false,
    },
    {
      heading:
        "What do you hope to achieve during this fellowship? (Please provide a detailed response)",
      name: "achieve",
      type: "textarea",
      value: eduFormData.achieve,
      isRequired: false,
    },
  ];

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  const handleDevChange = (e) => {
    const { name, value } = e.target;
    setDevFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleEduChange = (e) => {
    const { name, value } = e.target;
    setEduFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddInput = (e) => {
    e.preventDefault();
    if (inputs.length < 10) {
      setInputs([...inputs, ""]);
    }
  };

  const handleRemoveInput = (index) => {
    index.preventDefault();
    const values = [...inputs];
    if (values.length > 1) {
      values.splice(index, 1);
      setInputs(values);
    }
  };

  const handleContriChange = (index, event) => {
    const values = [...inputs];
    values[index] = event.target.value;
    setInputs(values);

    setDevFormData((prevState) => ({
      ...prevState,
      contributions: values,
    }));
  };

  const handleDevSubmit = async (e) => {
    e.preventDefault();
    let data = devFormData;
    data.employmentStatus = devFormData.employmentStatus.toString();
    data.interest = devFormData.interest.toString();
    data.lookingForFullTime = devFormData.lookingForFullTime.toString();
    data.education = devFormData.education.toString();
    data.contributions = devFormData.contributions.toString();
    try {
      await axios.post("https://bot.bitshala.org/devform", data).then(
        (res) => {
          console.log(res);
        }
      )
      setSubmitted(true);
      const focusElement = document.getElementById("focus");
      focusElement.focus();
    } catch (error) {
      console.log(error);
    }
  };

  const handleEduSubmit = async (e) => {
    e.preventDefault();
    let eduData = eduFormData;
    eduData.lookingForFullTime = eduFormData.lookingForFullTime.toString();
    eduData.employmentStatus = eduFormData.employmentStatus.toString();
    eduData.education = eduFormData.education.toString();
    try {
      await axios.post("https://bot.bitshala.org/eduform", eduFormData).then(
        (res) => {
          console.log(res);
        }
      )
      setSubmitted(true);
      const focusElement = document.getElementById("focus");
      focusElement.focus();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {submitted ? (
        <div className="flex items-center justify-center">
          <h3 className=" text-center font-header text-3xl font-bold lg:text-7xl">
            <span className="px-2 text-orange">
              Successfully
            </span>{" "}
            registered for the Fellowship
          </h3>
        </div>
      ) : (
        <div>
          <input id="focus" className="h-0 w-0" />
          <div className="flex items-center justify-center">
            <h1 className=" text-center font-header text-3xl font-bold lg:text-7xl">
              <span className="text-orange">
                Apply&nbsp;
              </span>
              to become a Bitshala Fellow!
            </h1>
          </div>
          <div>
            <div className="m-1 mt-4 flex w-full justify-center rounded-xl border-2 border-[#E5E5E5] text-2xl">
              <button
                className={`w-1/2 rounded-lg px-4 py-2 ${
                  selectedTab === "devProjects"
                    ? "bg-peach text-black"
                    : ""
                }`}
                onClick={() =>
                  handleTabClick("devProjects")
                }
              >
                Apply for dev projects
              </button>
              <button
                className={`w-1/2 rounded-lg px-4 py-2 ${
                  selectedTab === "educationProgram"
                    ? "bg-peach text-black"
                    : ""
                }`}
                onClick={() =>
                  handleTabClick("educationProgram")
                }
              >
                Apply for education program
              </button>
            </div>

            <div className="mt-8 w-full justify-center">
              {selectedTab === "devProjects" && (
                <form
                  onSubmit={handleDevSubmit}
                  className="flex flex-col text-lg font-medium"
                >
                  {devQuestion.map((question, index) => {
                    if (
                      question.name === "employmentStatus"
                    ) {
                      return (
                        <div key={index}>
                          <div className="max-md:max-w-full">
                            {question.heading}
                          </div>
                          <Select
                            required
                            className="mb-3 block w-full rounded-lg border font-base  text-sm"
                            value={
                              devFormData.employmentStatus
                                ? devFormData
                                    .employmentStatus[0]
                                : ""
                            }
                            onChange={(event) => {
                              setDevFormData({
                                ...devFormData,
                                employmentStatus: [
                                  event.target.value,
                                ],
                              });
                            }}
                          >
                            {employmentStatusOptions.map(
                              (option, index) => (
                                <MenuItem
                                  key={index}
                                  value={option}
                                >
                                  {option}
                                </MenuItem>
                              ),
                            )}
                          </Select>
                        </div>
                      );
                    } else if (
                      question.name === "contributions"
                    ) {
                      return (
                        <div>
                          <div className="max-md:max-w-full">
                            {question.heading}
                          </div>
                          <div className="flex">
                            <div className="flex w-full flex-col items-center p-4">
                              {inputs.map(
                                (input, index) => (
                                  <Input
                                    key={index}
                                    value={input}
                                    onChange={(event) =>
                                      handleContriChange(
                                        index,
                                        event,
                                      )
                                    }
                                    className="-ml-8 mb-2 block w-full rounded-lg border p-2.5 font-base text-sm"
                                  />
                                ),
                              )}
                            </div>
                            <div className="flex">
                              <button
                                onClick={handleAddInput}
                                className="m-1 rounded-full border-2 p-5 text-black"
                              >
                                +
                              </button>
                              <button
                                onClick={handleRemoveInput}
                                className="m-1 rounded-full border-2 p-5 text-black"
                              >
                                -
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    } else if (
                      question.name === "education"
                    ) {
                      return (
                        <div key={index}>
                          <div className="max-md:max-w-full">
                            {question.heading}
                          </div>
                          <Select
                            required
                            className="mb-3 block w-full rounded-lg border font-base  text-sm"
                            value={
                              devFormData.education
                                ? devFormData.education[0]
                                : ""
                            }
                            onChange={(event) => {
                              setDevFormData({
                                ...devFormData,
                                education: [
                                  event.target.value,
                                ],
                              });
                            }}
                          >
                            {educationOptions.map(
                              (option, index) => (
                                <MenuItem
                                  key={index}
                                  value={option}
                                >
                                  {option}
                                </MenuItem>
                              ),
                            )}
                          </Select>
                        </div>
                      );
                    } else if (
                      question.name === "lookingForFullTime"
                    ) {
                      return (
                        <div key={index}>
                          <div className="max-md:max-w-full">
                            {question.heading}
                          </div>
                          <Select
                            required
                            className="mb-3 block w-full rounded-lg border font-base  text-sm"
                            value={
                              devFormData.lookingForFullTime
                                ? devFormData
                                    .lookingForFullTime[0]
                                : ""
                            }
                            onChange={(event) => {
                              setDevFormData({
                                ...devFormData,
                                lookingForFullTime: [
                                  event.target.value,
                                ],
                              });
                            }}
                          >
                            {fullTimeInterestOptions.map(
                              (option, index) => (
                                <MenuItem
                                  key={index}
                                  value={option}
                                >
                                  {option}
                                </MenuItem>
                              ),
                            )}
                          </Select>
                        </div>
                      );
                    } else if (
                      question.name === "interest"
                    ) {
                      return (
                        <div key={index}>
                          <div className="max-md:max-w-full">
                            {question.heading}
                          </div>
                          <Autocomplete
                            required
                            multiple
                            className="mb-3 block w-full rounded-lg border font-base  text-sm"
                            options={areaOfInterestOptions}
                            value={
                              devFormData.interest || []
                            }
                            onChange={(event, newValue) => {
                              setDevFormData({
                                ...devFormData,
                                interest: newValue,
                              });
                            }}
                            getOptionLabel={(option) =>
                              option
                            }
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                variant="outlined"
                                label="Interests"
                              />
                            )}
                          />
                        </div>
                      );
                    } else {
                      return (
                        <div
                          key={index}
                          className="mt-2 flex flex-col"
                        >
                          <div className="max-md:max-w-full">
                            {question.heading}
                          </div>
                          <Input
                            className="mb-3 block w-full rounded-lg border p-2.5 font-base text-sm"
                            type={question.type}
                            name={question.name}
                            value={question.value}
                            onChange={handleDevChange}
                            required={question.isRequired}
                          />
                        </div>
                      );
                    }
                  })}
                  <div className="flex justify-center">
                    <button
                      onSubmit={handleDevSubmit}
                      className="w-24 justify-center rounded-lg bg-orange p-5 text-center text-white"
                    >
                      Apply
                    </button>
                  </div>
                </form>
              )}

              {selectedTab === "educationProgram" && (
                <form
                  onSubmit={handleEduSubmit}
                  className="flex flex-col text-lg font-medium"
                >
                  {educationQuestion.map(
                    (question, index) => {
                      if (
                        question.name ===
                        "lookingForFullTime"
                      ) {
                        return (
                          <div key={index}>
                            <div className="max-md:max-w-full">
                              {question.heading}
                            </div>
                            <Select
                              required
                              className="mb-3 block w-full rounded-lg border font-base  text-sm"
                              value={
                                eduFormData.lookingForFullTime
                                  ? eduFormData
                                      .lookingForFullTime[0]
                                  : ""
                              }
                              onChange={(event) => {
                                setEduFormData({
                                  ...eduFormData,
                                  lookingForFullTime: [
                                    event.target.value,
                                  ],
                                });
                              }}
                            >
                              {fullTimeInterestOptions.map(
                                (option, index) => (
                                  <MenuItem
                                    key={index}
                                    value={option}
                                  >
                                    {option}
                                  </MenuItem>
                                ),
                              )}
                            </Select>
                          </div>
                        );
                      } else if (
                        question.name === "interest"
                      ) {
                        return (
                          <div key={index}>
                            <div className="max-md:max-w-full">
                              {question.heading}
                            </div>
                            <Autocomplete
                              required
                              multiple
                              className="mb-3 block w-full rounded-lg border font-base  text-sm"
                              options={
                                areaOfInterestOptions
                              }
                              value={
                                eduFormData.interest || []
                              }
                              onChange={(
                                event,
                                newValue,
                              ) => {
                                setEduFormData({
                                  ...eduFormData,
                                  interest: newValue,
                                });
                              }}
                              getOptionLabel={(option) =>
                                option
                              }
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  variant="outlined"
                                  label="Interests"
                                />
                              )}
                            />
                          </div>
                        );
                      } else if (
                        question.name === "education"
                      ) {
                        return (
                          <div key={index}>
                            <div className="max-md:max-w-full">
                              {question.heading}
                            </div>
                            <Select
                              required
                              className="mb-3 block w-full rounded-lg border font-base  text-sm"
                              value={
                                eduFormData.education[0] ||
                                ""
                              }
                              onChange={(event) => {
                                setEduFormData({
                                  ...eduFormData,
                                  education: [
                                    event.target.value,
                                  ],
                                });
                              }}
                            >
                              {educationOptions.map(
                                (option, index) => (
                                  <MenuItem
                                    key={index}
                                    value={option}
                                  >
                                    {option}
                                  </MenuItem>
                                ),
                              )}
                            </Select>
                          </div>
                        );
                      } else if (
                        question.name === "employmentStatus"
                      ) {
                        return (
                          <div key={index}>
                            <div className="max-md:max-w-full">
                              {question.heading}
                            </div>
                            <Select
                              required
                              className="mb-3 block w-full rounded-lg border font-base  text-sm"
                              value={
                                eduFormData.employmentStatus
                                  ? eduFormData
                                      .employmentStatus[0]
                                  : ""
                              }
                              onChange={(event) => {
                                setEduFormData({
                                  ...eduFormData,
                                  employmentStatus: [
                                    event.target.value,
                                  ],
                                });
                              }}
                            >
                              {employmentStatusOptions.map(
                                (option, index) => (
                                  <MenuItem
                                    key={index}
                                    value={option}
                                  >
                                    {option}
                                  </MenuItem>
                                ),
                              )}
                            </Select>
                          </div>
                        );
                      } else {
                        return (
                          <div
                            key={index}
                            className="mt-2 flex flex-col"
                          >
                            <div className="max-md:max-w-full">
                              {question.heading}
                            </div>
                            <Input
                              className="mb-3 block w-full rounded-lg border p-2.5 font-base text-sm"
                              type={question.type}
                              name={question.name}
                              value={question.value}
                              onChange={handleEduChange}
                              required={question.isRequired}
                            />
                          </div>
                        );
                      }
                    },
                  )}
                  <div className="flex justify-center">
                    <button
                      onSubmit={handleEduSubmit}
                      className="w-24 justify-center rounded-lg bg-orange p-5 text-center text-white"
                    >
                      Apply
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Apply;
