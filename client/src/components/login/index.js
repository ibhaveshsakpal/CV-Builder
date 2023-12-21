import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState({
    username: "",
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
    fetch(`${process.env.REACT_APP_BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        localStorage.setItem("token", data.token);
        localStorage.setItem("username", data.username);
        if (data.token) {
          navigate("/");
        }
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
                Login
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
                    onChange={handleFormUpdate}
                    name="username"
                    value={formData.username}
                  />
                  {formErrors.username && (
                    <div className="invalid-feedback">
                      {formErrors.username}
                    </div>
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
                    onChange={handleFormUpdate}
                    name="password"
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
                    Login
                  </button>
                </div>
                <div className="d-grid pt-2">
                  <label>
                    New User?
                    <button
                      className="btn btn-outline-primary text-uppercase fw-bold ml-3"
                      onClick={() => navigate("/signup")}
                    >
                      Sign Up
                    </button>
                  </label>
                </div>
                <hr className="my-4" />
                <div className="text-center mx-auto d-flex justify-content-center flex-column align-items-center">
                  <label> OR Sign In with </label>
                  <GoogleOAuthProvider
                    clientId={`${process.env.REACT_APP_GOOGLE_CLIENT_ID}`}
                  >
                    <GoogleLogin
                      type="icon"
                      size="50"
                      onSuccess={(credentialResponse) => {
                        const token = jwtDecode(credentialResponse.credential);
                        const loginToken = {
                          name: token?.given_name,
                          email: token?.email,
                          token: token?.jti,
                          isSocial: true,
                        };
                        fetch(`${process.env.REACT_APP_BASE_URL}/login`, {
                          method: "POST",
                          headers: {
                            "Content-Type": "application/json",
                          },
                          body: JSON.stringify(loginToken),
                        })
                          .then((res) => res.json())
                          .then((data) => {
                            localStorage.setItem("token", data?.token);
                            localStorage.setItem("username", data?.username);
                            localStorage.setItem("isSocial", data?.isSocial);
                            if (data.token) {
                              navigate("/");
                            }
                          });
                      }}
                      onError={() => {
                        console.log("Login Failed");
                      }}
                    />
                  </GoogleOAuthProvider>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
