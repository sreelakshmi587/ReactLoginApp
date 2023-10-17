import React, { useState, useEffect } from "react";
import Sidebar from "../SideNavbar/SideNav";

const Home = () => {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [favoriteCities, setFavoriteCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);

  const fetchCountries = async () => {
    try {
      const response = await fetch(
        "https://countriesnow.space/api/v0.1/countries"
      );
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const data = await response.json();
      setCountries(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("user"));
    setFavoriteCities(user.favoriteCities);
  },[selectedCountry])

  const handleCountryClick = (country) => {
    setSelectedCountry(country);
  };

  const toggleFavoriteCity = (city) => {
    const user = JSON.parse(localStorage.getItem("user"));
    let updatedFavoriteCities = [];
  
    if (user.favoriteCities?.includes(city)) {
      updatedFavoriteCities = user.favoriteCities.filter((c) => c !== city);
    } else {
      updatedFavoriteCities = [...user.favoriteCities, city];
    }
  
    user.favoriteCities = updatedFavoriteCities;
    localStorage.setItem("user", JSON.stringify(user));
  
    setFavoriteCities(updatedFavoriteCities);
  };
  
  const handleCityDetails = (city) => {
    setSelectedCity(city);
  };
  const maxHeight = `${window.innerHeight - 50}px`;

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ flex: 1 }}>
        <div style={{ display: "flex" }}>
          <div
            className="countryColumn"
            style={{ border: "1px solid transparent" }}
          >
            <h2 className="country-label">Countries</h2>
            <div
              className="country-button"
              style={{ maxHeight: maxHeight, overflowY: "scroll" }}
            >
              <ol>
                {countries.map((country) => (
                  <li key={country.country}>
                    <button
                      className="country-button"
                      onClick={() => handleCountryClick(country)}
                    >
                      {country.country}
                    </button>
                  </li>
                ))}
              </ol>
            </div>
          </div>
          <div style={{ flex: 1 }}>
            {selectedCountry && (
              <div>
                <h3 className="city-label">
                  {selectedCountry.country} - Cities
                </h3>
                <table>
                  <tbody>
                    <div style={{ maxHeight: maxHeight, overflowY: "auto" }}>
                      <ul>
                        {selectedCountry.cities.map((city) => (
                          <tr key={city}>
                            <td>{city}</td>
                            <td>
                              <button
                                className="favorite-button"
                                onClick={() => toggleFavoriteCity(city)}
                              >
                                {favoriteCities.includes(city)
                                  ? "Remove from Favorites"
                                  : "Mark as Favorite"}
                              </button>
                            </td>
                            <td>
                              <button
                                className="view-details-button"
                                onClick={() => handleCityDetails(city)}
                              >
                                View Details
                              </button>
                            </td>
                          </tr>
                        ))}
                      </ul>
                    </div>
                  </tbody>
                </table>
              </div>
            )}
          </div>
          {selectedCity && (
            <div className="detailColumn" style={{ flex: 1 }}>
              <div style={{ border: "1px solid transparent" }}>
                <h1 className="detail-label">About - {selectedCity}</h1>
                {selectedCountry && (
                  <div >
                    <table>
                      <tbody className="detail-content">
                        <tr>
                            <td>Country </td>
                            <td> : {selectedCountry.country}</td>
                        </tr>
                        <tr>
                            <td>
                                Country Code
                            </td>
                            <td>
                                : {selectedCountry.iso3}
                            </td>
                        </tr>
                        
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
