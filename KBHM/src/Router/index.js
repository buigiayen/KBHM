import React from "react";
import { Routes, Route } from "react-router-dom";
import RoutesPage from "../Router/import.page";
import Layout1 from "../Layout/Layout1";
const RouterPages = () => {
  const RouterMap = () => {
    const RouterValue = [];
    RoutesPage.forEach((t, index) => {
      if (t.isAdmin) {
        RouterValue.push(t);
      } else {
        RouterValue.push({
          path: t.path,
          element: <Layout1 component={t.element}></Layout1>,
        });
      }
    });
    return RouterValue;
  };
  return (
    <Routes>
      {RouterMap().map((rt, index) => {
        return <Route key={index} {...rt} />;
      })}
    </Routes>
  );
};
export default RouterPages;
