import React from "react";
import { Link } from "react-router-dom";
import linoImage from "../assets/lino.png";


const Home = () => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center gap-10 px-6 py-16 bg-orange-50">
      

      <div className="w-full md:w-1/2 flex justify-center">
        <img
          src={linoImage}
          alt="Doubt illustration"
          className="w-full  object-cover rounded-xl shadow-xl"
        />
      </div>

     
      <div className="w-full md:w-1/2  text-center md:text-left">
        <h1 className="text-3xl md:text-5xl font-light text-zinc-900 mb-6">
          Welcome to <br />
          <span className="text-orange-600 mb-6 font-semibold text-4xl md:text-6xl">
            DoubtTracker
          </span>
        </h1>
        <p className="text-md text-zinc-700 mb-8 mx-auto md:mx-0">
          A smart platform where students raise coding doubts and mentors reply
          with clarity. Track, manage, and resolve questions — all in one place.
        </p>

   
        <div className="flex flex-col md:flex-row gap-4 justify-center md:justify-start">
          <Link
            to="/auth/mentor-login"
            className="bg-orange-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-white hover:text-orange-500 hover:border-2 hover:border-orange-500 hover:scale-95 transition duration-200"
          >
            Mentor Login
          </Link>
          <Link
            to="/auth/student-login"
            className="border-2 border-orange-500 text-orange-500 px-6 py-3 rounded-lg font-medium hover:bg-orange-500 hover:text-white hover:scale-95 transition duration-200"
          >
            Student Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
