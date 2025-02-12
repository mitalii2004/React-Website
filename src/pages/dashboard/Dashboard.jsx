// import React from 'react'

import Navbar from "../../common/Navbar";
import Banner from "../../common/Banner";
import Card from "../../components/cards/Card";
import Footer from "../../common/Footer";

const Dashboard = () => {
  return (
    <>
      <div>
        <Navbar />
        <Banner />
        <Card/>
        <Footer />
      </div>
    </>
  );
};

export default Dashboard;
