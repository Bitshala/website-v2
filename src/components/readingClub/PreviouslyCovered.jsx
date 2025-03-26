const books = [
  {
    url: "/readingClub/1.png",
    title: "How To Think About The Economy",
    formattedTitle: "How To Think About The Economy",
    desc: "A brilliant and beginner-friendly book on Austrian economics",
    link: "https://www.youtube.com/playlist?list=PLdHBT9oS8yMUPtwNtV5wg7sapTvv8UFbP",
  },
  {
    url: "/readingClub/2.png",
    title: "Gradually, Then Suddenly",
    formattedTitle: "Gradually,\nThen Suddenly",
    desc: "An amazing and renowned resource for understanding Bitcoin as money",
    link: "https://www.youtube.com/playlist?list=PLdHBT9oS8yMWLc59cCo7uZDC4_9zYtxqx",
  },
  {
    url: "/readingClub/3.png",
    title: "Bitcoin Development Philosophy",
    formattedTitle: "Bitcoin Development\nPhilosophy",
    desc: "An amazing and renowned resource for understanding Bitcoin as money",
    link: "https://discord.com/invite/STeQFVEWf9",
  },
  {
    url: "/readingClub/4.png",
    title: "Bitcoin: The Inverse of Clown World",
    formattedTitle: "Bitcoin: The Inverse of\n Clown World",
    desc: "Unravelling the clownery with bitcoiners in a world plagued by economic and political absurdities",
    link: "https://www.youtube.com/playlist?list=PLdHBT9oS8yMXlHzNbyShAdHtI6dfFNlTu",
  },
];

const PreviouslyCovered = () => {
  return (
    <div>
      <div>
        <h1 className="mb-5 mt-10 font-header text-3xl font-bold lg:text-6xl">
          Previously Covered Books
        </h1>
        <p className="mb-10 text-xl">
          Need to catch up? Browse through the highlights
          and discussions from the books we've covered. Get
          the gist of past reads and stay in the loop with
          our collective learning journey.
        </p>
        <div className="mt-10 flex flex-col gap-4 p-5 md:grid md:grid-cols-2 lg:my-[72px] lg:grid lg:grid-cols-3 lg:gap-7 lg:p-0">
          {books.map((book) => (
            <div className="lg: rounded-3xl bg-peach px-3 pb-3 pt-5 lg:px-5 lg:pb-5 lg:pt-8">
              <h1 className="mb-3 whitespace-pre-line px-3 font-header text-2xl font-medium lg:text-3xl">
                {book.formattedTitle || book.title}
              </h1>
              <p className="font-regular mb-3 px-3 text-base lg:text-base ">
                {book.desc}
              </p>
              <a
                href={book.link}
                target="_blank"
                className="px-3 font-header text-orange hover:underline"
              >
                Check out the recordings →
              </a>

              <img
                src={book.url}
                className="mt-[20px] rounded-2xl "
                alt=""
              />
              <a href={book.targetLink}></a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PreviouslyCovered;
