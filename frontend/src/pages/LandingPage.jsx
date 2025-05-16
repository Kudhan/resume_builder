import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import hero from '../assets/hero.png';

const LandingPage = () => {
  const navigate = useNavigate();
  const [openAuthmodel, setOpenAuthModel] = useState(false);
  const [currentPage, setCurrentPage] = useState("login");

  const handleCTA = () => {
    navigate('/create'); // Navigate to resume creation (or any route you want)
  };

  return (
    <div className="w-full min-h-screen bg-white pb-9">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <header className="flex justify-between items-center mb-16">
          <div className="text-2xl font-bold">Resume Builder</div>
          <button
            className="bg-purple-100 text-sm font-semibold text-black px-7 py-2.5 rounded-lg hover:bg-gray-800 hover:text-white transition-colors cursor-pointer"
            onClick={() => setOpenAuthModel(true)}
          >
            Login / Signup
          </button>
        </header>

        {/* Hero Section */}
        <div className="flex flex-col md:flex-row items-center gap-10">
          {/* Text Section */}
          <div className="w-full md:w-1/2">
            <h1 className="text-5xl font-bold mb-6 leading-tight">
              Build your{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-green-400 to-purple-500 animate-pulse">
                Resume Effortlessly
              </span>
            </h1>
            <p className="text-lg text-gray-700 mb-8">
              Craft a standout resume in minutes with our smart and intuitive resume builder.
            </p>
            <button
              className="bg-black text-sm font-semibold text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition-colors"
              onClick={handleCTA}
            >
              Get Started
            </button>
          </div>

          {/* Image Section */}
          <div className="w-full md:w-1/2">
            <img src={hero} alt="Hero" className="w-full max-w-md mx-auto rounded-lg shadow-md" />
          </div>
        </div>

        {/* Features Section */}
        <section className="mt-16">
          <h2 className="text-3xl font-bold text-center mb-12">
            Features That Make You Shine
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-md transition">
              <h3 className="text-lg font-semibold mb-3">Easy Editing</h3>
              <p className="text-gray-600">
                Update resume sections with live preview and instant feedback.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-md transition">
              <h3 className="text-lg font-semibold mb-3">
                Beautiful Templates
              </h3>
              <p className="text-gray-600">
                Choose from modern, professional templates that are easy to customize.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-md transition">
              <h3 className="text-lg font-semibold mb-3">One-Click Export</h3>
              <p className="text-gray-600">
                Download your resume instantly as a high-quality PDF with just one click.
              </p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <div className="text-sm bg-gray-50 text-gray-500 text-center p-5 mt-16 rounded-md">
          Made with ❤️ by You — Happy Coding!
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
