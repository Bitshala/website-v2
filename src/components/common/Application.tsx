import React, { useState, type FormEvent } from "react";
import axios from "axios";
import Select from 'react-select';
import { Alert } from "@mui/material";


const skills = [
  { value: 'Full-stack', label: 'Full-stack' },
  { value: 'Front-end', label: 'Front-end' },
  { value: 'Back-end', label: 'Back-end' },
  { value: 'Dev ops', label: 'Dev ops' },
  { value: 'UI/UX design', label: 'UI/UX design' },
  { value: 'Prompt engineering', label: 'Prompt engineering' },
  { value: "Rust", label: "Rust" },
  { value: "Python", label: "Python" },
  { value: "C++", label: "C++" },
  { value: "Golang", label: "Golang" },
  { value: "Graphic Design", label: "Graphic Design" },
  { value: "Video Editing", label: "Video Editing" },
  { value: "Product Management", label: "Product Management" },
  { value: "Accounting", label: "Accounting" },
  { value: "Law", label: "Law" },
  { value: "Sales", label: "Sales" },
  { value: "Business Operations", label: "Business Operations" },
  { value: "Others", label: "Others" }
]

const books = [
  { value: "Mastering Bitcoin", label: "Mastering Bitcoin" },
  { value: "Mastering Lightning Network", label: "Mastering Lightning Network" },
  { value: "BPD", label: "BPD" },
  { value: "LPD", label: "LPD" },
  { value: "Learning Bitcoin through Command Line", label: "Learning Bitcoin through Command Line" },
  { value: "Programming Bitcoin", label: "Programming Bitcoin" },
  { value: "The Bitcoin Standard", label: "The Bitcoin Standard" },
  { value: "Sovereign Individual", label: "Sovereign Individual" },
  { value: "The Broken Money", label: "The Broken Money" },
  { value: "The Blocksize War", label: "The Blocksize War" },
  { value: "Others", label: "Others" }
]




const Application = (
  { cohortName }: { cohortName: string }
) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    location: "",
    describeYourself: "",
    year: "",
    background: "",
    github: "",
    time: "",
    why: "",
    skills: [{}],
    books: [{}],
    enrolled: false,
    role: cohortName
  });

  const list = [
    {
      heading: "Name/Pseudonym",
      name: "name",
      type: "text",
      value: formData.name,
    },
    {
      heading: "Email",
      name: "email",
      type: "email",
      value: formData.email,
    },
    {
      heading: "Location",
      name: "location",
      type: "text",
      value: formData.location,
    },
    {
      heading: "How would you describe yourself?",
      name: "describeYourself",
      type: "text",
      value: formData.describeYourself,
    },
    {
      heading: "Which year did you start taking Bitcoin seriously?",
      name: "year",
      type: "text",
      value: formData.year,
    },
    {
      heading: "Why is Bitcoin important to you?",
      name: "background",
      type: "text",
      value: formData.background,
    },
    {
      heading: "Portfolio/Github/Side-project link:",
      name: "github",
      type: "text",
      value: formData.github,
    },
    {
      heading: "How many hours per week are you willing to dedicate to this cohort?",
      name: "time",
      type: "text",
      value: formData.time,
    },
    {
      heading: "What do you hope to achieve through this Cohort?",
      name: "why",
      type: "text",
      value: formData.why,
    },
  ]
  const [selectedSkills, setSelectedSkills] = useState<OptionType[]>([]);
  const [selectedBooks, setSelectedBooks] = useState<OptionType[]>([]);

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): void => {
    formData.skills = selectedSkills;
    formData.books = selectedBooks;
    e.preventDefault();
    try {
      await axios.post("https://bot.bitshala.org/register", formData);
      setSubmitted(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSkills = (selected: OptionType[]) => {
    setSelectedSkills(selected);
  };

  const handleBooks = (selected: OptionType[]) => {
    setSelectedBooks(selected);
  };

  return (
    <>
      <section className="grid place-items-center my-10 ">
        <h3 className="flex h-14 cursor-pointer items-center font-bold lg:text-4xl">
          <span className="text-orange px-2">Register</span> for the cohort now!
        </h3>
        {
          submitted ? (
            <Alert severity="success">
              Your application was submitted successfully.
            </Alert>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col px-5 pt-2 gap-1 rounded-lg lg:w-1/2"
            >
              {
                list.map((item) => {
                  return (
                    <div key={item.name}>
                      <p>{item.heading}</p>
                      <input
                        className="border text-sm rounded-lg block w-full p-2.5 mb-3"
                        type={item.type}
                        name={item.name}
                        value={item.value}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  )
                })
              }
              <p>Please select list of skills</p>
              <Select isMulti options={skills} className="border rounded-lg block w-full mb-3 bg-white" name="skills" value={selectedSkills}
                onChange={handleSkills} required />

              <p>Please select books/resources that you have gone through?*</p>
              <Select isMulti options={books} className="border rounded-lg block w-full mb-3 bg-white" name="skills" value={selectedBooks}
                onChange={handleBooks} required />

              <button type="submit" className="bg-orange text-white p-2 rounded-lg my-5 hover:text-black hover:bg-peach lg:w-1/3 lg:self-center">Apply</button>

            </form>
          )
        }
      </section>
    </>
  );
};

export default Application;
