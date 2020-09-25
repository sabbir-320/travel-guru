import React, { useState, useEffect } from "react";
import "./Place.css";
import { places } from "../../FakeData/Places";
import { useParams, useHistory } from "react-router-dom";

function Place({ setFromDate, setToDate }) {
  const id = useParams().placeId;
  const [place, setPlace] = useState({});
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    history.push(`/details/${id}`);
  };

  useEffect(() => {
    setPlace(places[id]);
  }, []);
  return (
    <div className="placepage">
      <div className="overlay d-flex align-items-center justify-content-center">
        <div className="container">
          <div className="row">
            <div className="col-md-6 my-auto">
              <div className="about-place my-auto">
                <h1>{place.name}</h1>
                <p>{place.details}</p>
              </div>
            </div>
            <div className="col-md-6 mt-4">
              <div className="place-form">
                <form onSubmit={handleSubmit} className="form">
                  <label htmlFor="">Origin</label>
                  <input type="text" className="form-control" value="DHAKA" />

                  <label htmlFor="" className="my-3">
                    Destination
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="example-date-input"
                    value={place.name}
                  />
                  <div className="d-flex justify-content-between">
                    <div className="my-2">
                      <label htmlFor="">From</label>
                      <input
                        type="date"
                        onChange={(e) => setFromDate(e.target.value)}
                        className="form-control"
                      />
                    </div>
                    <div className="my-2 ml-3">
                      <label htmlFor="">To</label>

                      <input
                        type="date"
                        onChange={(e) => setToDate(e.target.value)}
                        className="form-control"
                      />
                    </div>
                  </div>

                  <button type="submit" className="btn-block py-2 my-3">
                    Start Booking
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Place;
