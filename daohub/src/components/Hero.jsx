import React from "react";

const Hero = () => {
  return (
    <div>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <img
            src="https://www.simplilearn.com/ice9/free_resources_article_thumb/DAO.png"
            alt="dao"
            className="max-w-sm rounded-lg shadow-2xl"
          />
          <div>
            <h1 className="text-5xl font-bold">
              Be a part of the communities!
            </h1>
            <h2 className="text-5xl font-bold">The ultimate DAO Hub!</h2>
            <p className="py-6">
              Join, create DAO's to empower entities, whether charities,
              companies, or other organizations, dedicated to solve impactful
              causes worldwide.
            </p>
            <button className="btn btn-primary">Get Started</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
