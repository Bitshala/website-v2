import React, { useEffect, useState } from "react";

const UpcomingEvents = () => {
  const now = new Date();
  const day = String(now.getDate()).padStart(2, "0");

  const [isDateOver, setIsDateOver] = useState(true);

  useEffect(() => {
    day > 6 ? setIsDateOver(true) : setIsDateOver(false);
  }, [day]);

  const list = [
    {
      logo: "/bitspace/nostr.webp",
      name: "Exploring NOSTR",
      date: "Saturday, 6 July",
      link: "https://lu.ma/7nth3uqi",
      isHappening: isDateOver ? false : true,
      desc: "Nostr is an unstoppable open source social network, not owned by any corporation or government. Curious? Join us and learn about how it empowers you to communicate without censorship.",
    },
  ];

  console.log(day);
  return (
    <div>
      <div className="lg:p-8">
        <h1
          className="my-8 font-header text-3xl md:text-6xl lg:text-6xl"
          id="about_us"
        >
          Upcoming Events at Bitspace
        </h1>
        <p className="text-base md:text-lg lg:text-2xl">
          Stay updated with our latest events, workshops,
          and meetups designed to enhance your Bitcoin
          knowledge and network with fellow enthusiasts.
        </p>

        <div className="grid grid-cols-1">
          {list.map((item) => (
            <div>
              {item.isHappening ? (
                <div className=" my-5 flex flex-col gap-3 rounded-xl bg-[#f0f0f0] p-2 lg:flex-row">
                  <img
                    src={item.logo}
                    className="w-96 items-center rounded-3xl border-8 border-orange lg:max-h-64  "
                  />
                  <div className=" lg:mx-5 lg:mt-2">
                    <div className="flex justify-between">
                      <p className="font-header text-xl font-bold lg:text-4xl">
                        {item.name}
                      </p>

                      <div className="flex">
                        <a
                          href={item.link}
                          target="_blank"
                          className="   rounded-lg bg-white p-2 text-center hover:bg-orange hover:text-white "
                        >
                          Tell me more!
                        </a>
                      </div>
                    </div>
                    <p className="mx-1 font-header text-sm font-thin lg:text-xl">
                      {" "}
                      {item.date}
                    </p>

                    <p className="text-sm lg:my-8 lg:text-xl">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="my-8 items-center rounded-xl border-2 border-[#f0f0f0] p-5 text-center lg:py-12">
                  <h1 className="mb-5 font-header text-3xl text-orange lg:text-5xl">
                    Currently, we’re finalizing the details
                    for the next events
                  </h1>
                  <p className="text-md lg:text-2xl">
                    So come check this page again later or
                    follow us on{" "}
                    <a
                      className="text-orange underline"
                      href="https://x.com/bitshala"
                      target="_blank"
                    >
                      twitter
                    </a>
                    &nbsp; to get updates.
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="mt-6 flex w-full justify-between gap-5 rounded-xl bg-[#f0f0f0] py-4 pl-5 pr-4">
          <div className="my-auto text-lg lg:text-3xl">
            Want to receive calendar invites for events
            automatically?
          </div>
          <div className="flex">
            <a
              href="https://calendar.google.com/calendar/u/0?cid=Y182ZGU0MmJjMzI2MzE2ZDczMGQ5ODYzMzVjNmExYjFjYzBiNWM4NWYzNWNlMjEyMWVmZmVhN2Y0ZDNkMDU5ZjAwQGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20"
              target="_blank"
              className="cursor-pointer rounded-lg bg-peach p-2 text-center text-sm hover:bg-orange hover:text-white lg:text-lg"
            >
              Yes, that’ll be great!
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpcomingEvents;
