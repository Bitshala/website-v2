import React, { useState } from "react";

const photos = [
  { id: 1, url: "/meetup/Gallery/1.webp" },
  { id: 2, url: "/meetup/Gallery/2.webp" },
  { id: 3, url: "/meetup/Gallery/3.webp" },
  { id: 4, url: "/meetup/Gallery/4.webp" },
  { id: 5, url: "/meetup/Gallery/5.webp" },
  { id: 6, url: "/meetup/Gallery/6.webp" },
  { id: 7, url: "/meetup/Gallery/7.webp" },
  { id: 8, url: "/meetup/Gallery/8.webp" },
  { id: 9, url: "/meetup/Gallery/9.webp" },
  { id: 10, url: "/meetup/Gallery/10.webp" },
  { id: 11, url: "/meetup/Gallery/11.webp" },
  { id: 12, url: "/meetup/Gallery/12.webp" },
];

const Gallery = () => {
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
        {photos.map((item) => {
          return <img className="rounded-lg" src={item.url} />;
        })}
      </div>
      <button>View More</button>
    </div>
  );
};

export default Gallery;
