import { useState } from "react";

const config = [
  {
    img: "/website-v2/learnWithUs/1.png",
  },
  {
    img: "/website-v2/learnWithUs/2.png",
  },
  {
    img: "/website-v2/learnWithUs/3.png",
  },
];

const Carousel = () => {
  const [page, setPage] = useState(2);
  return (
    <div className="flex flex-col items-center xl:mt-96">
      <div className="mx-5 my-12 lg:p-20 lg:text-7xl">
        <span className="font-bold">Learn</span> with us
        through other{" "}
        <span className="font-bold">mediums</span>
      </div>
      <div className="flex-col justify-center rounded-lg">
        <div className="lg:flex">
          <img src={config[page].img} className="w-fit" />
        </div>
        <div className="m-auto mt-7 flex justify-between lg:w-1/3">
          {config.map((page, index) => {
            return (
              <button
                className="h-3 w-3 rounded-full outline hover:bg-white"
                onClick={() => setPage(index)}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
