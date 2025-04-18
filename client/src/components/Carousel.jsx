import React, { useState, useEffect } from "react";

const images = [
  "https://t4.ftcdn.net/jpg/03/73/94/77/360_F_373947702_DAoeoh2kMzmz9BSVA4pqRpxBUvCkQrSU.jpg",
  "https://corpseed-main.s3.ap-south-1.amazonaws.com/corpseed/Delhi_Caste_Certificate_corpseed.png",
];

const Carousel = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full max-w-6xl mx-auto overflow-hidden rounded-xl shadow-md">
      <img
        src={images[current]}
        alt="Carousel Slide"
        className="w-full h-[400px] object-cover transition-all duration-1000"
      />

      <div className="absolute top-1/2 left-0 transform -translate-y-1/2 px-4">
        <button
          onClick={() => setCurrent((current - 1 + images.length) % images.length)}
          className="bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
        >
          ❮
        </button>
      </div>
      <div className="absolute top-1/2 right-0 transform -translate-y-1/2 px-4">
        <button
          onClick={() => setCurrent((current + 1) % images.length)}
          className="bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
        >
          ❯
        </button>
      </div>
    </div>
  );
};

export default Carousel;
