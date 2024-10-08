import React, { useState } from "react";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const data = {
    Email: email,
  };
  const handleClick = async () => {
    await fetch(
      "https://sheet.best/api/sheets/689179b9-ecd8-43ff-bb0d-0450a951a8d3",
      {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      },
    );
    setSubmitted(true);
  };
  return (
    <div className="my-10 flex flex-col items-center justify-center rounded-xl bg-[#fff] p-10 shadow-lg">
      <p className="my-5 font-header text-2xl font-bold lg:text-5xl">
        Subscribe to our Newsletter to stay up to date
      </p>
      {submitted ? (
        <p className="text-xl lg:text-2xl">
          You have successfully subscribed to the
          Newsletter.
        </p>
      ) : (
        <>
          <input
            type="email"
            placeholder="satoshin@gmx.com"
            className="my-2 w-full rounded-lg border-2 border-black py-3 lg:w-1/2 lg:px-5"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button
            onClick={handleClick}
            className="text-m mt-2 rounded-lg border-2 border-dashed bg-white p-4 text-center font-bold hover:bg-orange hover:text-white lg:w-1/3 lg:text-2xl"
          >
            Subscribe
          </button>
        </>
      )}
    </div>
  );
};

export default Newsletter;
