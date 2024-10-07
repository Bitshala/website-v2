import { useState } from "react";
const images = [
  "/bitdev/Gallery/1.webp",
  "/bitdev/Gallery/2.webp",
  "/bitdev/Gallery/3.webp",
  "/bitdev/Gallery/4.webp",
  "/bitdev/Gallery/5.webp",
  "/bitdev/Gallery/6.webp",
  "/bitdev/Gallery/7.webp",
  "/bitdev/Gallery/8.webp",
  "/bitdev/Gallery/9.webp",
  "/bitdev/Gallery/10.webp",
  "/bitdev/Gallery/11.webp",
  "/bitdev/Gallery/12.webp",
  "/bitspace/Gallery/1.webp",
  "/bitspace/Gallery/2.webp",
  "/bitspace/Gallery/3.webp",
  "/bitspace/Gallery/4.webp",
  "/bitspace/Gallery/5.webp",
  "/bitspace/Gallery/6.webp",
  "/bitspace/Gallery/7.webp",
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
        <h1 className="mb-5 mt-10 font-header text-5xl font-bold">
          See us in action
        </h1>
        <p className="text-xl">
          A picture's worth a thousand words, right? Browse
          our previous meetups gallery to get a feel for
          what our meetups are like.
        </p>
      </div>
      <div className="my-10 grid w-full grid-cols-2 gap-3 md:grid-cols-3">
        {images.slice(0, visible).map((image, index) => {
          return (
            <img
              key={index}
              className="h-24 w-full rounded-lg md:h-44 lg:h-64"
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
        className={`w-full items-center text-center  underline ${
          disabled ? "hidden" : ""
        }`}
      >
        View More
      </button>
    </div>
  );
};

export default Gallery;
