import React, { useState, type FormEvent } from "react";
import axios, { AxiosError } from "axios";
import {
  Alert,
  Autocomplete,
  Input,
  TextField,
} from "@mui/material";

const skills = [
  "Full-stack",
  "Front-end",
  "Back-end",
  "Dev ops",
  "UI/UX design",
  "Prompt engineering",
  "Rust",
  "Python",
  "C++",
  "Golang",
  "Graphic Design",
  "Video Editing",
  "Product Management",
  "Accounting",
  "Law",
  "Sales",
  "Business Operations",
  "Others",
];

const abc: string = "Hie";
const books = [
  "Mastering Bitcoin",
  "Mastering Lightning Network",
  "BPD",
  "LPD",
  "Learning Bitcoin through Command Line",
  "Programming Bitcoin",
  "The Bitcoin Standard",
  "Sovereign Individual",
  "The Broken Money",
  "The Blocksize War",
  "Others",
];

interface FormData {
  name: string;
  email: string;
  location: string;
  describeYourself: string;
  year: string;
  background: string;
  github: string;
  time: string;
  why: string;
  skills: string[];
  books: string[];
  enrolled: boolean;
  role: string;
  cohortName: string;
  hearFrom: string;
}

interface ErrorResponse {
  error?: string;
  [key: string]: any;
}

const Application = ({
  cohortName,
  regOpen,
  role,
}: {
  cohortName: string;
  role: string;
  regOpen: boolean;
}) => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    location: "",
    describeYourself: "",
    year: "",
    background: "",
    github: "",
    time: "",
    why: "",
    skills: [],
    books: [],
    enrolled: false,
    role: role,
    cohortName: cohortName,
    hearFrom: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [userExists, setUserExists] = useState(false);
  const [loading, setLoading] = useState(false);
  const [test, setTest] = useState("");

  const list = [
    {
      heading: "Discord Name*",
      name: "name",
      type: "text",
      value: formData.name,
      isRequired: true,
    },
    {
      heading: "Email*",
      name: "email",
      type: "email",
      value: formData.email,
      isRequired: true,
    },
    {
      heading: "Location",
      name: "location",
      type: "text",
      value: formData.location,
      isRequired: false,
    },
    {
      heading: "How would you describe yourself?",
      name: "describeYourself",
      type: "text",
      value: formData.describeYourself,
      isRequired: false,
    },
    {
      name: "skills",
    },
    {
      name: "books",
    },
    {
      heading: "Portfolio/Github/Side-project link:",
      name: "github",
      type: "text",
      value: formData.github,
    },
    {
      heading: "Why is Bitcoin important to you?*",
      name: "background",
      type: "text",
      value: formData.background,
      isRequired: true,
    },
    {
      heading:
        "Which year did you start taking Bitcoin seriously?",
      name: "year",
      type: "text",
      value: formData.year,
      isRequired: false,
    },
    {
      heading:
        "How many hours per week are you willing to dedicate to this cohort?*",
      name: "time",
      type: "text",
      value: formData.time,
      isRequired: true,
    },
    {
      heading:
        "What do you hope to achieve through this Cohort?*",
      name: "why",
      type: "text",
      value: formData.why,
      isRequired: true,
    },
    {
      heading: "Where did you hear about us?*",
      name: "hearFrom",
      type: "text",
      value: formData.hearFrom,
      isRequired: true,
    },
  ];

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // function openLink() {
  //   const newWindow = window.open("https://discord.gg/nXeeBHDHrt", '_blank', 'noopener,noreferrer,width=800, height=600');
  //   if (newWindow) {
  //     newWindow.opener = null;
  //   }
  //   window.focus();
  // }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  
  if (test === "") {
    setLoading(true);
    try {
      const res = await axios.post("https://admin.bitshala.org/register", formData);
      
      // Check for success response
      console.log("Success response:", res.data);
      setSubmitted(true);
      const focusElement = document.getElementById("focus") as HTMLInputElement;
      focusElement.focus();
      
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      console.log("Error response:", axiosError.response?.data);
      if (axiosError.response?.status === 500) {
        const responseData = axiosError.response.data;
        const errorMessage = responseData?.error || responseData;
        
        if (errorMessage && errorMessage.includes("UNIQUE constraint failed: participants.email")) {
          console.log("User already exists");
          setUserExists(true);
          setSubmitted(true);
        }
      }
    } finally {
      setLoading(false);
    }
  } else {
    console.log("error");
    window.location.reload();
  }
};

  return (
    <>
      {regOpen ? (
        <>
          <section className="my-10 grid place-items-center ">
            <input id="focus" className="h-0 w-0" />
            {submitted ? (
              <>
                <h3 className="flex h-14 cursor-pointer items-center font-bold lg:text-4xl">
                  <span className="px-2 text-orange">
                    Successfully
                  </span>
                  registered for the cohort
                </h3>
                {userExists ? (
                  <div className="flex flex-col items-center">
                    <h1 className="my-5 rounded-lg bg-[#ffcccc] p-2 text-xl">
                      ❌ You are already registered. Please
                      check your email
                    </h1>
                    <a
                      href="https://discord.gg/nXeeBHDHrt"
                      target="_blank"
                      className="my-5 rounded-lg bg-[#1c3b6a] p-3 align-middle text-xl font-bold text-white "
                    >
                      Join Bitshala Discord Now!
                    </a>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <h1 className="my-5 rounded-lg bg-[#e6fff7] p-2 text-xl">
                      ✅ Your application was submitted
                      successfully. Please keep an eye on
                      the registered email id for further
                      updates.
                    </h1>
                    <a
                      href="https://discord.gg/nXeeBHDHrt"
                      target="_blank"
                      className="my-5 rounded-lg bg-[#1c3b6a] p-3 align-middle text-xl font-bold text-white "
                    >
                      Join Bitshala Discord Now!
                    </a>
                  </div>
                )}
              </>
            ) : (
              <>
                <h3 className="flex h-14 cursor-pointer items-center text-2xl font-bold lg:text-4xl">
                  <span className="px-2 text-orange">
                    Register
                  </span>
                  for the cohort now!
                </h3>
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-1 rounded-lg px-5 pt-2 lg:w-full"
                >
                  {list.map((item) => {
                    if (item.name === "name") {
                      return (
                        <>
                          <p>
                            <span className="text-[#002bff] underline">
                              <a href="https://discord.com/invite/STeQFVEWf9">
                                Discord
                              </a>
                            </span>
                            &nbsp; Name*
                          </p>
                          <Input
                            className="mb-3 block w-full rounded-lg border p-2.5 font-base text-sm"
                            type={item.type}
                            name={item.name}
                            value={item.value}
                            onChange={handleChange}
                            required={item.isRequired}
                          />
                        </>
                      );
                    } else if (item.name === "skills") {
                      return (
                        <>
                          <p className="text-lg">
                            Please select list of skills
                          </p>
                          <Autocomplete
                            className="mb-3 block w-full rounded-lg border font-base  text-sm"
                            multiple
                            options={skills}
                            value={formData.skills}
                            onChange={(e, value) => {
                              setFormData((prevState) => ({
                                ...prevState,
                                skills: value,
                              }));
                            }}
                            getOptionLabel={(option) =>
                              option
                            }
                            disableCloseOnSelect
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                variant="outlined"
                                label="Select Skills"
                                placeholder="Select Skills"
                              />
                            )}
                          />
                        </>
                      );
                    } else if (item.name === "books") {
                      return (
                        <>
                          <p className="text-lg">
                            Please select books/resources
                            that you have gone through?
                          </p>
                          <Autocomplete
                            className="mb-3 block w-full rounded-lg border font-base text-sm"
                            multiple
                            options={books}
                            value={formData.books}
                            onChange={(e, value) => {
                              setFormData((prevState) => ({
                                ...prevState,
                                books: value,
                              }));
                            }}
                            getOptionLabel={(option) =>
                              option
                            }
                            disableCloseOnSelect
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                variant="outlined"
                                label="Select Books/Resources"
                                placeholder="Select Books/Resources"
                              />
                            )}
                          />
                        </>
                      );
                    } else {
                      return (
                        <div key={item.name}>
                          <p className="text-lg ">
                            {item.heading}
                          </p>
                          <Input
                            className="mb-3 block w-full rounded-lg border p-2.5 font-base text-sm"
                            type={item.type}
                            name={item.name}
                            value={item.value}
                            onChange={handleChange}
                            required={item.isRequired}
                          />
                        </div>
                      );
                    }
                  })}
                  <input
                    className="hidden"
                    type="text"
                    onChange={(e) =>
                      setTest(e.target.value)
                    }
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="my-5 rounded-lg bg-black p-2 py-4 font-bold text-white hover:bg-orange hover:text-black disabled:bg-gray-400 disabled:cursor-not-allowed lg:w-full lg:self-center"
                  >
                    {loading ? "Submitting..." : "Submit Application"}
                  </button>
                </form>
              </>
            )}
          </section>
        </>
      ) : (
        <div className="my-10 items-center justify-center text-center">
          <h1 className="font-header text-3xl font-bold  text-orange lg:text-5xl">
            Registration is not open right now
          </h1>
          <p className="my-2 lg:text-xl">
            Please keep an eye on the website for more
            updates
          </p>
        </div>
      )}
    </>
  );
};

export default Application;
