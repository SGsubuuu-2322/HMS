// import React from 'react'
import { Route, Routes } from "react-router-dom";
// import Authentication from "./Config/Authentication";
import PublicLayout from "./Layout/PublicLayout";
import { PublicRoutes } from "./routes/PublicRoutes";
import Authentication from "./config/Authentication";
import { AuthRoutes } from "./routes/AuthRoutes";
// import { AuthRoutes } from "./routes/AuthRoutes";

const App = () => {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        {PublicRoutes.map((pr, i) => {
          return <Route key={i} path={pr.path} element={<pr.element />} />;
        })}
      </Route>
      <Route element={<Authentication />}>
        {AuthRoutes.map((pr, i) => {
          return <Route key={i} path={pr.path} element={<pr.element />} />;
        })}
      </Route>
    </Routes>
  );
};

export default App;
