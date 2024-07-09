import React from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css"

export default function Header({ myTripsFromApp }) {
  const navigate = useNavigate();

  function redirectToMyTrips() {
    navigate("/my-trips", { state: { myTrips: myTripsFromApp } });
  }

  return (
      <header>
          <img width="150px" alt="Business Trips" src="/images/logo.png"/>
          <form onSubmit={redirectToMyTrips}>
              <button type="submit">My trips</button>
          </form>
      </header>
  );
}


