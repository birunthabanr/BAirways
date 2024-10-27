import React from "react";
import Hero from "./Hero/Hero";
import Footer from "../../components/Footer/Footer";
import FlightSearchForm from "../../components/FlightSearch";

const Home = () => {
  return (
    <>
      <Hero />
      <FlightSearchForm />
      <Footer />
    </>
  );
};

export default Home;
