import React from 'react';

const Hero = () => {
  return (
    <section className="flex flex-col items-center justify-center min-h-[80vh] bg-gray-100 text-gray-800 px-4">
      <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center leading-tight">
        Welcome to Our Platform
      </h1>
      <p className="text-lg md:text-xl mb-8 text-center max-w-2xl">
        Empowering you with the tools and knowledge to succeed. Let's start your journey today.
      </p>
      <button className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full text-lg font-semibold transition duration-300">
        Get Started
      </button>
    </section>
  );
};

export default Hero;
