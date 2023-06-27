import React from "react";
import { Routes, Route } from "react-router-dom";
import RoutesPage from "../Router/import.page";

const RouterPages = () => {
  return (
    <Routes>
      {RoutesPage.map((rt, index) => {
        return <Route key={index} {...rt} />;
      })}
    </Routes>
  );
};
export default RouterPages;
