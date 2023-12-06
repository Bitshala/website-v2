import { useState } from "react";

export type CarouselConfigType = {
  img: string;
  title: string;
  content: string;
}[];

const defaultConfig = [
  {
    img: "/website-v2/activities/cohort.png",
    title: "Bitcoin Study Cohorts",
    content:
      "You, with fellow learners collectively explore selected texts over several weeks in a structured self-study format. You gain hands-on experience and in-depth insights into Bitcoin’s technical aspects. And also receive certificates to celebrate your wins!",
  },
  {
    img: "/website-v2/activities/cohort.png",
    title: "Bitcoin Deep Dive",
    content:
      "Here, for you, we decode the technical intricacies of the Bitcoin protocol layer. Deep Dive is a recorded series for you to explore specific technical topics around Bitcoin. Be ready to geek out during your self-study sessions.",
  },
  {
    img: "/website-v2/activities/cohort.png",
    title: "Bitcoin Talk",
    content:
      "You get to listen to insightful conversations with experienced Bitcoin developers as they share their journeys, provide valuable advice, and offer suggestions for newcomers in the exciting world of Bitcoin development.",
  },
  {
    img: "/website-v2/activities/cohort.png",
    title: "Bitcoin Core Review Club",
    content:
      "You get hand-on experience into the inner workings of Bitcoin Core and understand how experienced contributors review PRs. You’ll also develop a deeper understanding of Bitcoin’s design principles while sharpening your adversarial-thinking skills.",
  },
  {
    img: "/website-v2/activities/cohort.png",
    title: "Discord Community",
    content:
      "Come and become a part of our vibrant community of Bitcoin enthusiasts. Here, you can engage in discussions, challenge ideas, and explore Bitcoin opportunities with like-minded peers passionate about shaping the future of decentralized finance.",
  },
];
const Carousel = ({
  config = defaultConfig,
}: {
  config?: CarouselConfigType;
}) => {
  const [page, setPage] = useState(4);
  return (
    <div className=" mt-4 w-full rounded-lg bg-orange p-10">
      <h1 className="mb-2 font-header text-xl lg:p-11 lg:text-8xl">
        {config[page].title}
      </h1>
      <div className="lg:flex">
        <img
          src={config[page].img}
          loading="lazy"
          alt={config[page].title}
        />
        <div className="m-2 flex flex-col justify-between lg:p-10 lg:text-2xl">
          <div>{config[page].content}</div>
          <button className="mt-5 w-1/2 p-2 outline">
            Tell Me More!
          </button>
        </div>
      </div>
      <div className="m-auto mt-7 flex justify-between lg:w-1/3">
        {config.map((page, index) => {
          return (
            <button
              key={page.title}
              className="h-3 w-3 rounded-full outline hover:bg-white"
              onClick={() => setPage(index)}
              aria-label={page.title}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Carousel;
