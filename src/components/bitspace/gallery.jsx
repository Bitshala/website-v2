import { useState } from "react";
const images = [
  '/bitspace/Gallery/1.webp',
  '/bitspace/Gallery/2.webp',
  '/bitspace/Gallery/3.webp',
  '/bitspace/Gallery/4.webp',
  '/bitspace/Gallery/5.webp',
  '/bitspace/Gallery/6.webp',
  '/bitspace/Gallery/7.webp',
  '/bitspace/Gallery/8.webp',
  '/bitspace/Gallery/9.webp',
  
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
      <div className="grid grid-cols-2 md:grid-cols-3 w-full gap-3 my-10">
        {images.slice(0, visible).map((image, index) => {
          return (
            <img
              key={index}
              className="rounded-lg h-24 md:h-44 lg:h-64 w-full"
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
