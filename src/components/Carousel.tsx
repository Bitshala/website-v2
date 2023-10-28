import { useState } from "react";

const config = [
  {
    img: "/website-v2/activities/cohort.png",
    title: "Bitcoin Study Cohorts",
    content:
      "You, with fellow learners collectively explore selected texts over several weeks in a structured self-study format. You gain hands-on experience and in-depth insights into Bitcoin’s technical aspects. And also receive certificates to celebrate your wins!",
  },
    {
    img: "/website-v2/activities/cohort.png",
    title: "Bitcoin Deep Dive",
    content:"Here, for you, we decode the technical intricacies of the Bitcoin protocol layer. Deep Dive is a recorded series for you to explore specific technical topics around Bitcoin. Be ready to geek out during your self-study sessions."  },
    {
    img: "/website-v2/activities/cohort.png",
    title: "Bitcoin Talk",
    content:"You get to listen to insightful conversations with experienced Bitcoin developers as they share their journeys, provide valuable advice, and offer suggestions for newcomers in the exciting world of Bitcoin development."  },
    {
    img: "/website-v2/activities/cohort.png",
    title: "Bitcoin Core Review Club",
    content:"You get hand-on experience into the inner workings of Bitcoin Core and understand how experienced contributors review PRs. You’ll also develop a deeper understanding of Bitcoin’s design principles while sharpening your adversarial-thinking skills."  },
    {
    img: "/website-v2/activities/cohort.png",
    title: "Discord Community",
    content:"Come and become a part of our vibrant community of Bitcoin enthusiasts. Here, you can engage in discussions, challenge ideas, and explore Bitcoin opportunities with like-minded peers passionate about shaping the future of decentralized finance."  },
];

const Carousel = () => {
  const [page, setPage] = useState(4);
  return (
    <div className=" mt-4 w-full rounded-lg bg-orange p-10">
      <h1 className="text-xl lg:p-11 lg:text-8xl font-header mb-2">{config[page].title}</h1>
      <div className="lg:flex">
        <img src={config[page].img} />
        <div className="m-2 lg:p-10 lg:text-2xl flex flex-col justify-between"><div >{config[page].content}</div><button className="mt-5 outline p-2 w-1/2">Tell Me More!</button></div>
      </div>
      <div className="flex justify-between lg:w-1/3 m-auto mt-7">{config.map((page,index)=>{
        return(<button key={page.title} className="hover:bg-white outline w-3 h-3 rounded-full" onClick={()=>setPage(index)}/>)
       })}</div>
    </div>
  );
};

export default Carousel;
