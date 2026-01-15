import React from "react";
import { Switch, Route } from "react-router-dom";
import LandingPage from "./pages/landingPage";
import Calendar from "./pages/calendar";
import Gallery from "./pages/gallery";
import Contact from "./pages/contact";
import Login from "./pages/login";
import VillaDetails from "./pages/villaDetails";
import ScrollToTop from "./components/ScrollToTop";

export default function Routes() {
  return (
    <>
      <ScrollToTop />
      <Switch>
        <Route exact path="/" render={() => <LandingPage />} />
        <Route exact path="/gallery" render={() => <Gallery />} />
        <Route exact path="/calendar" render={() => <Calendar />} />
        <Route exact path="/contact" render={() => <Contact />} />
        <Route exact path="/login" render={() => <Login />} />
        <Route exact path="/details" render={() => <VillaDetails />} />
      </Switch>
    </>
  );
}
