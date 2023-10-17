import "./App.css";
import React, { useState } from "react";
import AppRoutes from "./Core/AppRoutes";
import { withProviders } from "./Context/Toast/withProvider";
import { ToastContext } from "./Context/Toast/ToastContext";
import Home from "./Modules/Pages/Home";
import Favorites from "./Modules/Pages/Favourites";

function App() {
  const [favoriteCities, setFavoriteCities] = useState([]);
  return (
    <>
      <AppRoutes />{" "}
      {/* <Home
        favoriteCities={favoriteCities}
        setFavoriteCities={setFavoriteCities}
      />
      <Favorites favoriteCities={favoriteCities} /> */}
    </>
  );
}

export default withProviders(ToastContext)(App);
