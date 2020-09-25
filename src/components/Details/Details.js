import React from "react";
import "./Details.css";
import { facilities } from "../../FakeData/Places";
import DetailsComponent from "../../components/DetailsComponent/DetailsComponent";
import { useParams } from "react-router-dom";
import { places } from "../../FakeData/Places";
import MapCompo from "../../components/Map/MapCompo";
import moment from "moment";

function Details({ user, fromDate, toDate }) {
  const id = useParams().placeId;
  const place = places[id];
  const date = moment().format("Do MMM");

  return (
    <div className="container details">
      <div className="row flex-column">
        <p className="m-0">
          <strong>{user.displayName}</strong> will stay from{" "}
          <strong>{fromDate || date}</strong> to{" "}
          <strong>{toDate || "(Not selected)"}</strong> with 3 guests
        </p>
        <h2 className="m-0">Stay in {place?.name}</h2>
      </div>

      <div className="row my-3">
        <div className="col-md-6">
          {console.log(facilities)}
          {facilities.map((facility) => (
            <DetailsComponent key={facility.id} facility={facility} />
          ))}
        </div>
        <div className="col-md-6">
          <MapCompo place={place} />
        </div>
      </div>
    </div>
  );
}

export default Details;
