import { Button, ButtonGroup, ButtonToolbar } from "react-bootstrap";
import Sidebar from "../SideNavbar/SideNav";
import { useEffect, useState } from "react";
import { useToastDispatch } from "../../Context/Toast/ToastContext";
import { Navigate, useNavigate } from "react-router-dom";



const Profile = () => {
  const userName = JSON.parse(localStorage.getItem("user"));

  const initialValues = { name: userName.name,email: userName.email, pswd: userName.pswd, countryName: userName.countryName, favoriteCities :userName.favoriteCities };
  const [formValues, setFormValues] = useState(initialValues);
  const [countryList, setcountryList] = useState([{ name: "", id: "" }]);
  const [formErrors, setFormErrors] = useState({});

  const toast = useToastDispatch();
  const navigation = useNavigate();

  const fetchCountryData = async () => {
    try {
      const response = await fetch("https://restcountries.com/v3.1/all");
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const data = await response.json();
      console.log(data);
      setcountryList(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchCountryData();
  }, []);

  const validate = (values) => {
    const errors = {};
    if (!values.name) {
      errors.name = "Username is Required !";
    } else if (values.name.length < 3) {
      errors.name = "Name should have a minimum of 3 characters !";
    }
    if (!values.pswd) {
      errors.pswd = "Password is Required !";
    } else if (values.pswd.length < 8) {
      errors.pswd = "Password should have a minimum of 8 characters!";
    } else if (values.pswd.length > 15) {
      errors.pswd = "Password cannot exceed 15 characters1";
    }
    if (!values.countryName) {
      errors.countryName = "Please choose a Country !";
    }

    return errors;
  };

  const handleChange = (e) => {
    console.log(e.target.value);
    const { name, value } = e.target;

    setFormValues({ ...formValues, [name]: value });

    const errors = validate({ ...formValues, [name]: value });
    setFormErrors(errors);
  };

  const handleSave = (e) => {
    e.preventDefault();
    console.log(e.target.value);

    setFormErrors(validate(formValues));
    if (Object.keys(validate(formValues)).length === 0) {
      localStorage.setItem("user", JSON.stringify(formValues));
      toast({ type: "success", text: "Update Successful !", timeout: 3000, toastId : "updateSuccess"  });
    } else {
      toast({ type: "error", text: "Update Failed", timeout: 3000, toastId : "updatefailed"});
    }
  };

  const handleDelete = (e) =>{
    e.preventDefault();
    localStorage.removeItem("user");
    toast({ type: "error", text: "Account Deleted", timeout: 3000, toastId : "accountdelete"});
    navigation("/register");
  }

  return (
    <>
      <div style={{ display: "flex" }}>
        <Sidebar />
        <div className="main-content">
          <div className="Auth-form-container">
            <div style={{ display: "flex" }} >
              <form className="Auth-form">
                <div className="Auth-form-content">
                  <h3 className="Auth-form-profile" color="#4CAF50">
                    User Details
                  </h3>
  
                  <h3 className="Auth-form-title">Welcome {userName.name}</h3>
                  <div className="d-grid gap-2 mt-3">
                    <label>Email : </label>
                    <input
                      name="email"
                      type="email"
                      value={userName.email}
                      className="formcontent form-control mt-1"
                      placeholder="user@gmail.com"
                      disabled
                      //onChange={handleChange}
                      id="email"
                    />
                  </div>
                  <div className="d-grid gap-2 mt-3">
                    <label>Display Name : </label>
                    <input
                      name="name"
                      type="name"
                      value={formValues.name}
                      className="formcontent form-control mt-1"
                      placeholder="user@gmail.com"
                      onChange={handleChange}
                      id="name"
                    />
                  </div>
                  <p className="errorText">{formErrors.name}</p>
                  <div className="form-group mt-3">
                    <label>Password : </label>
                    <input
                      name="pswd"
                      value={formValues.pswd}
                      type="password"
                      className="formcontent form-control mt-1"
                      placeholder="Enter password"
                      id="pswd"
                      onChange={handleChange}
                    />
                  </div>
                  <p className="errorText">{formErrors.pswd}</p>
                  <div className="d-grid gap-2 mt-3">
                    <label>User Country : </label>
                    <select
                      className="dropdown-content form-control mt-1"
                      name="countryName"
                      style={{ color: "GrayText" }}
                      value={formValues.countryName}
                      onChange={handleChange}
                    >
                      {countryList?.map((country, i) => (
                        <option value={country.name.official} key={i}>
                          {country.name.official}
                        </option>
                      ))}
                    </select>
                  </div>
  
                  <div className="d-grid gap-2 mt-3">
                    <ButtonToolbar>
                      <ButtonGroup>
                        <Button
                          variant="success"
                          size="lg"
                          type="submit"
                          className="editbutton "
                          onClick={handleSave}
                          disabled={Object.keys(formErrors).length !== 0}
                        >
                          Save Changes
                        </Button>
                      </ButtonGroup>
                      <ButtonGroup>
                        <Button
                          variant="danger"
                          size="lg"
                          type="submit"
                          className="deletebutton "
                          onClick={handleDelete}
                        >
                          Delete
                        </Button>
                      </ButtonGroup>
                    </ButtonToolbar>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
  
};

export default Profile;
