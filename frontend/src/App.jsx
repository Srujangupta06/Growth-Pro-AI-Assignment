import React from "react";
import { Routes, Route } from "react-router-dom";
import BusinessForm from "./components/BusinessForm";
import BusinessCard from "./components/BusinessCard";
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<BusinessForm/>} />
      <Route path='/business-card' element={<BusinessCard/>} />
    </Routes>
  );
};

export default App;
