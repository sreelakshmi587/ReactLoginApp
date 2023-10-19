import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { useToastDispatch } from "../../Context/Toast/ToastContext";


const Login = (props) => {
  const initialValues = { email: "", pswd: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [isPswdFieldTouched, setIsPswdFieldTouched] = useState(false);
  const [isEmailFieldTouched, setIsEmailFieldTouched] = useState(false);

  const navigation = useNavigate();
  const toast = useToastDispatch();
  useEffect(() => {
    console.log(isSubmit);
    if (isSubmit && Object.keys(formErrors).length === 0) {
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const foundUser = users.find(
        (user) => user.email === formValues.email && user.pswd === formValues.pswd
      );

      if (foundUser) {
        localStorage.setItem("currentUser", JSON.stringify(foundUser));
        toast({ type: "success", text: "Login Successful", timeout: 3000, toastId: "loginsuccess" });
        navigation("/home");
      } else {
        toast({ type: "error", text: "Login Failed", timeout: 3000, toastId: "loginfailed" });
      }
    }
  }, [formErrors, isSubmit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsEmailFieldTouched(true);
    setIsPswdFieldTouched(true);

    if (!isEmailFieldTouched && !isPswdFieldTouched) {
      let errors = {};
      errors.email = "Email is Required !";
      errors.pswd = "Password is Required !";
      setFormErrors(errors);
      return;
    } else if (!isEmailFieldTouched) {
      let errors = {};
      errors.email = "Email is Required !";
      setFormErrors(errors);
      return;
    } else if (!isPswdFieldTouched) {
      let errors = {};
      errors.pswd = "Password is Required !";
      setFormErrors(errors);
      return;
    }

    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  const handleChange = (e) => {
    console.log(e.target.value);
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });

    const errors = validate({ ...formValues, [name]: value });
    setFormErrors(errors);
  };

  const validate = (values) => {
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const errors = {};
    let checkEmail = false;
    if (values.email && !isEmailFieldTouched) {
      setIsEmailFieldTouched(true);
      checkEmail = true;
    } else if (isEmailFieldTouched) {
      checkEmail = true;
    }
    if (!values.email && checkEmail) {
      errors.email = "Email is Required !";
    } else if (!regex.test(values.email) && checkEmail) {
      errors.email = "This is not a valid Email format !";
    }
    let checkPswd = false;
    if (values.pswd && !isPswdFieldTouched) {
      setIsPswdFieldTouched(true);
      checkPswd = true;
    } else if (isPswdFieldTouched) {
      checkPswd = true;
    }
    if (!values.pswd && checkPswd) {
      errors.pswd = "Password is Required !";
    } else if (values.pswd.length < 8 && checkPswd) {
      errors.pswd = "Password should have a minimum of 8 characters!";
    } else if (values.pswd.length > 15 && checkPswd) {
      errors.pswd = "Password cannot exceed 15 characters1";
    }

    return errors;
  };

  return (
    <>
      <div className="Auth-form-container">
        <form className="Auth-form" onSubmit={handleSubmit}>
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Log In</h3>
            <div className="d-grid gap-2 mt-3">
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

            <div className="d-grid gap-2 mt-3">
              <Button
                variant="success"
                size="lg"
                type="submit"
                className="loginbutton "
                disabled={Object.keys(formErrors).length !== 0 && isSubmit}
              >
                Log In
              </Button>{" "}
            </div>
            <p className="forgot-password text-right mt-2">
              <em> Don't have an account?</em>{" "}
              <button
                type="submit"
                className="regherebutton"
                onClick={() => navigation("/register")}
              >
                Register Here
              </button>
            </p>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
