import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Navigate, useNavigate } from "react-router-dom";
import { useToastDispatch } from "../../Context/Toast/ToastContext";

const initialValues = { name: "", email: "", pswd: "", countryName: "",favoriteCities:[] };

const Register = (props) => {
  const [formValues, setFormValues] = useState(initialValues);

  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [countryList, setcountryList] = useState([{ name: "", id: "" }]);

  const navigation = useNavigate();
  const toast = useToastDispatch();

  const validate = (values) => {
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const errors = {};
    if (!values.name) {
      errors.name = "Username is Required !";
    } else if (values.name.length < 3) {
      errors.name = "Name should have a minimum of 3 characters !";
    }
    if (!values.email) {
      errors.email = "Email is Required !";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid Email format !";
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
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmit(true);
    const errors = validate(formValues);
    setFormErrors(errors);
    if (Object.keys(errors).length === 0) {
      console.log(e.target.value);
      localStorage.setItem("user", JSON.stringify(formValues));
    }
  };

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

  useEffect(() => {
    console.log(isSubmit);
    if (isSubmit && Object.keys(formErrors).length === 0) {
      toast({ type: "success", text: "Registered Successful", timeout: 3000, toastId : "regsuccess"  });
      navigation("/login");
    }
  }, [formErrors, isSubmit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  
    if (isSubmit) {
      const errors = validate({ ...formValues, [name]: value });
      setFormErrors(errors);
    }
  };
  
  console.log(props);
  return (
    <>
      <div className="Auth-form-container">
        <form className="Auth-form" onSubmit={handleSubmit}>
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Register</h3>

            <div className="form-group mt-3">
              <input
                name="name"
                type="name"
                value={formValues.name}
                placeholder="Your name"
                onChange={handleChange}
                id="name"
                className="formcontent form-control mt-1"
              />
            </div>
            <p className="errorText">{formErrors.name}</p>
            <div className="form-group mt-3">
              <input
                name="email"
                type="email"
                value={formValues.email}
                className="formcontent form-control mt-1"
                placeholder="user@gmail.com"
                onChange={handleChange}
                id="email"
              />
            </div>
            <p className="errorText">{formErrors.email}</p>
            <div className="form-group mt-3">
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
            <div className="form-group mt-3">
              <select
                className="dropdown-content form-control mt-1"
                name="countryName"
                style={{ color: "GrayText" }}
                value={formValues.countryName}
                onChange={handleChange}
              >
                <option value="" disabled style={{ color: "GrayText" }}>
                  Choose your Country
                </option>
                {countryList?.map((country, i) => (
                  <option value={country.name.official} key={i}>
                    {country.name.official}
                  </option>
                ))}
              </select>
            </div>
            <p className="errorText">{formErrors.countryName}</p>
            <div className="d-grid gap-2 mt-3">
              <Button
                variant="success"
                size="lg"
                type="submit"
                className="loginbutton "
                disabled={Object.keys(formErrors).length !== 0 && isSubmit}
              >
                Register
              </Button>{" "}
            </div>
            <p className="forgot-password text-right mt-2">
              <em>Already have an account?</em>{" "}
              <button
                className="regherebutton"
                onClick={() => navigation("/login")}
              >
                Login Here
              </button>
            </p>
          </div>
        </form>
      </div>
    </>
  );
};

export default Register;
