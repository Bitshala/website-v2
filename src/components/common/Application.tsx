import React, { useState, type FormEvent } from "react";
import axios from "axios";
import { Alert, Autocomplete, Input, TextField } from "@mui/material";

const skills = [
  'Full-stack', 'Front-end', 'Back-end', 'Dev ops', 'UI/UX design', 'Prompt engineering', 'Rust', 'Python', 'C++', 'Golang', 'Graphic Design', 'Video Editing', 'Product Management', 'Accounting', 'Law', 'Sales', 'Business Operations', 'Others'
];

const abc: string = "Hie"
const books = [
  'Mastering Bitcoin', 'Mastering Lightning Network', 'BPD', 'LPD', 'Learning Bitcoin through Command Line', 'Programming Bitcoin', 'The Bitcoin Standard', 'Sovereign Individual', 'The Broken Money', 'The Blocksize War', 'Others'
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
}

const Application = (
  { cohortName, regOpen, role }: { cohortName: string, role: string, regOpen: boolean }
) => {
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
  });
  const [submitted, setSubmitted] = useState(false);
  const [userExistes, setUserExists] = useState(false);

  const list = [
    {
      heading: "Discord Name*",
      name: "name",
      type: "text",
      value: formData.name,
      isRequired: true
    },
    {
      heading: "Email*",
      name: "email",
      type: "email",
      value: formData.email,
      isRequired: true
    },
    {
      heading: "Location",
      name: "location",
      type: "text",
      value: formData.location,
      isRequired: false
    },
    {
      heading: "How would you describe yourself?",
      name: "describeYourself",
      type: "text",
      value: formData.describeYourself,
      isRequired: false
    },
    {
      name: 'skills'
    },
    {
      name: 'books'
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
      isRequired: true
    },
    {
      heading: "Which year did you start taking Bitcoin seriously?",
      name: "year",
      type: "text",
      value: formData.year,
      isRequired: false
    },
    {
      heading: "How many hours per week are you willing to dedicate to this cohort?*",
      name: "time",
      type: "text",
      value: formData.time,
      isRequired: true
    },
    {
      heading: "What do you hope to achieve through this Cohort?*",
      name: "why",
      type: "text",
      value: formData.why,
      isRequired: true
    },
  ];


  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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
    try {
      await axios.post("https://bot.bitshala.org/register", formData).then(
        (res) => {
          if (res.data.message === "User already present") {
            setUserExists(true);
          }
        }
      )
      setSubmitted(true);
      const focusElement = document.getElementById('focus') as HTMLInputElement
      focusElement.focus();
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <>
      {regOpen ? (
        <>
          <section className="grid place-items-center my-10 ">
            <input id="focus" className="h-0 w-0" />
            {
              submitted ? (
                <>
                  <h3 className="flex h-14 cursor-pointer items-center font-bold lg:text-4xl">
                    <span className="text-orange px-2">Successfully</span>  registered for the cohort
                  </h3>
                  {
                    userExistes ? (
                      <div className="flex items-center flex-col">
                        <h1 className="my-5 text-xl p-2 rounded-lg bg-[#ffcccc]">
                          ❌ You are already registered. Please check your email
                        </h1>
                        <a href="https://discord.gg/nXeeBHDHrt" target="_blank" className="my-5 align-middle text-xl font-bold bg-[#1c3b6a] p-3 rounded-lg text-white ">Join Bitshala Discord Now!</a>

                      </div>
                    ) : (
                      <div className="flex items-center flex-col">
                        <h1 className="my-5 text-xl p-2 rounded-lg bg-[#e6fff7]">
                          ✅ Your application was submitted successfully. Please keep an eye on the registered email id for further updates.
                        </h1>
                        <a href="https://discord.gg/nXeeBHDHrt" target="_blank" className="my-5 align-middle text-xl font-bold bg-[#1c3b6a] p-3 rounded-lg text-white ">Join Bitshala Discord Now!</a>
                      </div>
                    )

                  }
                </>
              ) : (
                <>
                  <h3 className="flex h-14 cursor-pointer items-center font-bold lg:text-4xl">
                    <span className="text-orange px-2">Register</span> for the cohort now!
                  </h3>
                  <form
                    onSubmit={handleSubmit}
                    className="flex flex-col px-5 pt-2 gap-1 rounded-lg lg:w-1/2"
                  >
                    {
                      list.map((item) => {
                        if (item.name === 'name') {
                          return (
                            <>
                              <p><span className="text-[#002bff] underline"><a href="https://discord.com/invite/STeQFVEWf9">Discord</a></span> Name*</p>
                              <Input
                                className="border font-base text-sm rounded-lg block w-full p-2.5 mb-3"
                                type={item.type}
                                name={item.name}
                                value={item.value}
                                onChange={handleChange}
                                required={item.isRequired}
                              />
                            </>
                          )
                        }
                        else if (item.name === 'skills') {
                          return (
                            <>
                              <p>Please select list of skills</p>
                              <Autocomplete
                                className="border font-base text-sm rounded-lg block w-full  mb-3"
                                multiple
                                options={skills}
                                value={formData.skills}
                                onChange={(e, value) => {
                                  setFormData(prevState => ({
                                    ...prevState,
                                    skills: value
                                  }));
                                }}
                                getOptionLabel={(option) => option}
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
                          )
                        }
                        else if (item.name === 'books') {
                          return (
                            <>
                              <p>Please select books/resources that you have gone through?</p>
                              <Autocomplete
                                className="border font-base text-sm rounded-lg block w-full mb-3"
                                multiple
                                options={books}
                                value={formData.books}
                                onChange={(e, value) => {
                                  setFormData(prevState => ({
                                    ...prevState,
                                    books: value
                                  }));
                                }}
                                getOptionLabel={(option) => option}
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
                          )
                        }
                        else {
                          return (
                            <div key={item.name}>
                              <p>{item.heading}</p>
                              <Input
                                className="border font-base text-sm rounded-lg block w-full p-2.5 mb-3"
                                type={item.type}
                                name={item.name}
                                value={item.value}
                                onChange={handleChange}
                                required={item.isRequired}
                              />
                            </div>
                          )
                        }
                      })
                    }

                    <button type="submit" className="bg-orange text-white p-2 rounded-lg my-5 hover:text-black hover:bg-peach lg:w-1/3 lg:self-center">
                      Apply
                    </button>

                  </form>
                </>

              )
            }
          </section>
        </>
      ) : (
        <div className="text-center my-10">
          <h1 className="lg:text-5xl text-3xl font-bold font-header text-orange">Registration is not open right now</h1>
          <p className="lg:text-xl my-2">Please keep an eye on the website for more updates</p>
        </div>
      )}
    </>
  );
};

export default Application;
