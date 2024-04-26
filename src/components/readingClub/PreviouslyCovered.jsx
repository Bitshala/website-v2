const list = [
  {
    id: 1,
    url: "/readingClub/onboardingToBitcoinCore.webp",
    title: "Onboarding to Bitcoin core",
    desc:
      "In this one we delved into Bitcoin Core’s essentials with core contributors and pro bitcoin devs. This book was people’s first step into advanced Bitcoin literacy.",
    link: "https://discord.com/invite/STeQFVEWf9",
  },
  {
    id: 2,
    url: "/readingClub/devPhilosophy.webp",
    title: "Bitcoin Dev Philosophy",
    desc:
      "With this book, we joined the conversation on the foundational principles that steer Bitcoin development and drive Bitcoin’s innovation engine – as shared by the minds forging its path.",
    link: "https://discord.com/invite/STeQFVEWf9",
  },
];

const PreviouslyCovered = () => {
  return (
    <div>
      <div>
        <h1 class="mb-5 mt-10 font-header text-5xl">
          Previously Covered Books
        </h1>
        <p class="mb-10 text-xl">
          Need to catch up? Browse through the highlights and discussions from
          the books we've covered. Get the gist of past reads and stay in the
          loop with our collective learning journey.
        </p>
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          {list.map((item) => {
            return (
              <div
                key={item.id}
                class="flex flex-col justify-center rounded-3xl bg-[#fff] p-3 shadow-xl lg:p-10 lg:py-10"
              >
                <img src={item.url} class=" aspect-auto py-2" />
                <div className="">
                  <h1 class="mb-2 mt-2 font-header text-2xl">{item.title}</h1>
                  <p class="text-lg">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PreviouslyCovered;
