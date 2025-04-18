import React from "react";
import Carousel from "../components/Carousel";
import Navbar from "../components/Navbar";

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="mt-6">
        <Carousel />

        <div className="max-w-4xl mx-auto mt-10 px-4 text-center">
          <h2 className="text-3xl font-bold text-blue-800 mb-4">About Delhi</h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            Delhi, the capital of India, is known for its rich history, diverse culture, and as the center of government administration. The city is a vibrant blend of tradition and modernity, hosting iconic landmarks, bustling markets, and a dynamic population. This portal enables residents to apply for official government certificates with transparency and ease.
          </p>
        </div>
      </div>
    </>
  );
};

export default Home;
