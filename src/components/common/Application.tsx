import React, { useState, type FormEvent } from "react";
import axios from "axios";
import Select from 'react-select';

const Application = ( 
  {cohortName}: {cohortName: string}
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
    books : [{}],
    enrolled: false,
    role:cohortName
  });

  const [selectedSkills, setSelectedSkills] = useState<OptionType[]>([]);
  const [selectedBooks, setSelectedBooks] = useState<OptionType[]>([]);

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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    formData.skills = selectedSkills;
    formData.books = selectedBooks;
    e.preventDefault();
    console.log("userdata", formData);
    axios.post("https://bot.bitshala.org/register", formData);
    console.log("done");
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

        <form
          onSubmit={handleSubmit}
          className="flex flex-col px-5 pt-2 gap-1 rounded-lg lg:w-1/2"
        >
          <p>Name/Pseudonym*</p>
          <input
            className="border text-sm rounded-lg block w-full p-2.5 mb-3"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <p>Email*</p>
          <input
            className="border text-sm rounded-lg block w-full p-2.5 mb-3"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <p>Location*</p>
          <input
            className="border text-sm rounded-lg block w-full p-2.5 mb-3"
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          />
          <p>How would you describe yourself?</p>
          <input
            className="border text-sm rounded-lg block w-full p-2.5 mb-3"
            type="text"
            name="describeYourself"
            value={formData.describeYourself}
            onChange={handleChange}
            required
          />
          <p>Which year did you start taking Bitcoin seriously?*</p>
          <input
            className="border text-sm rounded-lg block w-full p-2.5 mb-3"
            type="text"
            name="year"
            value={formData.year}
            onChange={handleChange}
            required
          />
          <p>Please select list of skills</p>
          <Select isMulti options={skills} className="border rounded-lg block w-full mb-3 bg-white" name="skills" value={selectedSkills}
            onChange={handleSkills} required />

          <p>Please select books/resources that you have gone through?*</p>
          <Select isMulti options={books} className="border rounded-lg block w-full mb-3 bg-white" name="skills" value={selectedBooks}
            onChange={handleBooks} required/>

          <p>Why is Bitcoin important to you?*</p>
          <input
            className="border text-sm rounded-lg block w-full p-2.5 mb-3"
            type="text"
            name="background"
            value={formData.background}
            onChange={handleChange}
            required
          />
          <p>Portfolio/Github/Side-project link:</p>
          <input
            className="border text-sm rounded-lg block w-full p-2.5 mb-3"
            type="text"
            name="github"
            value={formData.github}
            onChange={handleChange}
            required
          />
          <p>How many hours per week are you willing to dedicate to this cohort?</p>
          <input
            className="border text-sm rounded-lg block w-full p-2.5 mb-3"
            type="text"
            name="time"
            value={formData.time}
            onChange={handleChange}
            required
          />
          <p>What do you hope to achieve through this Cohort?</p>
          <textarea
            className="border text-sm rounded-lg block w-full p-2.5 mb-3"
            name="why"
            value={formData.why}
            onChange={handleChange}
          />
          <button type="submit" className="bg-orange text-white p-2 rounded-lg my-5 hover:text-black hover:bg-peach lg:w-1/3 lg:self-center">Apply</button>
        </form>
      </section>
    </>
  );
};

export default Application;
