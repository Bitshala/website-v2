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
  role: string; // Assuming cohortName is of type string
}

const Application = (
  { cohortName, regOpen }: { cohortName: string, regOpen: boolean }
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
    role: cohortName
  });
  const [submitted, setSubmitted] = useState(false);

  const list = [
    {
      heading: "Name/Pseudonym",
      name: "name",
      type: "text",
      value: formData.name,
      isRequired: true
    },
    {
      heading: "Email",
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
      heading: "Why is Bitcoin important to you?",
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
      heading: "How many hours per week are you willing to dedicate to this cohort?",
      name: "time",
      type: "text",
      value: formData.time,
      isRequired: true
    },
    {
      heading: "What do you hope to achieve through this Cohort?",
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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.post("https://bot.bitshala.org/register", formData);
      setSubmitted(true);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {regOpen ? (
        <>
          <section className="grid place-items-center my-10 ">
            <h3 className="flex h-14 cursor-pointer items-center font-bold lg:text-4xl">
              <span className="text-orange px-2">Register</span> for the cohort now!
            </h3>
            {
              submitted ? (
                <Alert severity="success" className="my-5">
                  Your application was submitted successfully. Please keep an eye on the registered email id for further updates.
                </Alert>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col px-5 pt-2 gap-1 rounded-lg lg:w-1/2"
                >
                  {
                    list.map((item) => {
                      if (item.name === 'skills') {
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
                            <p>Please select books/resources that you have gone through?*</p>
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
                              required = {item.isRequired}
                            />
                          </div>
                        )
                      }
                    })
                  }
                  <button type="submit" className="bg-orange text-white p-2 rounded-lg my-5 hover:text-black hover:bg-peach lg:w-1/3 lg:self-center">Apply</button>
                </form>
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
