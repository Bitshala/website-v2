const list = [
  {
    id: 1,
    url: "/readingClub/onboardingToBitcoinCore.webp",
    title: "Onboarding to Bitcoin core",
    desc: "Explore the foundational concepts and principles of austrian economics with this interactive reading club session.",
  },
  {
    id: 2,
    url: "/readingClub/devPhilosophy.webp",
    title: "Bitcoin Dev Philosophy",
    desc: "With this book, we joined the conversation on the foundational principles that steer Bitcoin development and drive Bitcoin’s innovation engine – as shared by the minds forging its path.",
  },
  {
    id: 3,
    url: "/readingClub/image.png",
    title: "How to think about the economy",
    desc: "With this book, we joined the conversation on the foundational principles that steer Bitcoin development and drive Bitcoin’s innovation engine – as shared by the minds forging its path.",
    link: "https://discord.com/invite/STeQFVEWf9",
  },
];

const PreviouslyCovered = () => {
  return (
    <div>
      <div>
        <h1 className="mb-5 mt-10 font-header text-5xl font-bold">
          Previously Covered Books
        </h1>
        <p className="mb-10 text-xl">
          Need to catch up? Browse through the highlights
          and discussions from the books we've covered. Get
          the gist of past reads and stay in the loop with
          our collective learning journey.
        </p>
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          {list.map((item) => {
            return (
              <div
                key={item.id}
                className="flex flex-col justify-center rounded-3xl bg-[#fff] p-3 shadow-xl lg:p-10 lg:py-10"
              >
                <img
                  src={item.url}
                  className=" aspect-auto py-2"
                />
                <div className="">
                  <h1 className="mb-2 mt-2 font-header text-2xl font-bold">
                    {item.title}
                  </h1>
                  <p className="text-base">{item.desc}</p>
                </div>
                {item.link && (
                  <a
                    href={item.link}
                    target="_blank"
                    className="text-m mt-8 w-full rounded-lg p-4 text-center outline-dashed hover:bg-orange hover:text-white lg:w-1/2 lg:text-2xl"
                  >
                    Watch On Youtube
                  </a>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PreviouslyCovered;
