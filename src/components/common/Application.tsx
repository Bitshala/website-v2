import React, { useState, FormEvent } from "react";
import axios from "axios";

const Application: React.FC = () => {
  const [userName, setUserName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [role, setRole] = useState<string>("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    console.log("Starting");
    const userData = {
      name: userName,
      email: email,
      role: role,
    };
    console.log("userdata", userData);
    axios.post("http://13.232.129.218/register", userData).then((response) => {
      console.log(response);
    });
    console.log("done");
  };

  return (
    <>
      <section className="grid place-items-center my-10 ">
        <h3 className="flex h-14 cursor-pointer items-center font-bold lg:text-4xl">
          Found the cohort interesting? Click here to apply!
        </h3>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              name="username"
              onChange={(e) => setUserName(e.target.value)}
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label>
            Role:
            <input
              type="text"
              name="role"
              onChange={(e) => setRole(e.target.value)}
            />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </section>
    </>
  );
};

export default Application;
