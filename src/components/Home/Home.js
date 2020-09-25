import React, { useState, useEffect } from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import { places } from "../../FakeData/Places";

function Home({ place, setSelectPlace }) {
  const [allPlaces, setAllPlaces] = useState(places);

  useEffect(() => {
    setSelectPlace(places[0]);
  }, []);

  useEffect(() => {
    setAllPlaces([place, ...places.filter((p) => p !== place)]);
  }, [place]);

  return (
    <div className="homepage">
   
      <div className="overlay d-flex align-items-center justify-content-center">
        <div className="container">
          <div className="row">
            <div className="col-md-5 my-auto">
              <div className="homeContent__placeDetails">
                <h1>{place?.name}</h1>
                <p className="my-3">
                  {place.details?.slice(0, 200)}
                  {place.details?.length > 200 && " ..."}
                </p>
                <Link to={`place/${place.id}`} className="booking my-3">
                  Booking <i className="fas fa-arrow-right"></i>
                </Link>
              </div>
            </div>

            <div className="col-md-7 mt-4">
              <div className="places-container">
                {allPlaces.map((p) => (
                  <Link
                    to={`place/${p.id}`}
                    onClick={() => setSelectPlace(p)}
                    className={`place-card ${p === place && "current-place"}`}
                  >
                    <img src={p.img} alt="" className="place__img" />
                    <h4 className="place__name ml-2">{p.name}</h4>
                  </Link>
                ))}
              </div>
            </div>
          </div>
          {/* <div className="navPlace row justify-content-center">
            <div className="d-flex">
              <button
                disabled={place.id === 0}
                onClick={() => setSelectPlace(places[place.id - 1])}
              >
                <i class="fas fa-chevron-circle-left fa-3x"></i>
              </button>

              <button
                disabled={place.id === 2}
                onClick={() => {
                  setSelectPlace(places[place.id + 1]);
                }}
              >
                <i class="fas fa-chevron-circle-right fa-3x"></i>
              </button>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default Home;
