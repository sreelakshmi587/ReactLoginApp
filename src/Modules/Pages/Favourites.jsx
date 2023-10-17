import React, { useState } from "react";
import Sidebar from "../SideNavbar/SideNav";
import Pagination from "../Pagination/Pagination";

const Favorites = () => {
  const [favoriteCities, setFavoriteCities] = useState(
    JSON.parse(localStorage.getItem("user"))?.favoriteCities || []
  );

  const handleDelete = (cityToDelete) => {
    const updatedCities = favoriteCities.filter((city) => city !== cityToDelete);
    setFavoriteCities(updatedCities);
    const user = JSON.parse(localStorage.getItem("user")) || {};
    user.favoriteCities = updatedCities;
    localStorage.setItem("user", JSON.stringify(user));
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(5);

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = favoriteCities.slice(indexOfFirstRecord, indexOfLastRecord);
  const nPages = Math.ceil(favoriteCities.length / recordsPerPage);

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div className="table-container">
        <h1 className="favorites-label">My Favorite Cities</h1>
        {favoriteCities && favoriteCities.length > 0 ? (
          <table className="table table-with-border">
            <thead>
              <tr>
                <th scope='col'>Favourite City</th>
                <th scope='col'>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentRecords.map(city => (
                <tr key={city}>
                  <td>{city}</td>
                  <td>
                    <button onClick={() => handleDelete(city)} className="deletebutton">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p style={{ color: '#5dc060' }}> No favorite cities selected....</p>
        )}
        <Pagination
          nPages={nPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default Favorites;
