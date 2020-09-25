import React from "react";
import "./DetailsComponent.style.css";

function DetailsComponent({ facility }) {
  return (
    <div className="facility d-flex justify-content-center align-items-center my-5 row">
      <div className="col-6">
        <img src={facility?.img} alt="" className="facility__img" />
      </div>
      <div className="col-6">
        <div className="ml-2">
          <h6>{facility?.name}</h6>
          <div>
            <p> 4 guests 2 bedrooms 2 beds 2 baths </p>
            <p>With Air conditioning Kitchen</p>
            <p>Cancellation fexibility available</p>
          </div>
          <div className="d-flex justify-content-between">
            <p>
              <strong>⭐ {facility?.rating}</strong>{" "}
            </p>
            <p>
              {" "}
              <strong> ${facility?.price}/per night </strong>{" "}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailsComponent;
