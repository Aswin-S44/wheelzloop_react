import React from "react";
import Header from "./components/Header/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import HomeScreen from "./screens/HomeScreen/HomeScreen";
import AboutUs from "./sections/AboutUs/AboutUs";
import AllCars from "./screens/AllCars/AllCars";
import ReviewScreen from "./screens/ReviewScreen/ReviewScreen";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/used-cars" element={<AllCars />} />
            <Route path="/reviews" element={<ReviewScreen />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
