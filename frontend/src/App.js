import React from "react";
import Header from "./components/Header/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import HomeScreen from "./screens/HomeScreen/HomeScreen";
import AboutUs from "./sections/AboutUs/AboutUs";
import AllCars from "./screens/AllCars/AllCars";
import ReviewScreen from "./screens/ReviewScreen/ReviewScreen";
import LoginScreen from "./screens/LoginScreen/LoginScreen";
import ProfileScreen from "./screens/ProfileScreen/ProfileScreen";
import AddCar from "./screens/AddCar/AddCar";
import ContactScreen from "./screens/ContactScreen/ContactScreen";
import BlogsScreen from "./screens/BlogsScreen/BlogsScreen";

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
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/profile" element={<ProfileScreen />} />
            <Route path="/add-car" element={<AddCar />} />
            <Route path="/contact-us" element={<ContactScreen />} />
            <Route path="/blogs" element={<BlogsScreen />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
