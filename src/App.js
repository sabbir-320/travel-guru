import React, { useState} from "react";
import "./App.css";
import { auth } from "./firebase/Config";

import { HashRouter as Router, Route } from "react-router-dom";
import { AnimatedSwitch } from "react-router-transition";
import Home from "./components/Home/Home";
import SignUp from "./components/SignUp/SignUp";
import Place from "./components/Place/Place";
import Details from "./components/Details/Details";
import Header from "./components/Header/Header";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";

function App() {
  const [user, setUser] = useState({});
  const [selectPlace, setSelectPlace] = useState({});

  const [fromDate, setFromDate] = useState();
  const [toDate, setToDate] = useState();

  return (
    <Router>
      <Header setUser={setUser} />
      <AnimatedSwitch
        atEnter={{ opacity: 0 }}
        atLeave={{ opacity: 0 }}
        atActive={{ opacity: 1 }}
        className="switch-wrapper"
      >
        <Route exact path="/">
          <Home place={selectPlace} setSelectPlace={setSelectPlace} />
        </Route>
        <Route path="/login">
          <SignUp user={user} setUser={setUser} />
        </Route>
        <Route path="/place/:placeId">
          <Place setFromDate={setFromDate} setToDate={setToDate} />
        </Route>
        <PrivateRoute user={user} path="/details/:placeId">
          <Details user={user} fromDate={fromDate} toDate={toDate} />
        </PrivateRoute>
      </AnimatedSwitch>
    </Router>
  );
}

export default App;
