import { useState } from "react";
const images = [
  "/meetup/Gallery/1.webp",
  "/meetup/Gallery/2.webp",
  "/meetup/Gallery/3.webp",
  "/meetup/Gallery/4.webp",
  "/meetup/Gallery/5.webp",
  "/meetup/Gallery/6.webp",
  "/meetup/Gallery/7.webp",
  "/meetup/Gallery/8.webp",
  "/meetup/Gallery/9.webp",
  "/meetup/Gallery/10.webp",
  "/meetup/Gallery/11.webp",
  "/meetup/Gallery/12.webp",
];

const Gallery = () => {
  const [visible, setVisible] = useState(6);
  const [disabled, setDisabled] = useState(false);

  const loadMore = () => {
    setVisible((prev) => prev + 6);
    if (visible >= images.length) {
      setDisabled(!disabled);
    }
  };

  return (
    <div>
      <div>
        <h1 className="text-5xl mt-10 mb-5 font-header">See us in action</h1>
        <p className="text-xl">
          A picture's worth a thousand words, right? Browse our previous meetups
          gallery to get a feel for what our meetups are like.
        </p>
      </div>
      <div className="grid grid-cols-3 w-full gap-3 my-10">
        {images.slice(0, visible).map((image, index) => {
          return (
            <img
              key={index}
              className="rounded-lg"
              src={image}
              alt={`Image ${index}`}
              loading="lazy"
            />
          );
        })}
      </div>
      <button
        onClick={loadMore}
        disabled={disabled}
        className={`text-center w-full underline  items-center ${
          disabled ? "hidden" : ""
        }`}
      >
        View More
      </button>
    </div>
  );
};

export default Gallery;
