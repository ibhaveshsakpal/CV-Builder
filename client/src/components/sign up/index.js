import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    contact: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState({
    username: "",
    email: "",
    contact: "",
    password: "",
  });

  const handleFormUpdate = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const validateForm = () => {
    let valid = true;
    const errors = {};

    if (!formData.username) {
      valid = false;
      errors.username = "Username is required";
    }

    if (!formData.email) {
      valid = false;
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      valid = false;
      errors.email = "Invalid email address";
    }

    if (!formData.password) {
      valid = false;
      errors.password = "Password is required";
    }

    setFormErrors(errors);
    return valid;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (validateForm()) {
      postApi();
    }
  };

  const postApi = () => {
    fetch(`${process.env.REACT_APP_BASE_URL}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    }).then((res) => {
      navigate("/login");
    });
  };

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BASE_URL}/isUserAuth`, {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => (data.isLoggedin ? navigate("/") : null));
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
          <div className="card border-0 shadow rounded-3 my-5">
            <div className="card-body p-4 p-sm-5">
              <h5 className="card-title text-center mb-5 fw-light fs-5">
                Sign Up
              </h5>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label>Username</label>
                  <input
                    className={`form-control ${
                      formErrors.username ? "is-invalid" : ""
                    }`}
                    type="text"
                    placeholder="Username"
                    name="username"
                    onChange={handleFormUpdate}
                    value={formData.username}
                  />
                  {formErrors.username && (
                    <div className="invalid-feedback">
                      {formErrors.username}
                    </div>
                  )}
                </div>
                <div className="mb-3">
                  <label>Email</label>
                  <input
                    className={`form-control ${
                      formErrors.email ? "is-invalid" : ""
                    }`}
                    type="email"
                    placeholder="name@example.com"
                    name="email"
                    onChange={handleFormUpdate}
                    value={formData.email}
                  />
                  {formErrors.email && (
                    <div className="invalid-feedback">{formErrors.email}</div>
                  )}
                </div>
                <div className="mb-3">
                  <label>Contact Number</label>
                  <input
                    className={`form-control ${
                      formErrors.contact ? "is-invalid" : ""
                    }`}
                    type="tel"
                    placeholder="Contact Number"
                    name="contact"
                    onChange={handleFormUpdate}
                    value={formData.contact}
                  />
                  {formErrors.contact && (
                    <div className="invalid-feedback">{formErrors.contact}</div>
                  )}
                </div>
                <div className="mb-3">
                  <label>Password</label>
                  <input
                    className={`form-control ${
                      formErrors.password ? "is-invalid" : ""
                    }`}
                    type="password"
                    placeholder="Password"
                    name="password"
                    onChange={handleFormUpdate}
                    value={formData.password}
                  />
                  {formErrors.password && (
                    <div className="invalid-feedback">
                      {formErrors.password}
                    </div>
                  )}
                </div>
                <div className="d-grid">
                  <button className="btn btn-primary text-uppercase fw-bold">
                    Sign Up
                  </button>
                </div>
                <div className="d-grid pt-2">
                  <label>
                    Already registered?
                    <button
                      className="btn btn-outline-primary text-uppercase fw-bold ml-3"
                      onClick={() => navigate("/login")}
                    >
                      Login here
                    </button>
                  </label>
                </div>
                <hr className="my-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
