import React from "react";
import download from "../images/download.jpg";

const Card = () => {
  return (
    <div className="flex m-5">
      <div>
        <div className="card w-96 bg-base-100 shadow-xl">
          <figure>
            <img src={download} alt="Trust" />
          </figure>
          <div className="card-body">
            <h2 className="card-title">Privacy</h2>
            <p>Focused on privacy</p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary">Get started</button>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="card w-96 bg-base-100 shadow-xl">
          <figure>
            <img src={download} alt="Trust" />
          </figure>
          <div className="card-body">
            <h2 className="card-title">Anonymity</h2>
            <p>Anonymously be present</p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary">Get started</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
