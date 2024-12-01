import React from "react";
import "./HomeScreen.css";
import Banner from "../../components/Banner/Banner";
import AboutUs from "../../sections/AboutUs/AboutUs";
import HowItWorks from "../../sections/HowItWorks/HowItWorks";
import FeaturesSection from "../../sections/FeaturesSection/FeaturesSection";
import Reviews from "../../sections/Reviews/Reviews";
import PopularBrands from "../../sections/PopularBrands/PopularBrands";

function HomeScreen() {
  return (
    <div>
      <div className="">
        <section>
          <Banner />
        </section>
        <section>
          <AboutUs />
        </section>
        <section>
          <HowItWorks />
        </section>
        <section>
          <FeaturesSection />
        </section>
        <section>
          <Reviews />
        </section>
        <section>
          <PopularBrands />
        </section>
      </div>
    </div>
  );
}

export default HomeScreen;
