import React, { useState, type FormEvent } from "react";
import axios from "axios";

const Application: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    location: "",
    year: "",
    background: "",
    time: "",
    why: "",
    // readMB: "",
    // work: "",
    // role: "",
    // expectation: "",
    // bitcoinCrypto: "",
    enrolled: false,
  });

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
    e.preventDefault();
    console.log("Starting");
    console.log("userdata", formData);
    // axios.post("http://13.232.129.218/register", formData).then((response) => {
    //   console.log(response);
    // });
    console.log("done");
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
          <p>Which year did you start taking Bitcoin seriously?*</p>
          <input
            className="border text-sm rounded-lg block w-full p-2.5 mb-3"
            type="text"
            name="year"
            value={formData.year}
            onChange={handleChange}
            required
          />
          <p>Skills</p>
          <select className="border text-sm rounded-lg block w-full p-2.5 mb-3 bg-white">
            <option className="bg-white" value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
          <p>Portfolio/Github/Side-project link:</p>
          <input
            className="border text-sm rounded-lg block w-full p-2.5 mb-3"
            type="text"
            name="background"
            value={formData.background}
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
