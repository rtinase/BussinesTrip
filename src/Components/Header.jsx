import React from "react";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  function redirectToMyTrips() {
    navigate("/mytrips");
  }

  return (
    <header>
      <nav>
        <ul>
          <li>
            <img width="150px" alt="Business Trips" src="/images/logo.png" />
          </li>
          <li>
            <button onClick={redirectToMyTrips}>My trips</button>
          </li>
        </ul>
      </nav>
    </header>
  );
}


