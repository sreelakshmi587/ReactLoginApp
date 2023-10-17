import React from "react";
import { Link, RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "../Modules/Login/Login";
import Profile from "../Modules/Profile/Profile";
import Register from "../Modules/Register/Register";
import Home from "../Modules/Pages/Home";
import Favourites from "../Modules/Pages/Favourites";


const AllRoutes = createBrowserRouter([
    {
        path: "/",
        element: <Login />,
        // children: [
        //   {
        //     index: true,
        //     element: <Login />,
        //   },]
    },
    {
        path: "/profile",
        element : <Profile/>
      },
      {
        path: "/register",
        element : <Register/>
      },
      {
        path: "/login",
        element : <Login/>
      },
      {
        path: "/home",
        element : <Home/>
      },
      {
        path: "/favourites",
        element : <Favourites/>
      },
      {
        path: "*",
        element: <NoMatch />,
      },
])

function NoMatch() {
    return (
      <div>
        <h2>Nothing to see here!</h2>
        <p>
          <Link to="/">Go to the home page</Link>
        </p>
      </div>
    );
  }
  const AppRoutes = ()=>{
    return(
     <RouterProvider router={AllRoutes} fallbackElement={<p>Loading...</p>} />
    )
  }

  export default AppRoutes