import React, { useState, useEffect } from "react";
import Layout from "../components/layout";
import { Link, useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";

const Dashboard = () => {
  const [cvs, setCVs] = useState([]);
  const [templateType, setTemplateType] = useState("TEMPLATE_ONE");
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchResume() {
      try {
        const username = localStorage.getItem("username");
        const fetchResume = await fetch(
          `${process.env.REACT_APP_BASE_URL}/getresume/${username}`
        );
        const res = await fetchResume.json();
        setCVs(res?.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchResume();
  }, []);

  const handleTemplate = (e) => {
    e.preventDefault();
    setTemplateType(e?.target?.value);
  };

  const handleShare = async (cv) => {
    const stripe = await loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE);
    const redirect_url =
      "https://twitter.com/intent/tweet?text=" +
      `${process.env.REACT_APP_CLIENT_URL}/preview/${cv._id}/${templateType}`;

    try {
      const paymentObj = {
        product: {
          name: "test",
          price: 20,
          quantity: 1,
          redirect_to: redirect_url,
        },
      };

      const fetchPayment = await fetch(
        `${process.env.REACT_APP_BASE_URL}/api/create-checkout-session`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(paymentObj),
        }
      );
      const res = await fetchPayment.json();
      const result = stripe.redirectToCheckout({
        sessionId: res?.id,
      });
      if (result.error) {
        console.log(result.error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    const isConfirmed = window.confirm("Are you sure want to delete this resume?");

    if (isConfirmed) {
      try {
        const deleteResume = await fetch(
          `${process.env.REACT_APP_BASE_URL}/deletecv/${id}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (deleteResume.ok) {
          navigate(0);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      {/* {!cvs.length ? (
        <Loader />
      ) : ( */}
      <Layout>
        <div className="container mt-5">
          <div className="row">
            {cvs?.map((cv, key) => (
              <div className="col-md-4 mb-3" key={key}>
                <div className="card">
                  <div className="card-body p-0 my-3 mx-4">
                    <h4 className="card-title fw-bold mb-0">{`${cv?.resume_data?.name}`}</h4>
                    <label>{`${cv?.resume_data?.position}` || ""}</label>
                    <div className="img-fluid text-center pb-2">
                      <img src="resume.png" width="100" alt="resume icon"></img>
                    </div>
                    <div className="text-center py-2">
                      <button className="btn btn-outline mr-2 my-1">
                        <Link to={`/editcv/${cv._id}/${templateType}`}>
                          <img src="edit.png" width="25" />
                        </Link>
                      </button>
                      <button
                        className="btn btn-outline mr-2"
                        onClick={() =>
                          navigate(`/preview/${cv._id}/${templateType}`)
                        }
                      >
                        <img src="view.png" width="25" />
                      </button>
                      <button
                        className="btn btn-outline mr-2"
                        onClick={() => handleShare(cv)}
                      >
                        <img src="share.png" width="25" />
                      </button>
                      <button
                        className="btn btn-outline mr-2"
                        onClick={() => handleDelete(cv._id)}
                      >
                        <img src="remove.png" width="25" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="p-1">
            <label className="pr-2">Select Resume Template</label>
            <select
              onChange={(event) => handleTemplate(event)}
              className="form-select"
            >
              <option value="TEMPLATE_ONE">Template One</option>
              <option value="TEMPLATE_TWO">Template Two</option>
            </select>
          </div>
          <Link className="btn btn-primary mr-2" to={`/addcv/${templateType}`}>
            Add new CV
          </Link>
        </div>
      </Layout>
      {/* )} */}
    </>
  );
};

export default Dashboard;
