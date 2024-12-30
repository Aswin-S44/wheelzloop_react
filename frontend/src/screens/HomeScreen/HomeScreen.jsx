import React, { useEffect, useState } from "react";
import "./HomeScreen.css";
import Banner from "../../components/Banner/Banner";
import AboutUs from "../../sections/AboutUs/AboutUs";
import HowItWorks from "../../sections/HowItWorks/HowItWorks";
import FeaturesSection from "../../sections/FeaturesSection/FeaturesSection";
import Reviews from "../../sections/Reviews/Reviews";
import PopularBrands from "../../sections/PopularBrands/PopularBrands";
import NewsAndResources from "../../sections/NewsAndResources/NewsAndResources";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

function HomeScreen() {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
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
        {/* <section>
          <Reviews />
        </section> */}
        <section>
          <NewsAndResources />
        </section>
        <section>
          <PopularBrands />
        </section>
      </div>
      {showButton && (
        <button
          className="back-to-top"
          onClick={scrollToTop}
          aria-label="Back to Top"
        >
          <KeyboardArrowUpIcon />
        </button>
      )}
    </div>
  );
}

export default HomeScreen;
